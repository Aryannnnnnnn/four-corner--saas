"use client";

import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import PhoneNumberModal from "../onboarding/PhoneNumberModal";

export default function PhoneNumberProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const [showModal, setShowModal] = useState(false);
  const hasCheckedRef = useRef(false);
  const currentUserRef = useRef<string | null>(null);

  useEffect(() => {
    // Don't check if session is loading
    if (status === "loading") return;

    // Check if user is authenticated
    if (session?.user?.email && status === "authenticated") {
      // Reset check if user changed
      if (currentUserRef.current !== session.user.email) {
        hasCheckedRef.current = false;
        currentUserRef.current = session.user.email;
      }

      // Only check once per user
      if (hasCheckedRef.current) return;
      hasCheckedRef.current = true;

      // Check if user has skipped the modal before
      const hasSkipped = localStorage.getItem("phoneNumberModalSkipped") === "true";
      if (hasSkipped) {
        setShowModal(false);
        return;
      }

      // Fetch user profile to check phone number
      fetch("/api/user/profile", {
        cache: "no-store",
      })
        .then((res) => res.json())
        .then((data) => {
          // Check if phone is missing, null, undefined, or empty string
          const hasPhone = data.profile?.phone &&
                          data.profile.phone !== "" &&
                          data.profile.phone !== null;

          setShowModal(data.profile && !hasPhone);
        })
        .catch((error) => {
          console.error("Failed to check user profile:", error);
        });
    } else {
      // User is not authenticated, hide modal
      setShowModal(false);
      hasCheckedRef.current = false;
      currentUserRef.current = null;
    }
  }, [session?.user?.email, status]);

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <>
      {children}
      {/* Pass onClose to allow users to skip the modal */}
      <PhoneNumberModal isOpen={showModal} onClose={handleClose} />
    </>
  );
}
