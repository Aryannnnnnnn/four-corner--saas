import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      persistSession: false,
    },
  },
);

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
          scope: "openid email profile",
        },
      },
      allowDangerousEmailAccountLinking: true,
    }),
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials");
        }

        try {
          // Get user by email
          const { data: user, error: userError } = await supabase
            .from("users")
            .select("*")
            .eq("email", (credentials.email as string).toLowerCase())
            .maybeSingle();

          if (userError || !user) {
            throw new Error("Invalid email or password");
          }

          // Get password hash
          const { data: credential, error: credError } = await supabase
            .from("user_credentials")
            .select("password_hash")
            .eq("user_id", user.id)
            .single();

          if (credError || !credential) {
            throw new Error("Invalid email or password");
          }

          // Verify password
          const isValidPassword = await bcrypt.compare(
            credentials.password as string,
            credential.password_hash,
          );

          if (!isValidPassword) {
            throw new Error("Invalid email or password");
          }

          // Update last login
          await supabase
            .from("users")
            .update({ last_login: new Date().toISOString() })
            .eq("id", user.id);

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image,
          };
        } catch (error) {
          console.error("Authorization error:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/login",
    newUser: "/dashboard",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    signIn: async ({ user, account }) => {
      try {
        if (process.env.NODE_ENV === "development") {
          console.log("SignIn callback triggered:", {
            provider: account?.provider,
            userEmail: user.email,
          });
        }

        // Handle OAuth sign-ins
        if (account?.provider === "google" && user.email) {
          if (process.env.NODE_ENV === "development") {
            console.log("Processing Google OAuth sign-in for:", user.email);
          }

          // Check if user exists
          const { data: existingUser, error: selectError } = await supabase
            .from("users")
            .select("id, email")
            .eq("email", user.email)
            .maybeSingle(); // Use maybeSingle instead of single to avoid errors when no rows

          if (selectError) {
            console.error("Database select error:", selectError);
            // Don't block sign-in for database errors
            return true;
          }

          if (!existingUser) {
            if (process.env.NODE_ENV === "development") {
              console.log("Creating new user for Google OAuth:", user.email);
            }
            const { error: insertError } = await supabase.from("users").insert({
              email: user.email,
              name: user.name || "",
              image: user.image || null,
              email_verified: new Date().toISOString(),
              created_at: new Date().toISOString(),
            });

            if (insertError) {
              console.error("Failed to create user:", insertError);
              // Don't block sign-in even if user creation fails
            } else if (process.env.NODE_ENV === "development") {
              console.log("Successfully created new user");
            }
          } else if (process.env.NODE_ENV === "development") {
            console.log("User already exists:", existingUser.email);
          }
        }
        return true;
      } catch (error) {
        console.error("Sign-in callback error:", error);
        // Don't block sign-in for unexpected errors
        return true;
      }
    },
    jwt: async ({ token, user, trigger, session, account }) => {
      try {
        if (process.env.NODE_ENV === "development") {
          console.log("JWT callback triggered:", {
            hasUser: !!user,
            trigger,
            userEmail: user?.email,
            provider: account?.provider,
          });
        }

        // Initial sign in
        if (user?.email) {
          // For OAuth providers, get the user ID from database
          if (account?.provider === "google") {
            try {
              const { data: dbUser } = await supabase
                .from("users")
                .select("id, email, name, image")
                .eq("email", user.email)
                .maybeSingle();

              if (dbUser) {
                token.id = dbUser.id;
                token.email = dbUser.email;
                token.name = dbUser.name || user.name;
                token.picture = dbUser.image || user.image;
                if (process.env.NODE_ENV === "development") {
                  console.log("Set token from database user:", dbUser.id);
                }
              } else {
                // Fallback to OAuth user data
                token.id = user.id;
                token.email = user.email;
                token.name = user.name;
                token.picture = user.image;
              }
            } catch (error) {
              console.error("JWT database lookup error:", error);
              // Fallback to OAuth user data
              token.id = user.id;
              token.email = user.email;
              token.name = user.name;
              token.picture = user.image;
            }
          } else {
            // For credentials provider, use provided user data
            token.id = user.id;
            token.email = user.email;
            token.name = user.name;
            token.picture = user.image;
          }
        }

        // Handle session updates
        if (trigger === "update" && session) {
          token.name = session.name;
          token.email = session.email;
          token.picture = session.image;
        }

        return token;
      } catch (error) {
        console.error("JWT callback error:", error);
        return token;
      }
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.user.image = token.picture as string;
      }
      return session;
    },
  },
  secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
  trustHost: true, // This helps with deployment issues
});
