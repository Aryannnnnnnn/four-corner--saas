"use client";

import {
  BookMarked,
  BookOpen,
  ChevronDown,
  FolderOpen,
  Home,
  Library,
  LogOut,
  Menu,
  PlusCircle,
  Search,
  Settings,
  User,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { cn } from "@/app/lib/utils/cn";

export default function Header() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [dashboardDropdownOpen, setDashboardDropdownOpen] = useState(false);
  const [companyDropdownOpen, setCompanyDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  // Navigation items in specific order
  const homeNavigation = [{ name: "Home", href: "/", icon: Home }];

  const ourListingsNavigation = [
    { name: "Our Listings", href: "/listings", icon: FolderOpen },
  ];

  const settingsNavigation = [
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  const analyzeNavigation = [
    {
      name: "Analyze Property",
      href: "/analyze-your-property",
      icon: Search,
    },
  ];

  const sellPropertyNavigation = [
    {
      name: "Sell Property",
      href: "/list-property",
      icon: PlusCircle,
    },
  ];

  // Other navigation items (after the main ones)
  const otherNavigation: Array<{ name: string; href: string; icon: any }> = [
    // Add any additional items here if needed
  ];

  // Dashboard dropdown items
  const dashboardItems = [
    { name: "My Listings", href: "/my-listings", icon: Search },
    { name: "View Library", href: "/library", icon: Library },
  ];

  // Company dropdown items (non-clickable parent)
  const companyItems = [
    { name: "About", href: "/about", icon: BookOpen },
    {
      name: "Stories",
      href: "/case-studies",
      icon: BookMarked,
    },
    {
      name: "Projects",
      href: "/projects",
      icon: FolderOpen,
    },
  ];

  // Close dropdowns when clicking outside or on route change
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Don't close if clicking inside a dropdown or on the profile button
      if (target.closest('.dropdown-container')) {
        return;
      }
      setDashboardDropdownOpen(false);
      setCompanyDropdownOpen(false);
      setProfileDropdownOpen(false);
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    // Close dropdowns when route changes
    setDashboardDropdownOpen(false);
    setCompanyDropdownOpen(false);
    setProfileDropdownOpen(false);
  }, [pathname]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-[90vw] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
            <Image
              src="/logo.png"
              alt="Four Corner Properties"
              width={150}
              height={56}
              priority
              quality={100}
              className="h-12 sm:h-14 w-auto object-contain"
              unoptimized
            />
          </Link>

          {/* Desktop Navigation - Centered */}
          <nav className="hidden xl:flex items-center justify-left ml-8 flex-1 space-x-[22px]">
            {/* 1. Home Navigation */}
            {homeNavigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "group flex items-center gap-1.5 text-xs xl:text-sm font-medium text-gray-600 hover:text-gray-900 tracking-wide uppercase transition-all duration-200 pb-1 border-b-2 border-transparent hover:border-blue-600 whitespace-nowrap",
                  pathname === item.href && "text-gray-900 border-blue-600",
                )}
              >
                <item.icon className="w-3.5 h-3.5 xl:w-4 xl:h-4" />
                <span>{item.name}</span>
              </Link>
            ))}

            {/* 2. Our Listings Navigation */}
            {ourListingsNavigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "group flex items-center gap-1.5 text-xs xl:text-sm font-medium text-gray-600 hover:text-gray-900 tracking-wide uppercase transition-all duration-200 pb-1 border-b-2 border-transparent hover:border-blue-600 whitespace-nowrap",
                  pathname === item.href && "text-gray-900 border-blue-600",
                )}
              >
                <item.icon className="w-3.5 h-3.5 xl:w-4 xl:h-4" />
                <span>{item.name}</span>
              </Link>
            ))}

            {/* Company with Dropdown (non-clickable) */}
            <div
              className="relative group"
              onMouseEnter={() => setCompanyDropdownOpen(true)}
              onMouseLeave={() => setCompanyDropdownOpen(false)}
            >
              <div className="flex items-center gap-1.5 text-xs xl:text-sm font-medium text-gray-600 hover:text-gray-900 tracking-wide uppercase transition-all duration-200 cursor-default pb-1 border-b-2 border-transparent hover:border-blue-600 whitespace-nowrap">
                <BookOpen className="w-3.5 h-3.5 xl:w-4 xl:h-4" />
                <span>Company</span>
                <ChevronDown className="w-3 h-3 opacity-60" />
              </div>

              {/* Company Dropdown */}
              <div
                className={cn(
                  "absolute top-full left-0 mt-2 w-56 bg-white border border-gray-200 shadow-xl overflow-hidden transition-all duration-200 z-50",
                  companyDropdownOpen
                    ? "opacity-100 visible translate-y-0"
                    : "opacity-0 invisible -translate-y-2",
                )}
              >
                {companyItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    rel="noopener noreferrer"
                    className="block px-6 py-4 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors border-b border-gray-100 last:border-b-0"
                  >
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* 3. Settings Navigation */}
            {settingsNavigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "group flex items-center gap-1.5 text-xs xl:text-sm font-medium text-gray-600 hover:text-gray-900 tracking-wide uppercase transition-all duration-200 pb-1 border-b-2 border-transparent hover:border-blue-600 whitespace-nowrap",
                  pathname === item.href && "text-gray-900 border-blue-600",
                )}
              >
                <item.icon className="w-3.5 h-3.5 xl:w-4 xl:h-4" />
                <span>{item.name}</span>
              </Link>
            ))}

            {/* 4. Analyze Navigation */}
            {analyzeNavigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "group flex items-center gap-1.5 text-xs xl:text-sm font-medium text-gray-600 hover:text-gray-900 tracking-wide uppercase transition-all duration-200 pb-1 border-b-2 border-transparent hover:border-blue-600 whitespace-nowrap",
                  pathname === item.href && "text-gray-900 border-blue-600",
                )}
              >
                <item.icon className="w-3.5 h-3.5 xl:w-4 xl:h-4" />
                <span>{item.name}</span>
              </Link>
            ))}

            {/* 5. Sell Property Navigation */}
            {sellPropertyNavigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "group flex items-center gap-1.5 text-xs xl:text-sm font-medium text-gray-600 hover:text-gray-900 tracking-wide uppercase transition-all duration-200 pb-1 border-b-2 border-transparent hover:border-blue-600 whitespace-nowrap",
                  pathname === item.href && "text-gray-900 border-blue-600",
                )}
              >
                <item.icon className="w-3.5 h-3.5 xl:w-4 xl:h-4" />
                <span>{item.name}</span>
              </Link>
            ))}

            {/* 6. Other Navigation (if any items exist) */}
            {otherNavigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "group flex items-center gap-1.5 text-xs xl:text-sm font-medium text-gray-600 hover:text-gray-900 tracking-wide uppercase transition-all duration-200 pb-1 border-b-2 border-transparent hover:border-blue-600 whitespace-nowrap",
                  pathname === item.href && "text-gray-900 border-blue-600",
                )}
              >
                <item.icon className="w-3.5 h-3.5 xl:w-4 xl:h-4" />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* Authentication Section - Right Side */}
          <div className="hidden xl:flex items-center space-x-3 xl:space-x-4">
            {/* Dashboard with Dropdown - Before Profile */}
            <div
              className="relative group"
              onMouseEnter={() => setDashboardDropdownOpen(true)}
              onMouseLeave={() => setDashboardDropdownOpen(false)}
            >
              <Link
                href="/dashboard"
                className={cn(
                  "flex items-center gap-1.5 text-xs xl:text-sm font-medium text-gray-600 hover:text-gray-900 tracking-wide uppercase transition-all duration-200 pb-1 border-b-2 border-transparent hover:border-blue-600 whitespace-nowrap",
                  pathname === "/dashboard" && "text-gray-900 border-blue-600",
                )}
              >
                <Home className="w-3.5 h-3.5 xl:w-4 xl:h-4" />
                <span>Dashboard</span>
                <ChevronDown className="w-3 h-3 opacity-60" />
              </Link>

              {/* Dashboard Dropdown */}
              <div
                className={cn(
                  "absolute top-full right-0 mt-2 w-56 bg-white border border-gray-200 shadow-xl overflow-hidden transition-all duration-200 z-50",
                  dashboardDropdownOpen
                    ? "opacity-100 visible translate-y-0"
                    : "opacity-0 invisible -translate-y-2",
                )}
              >
                {dashboardItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "block px-6 py-4 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors border-b border-gray-100 last:border-b-0",
                      pathname === item.href && "text-gray-900 bg-gray-50",
                    )}
                  >
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            {session ? (
              <div
                className="relative group dropdown-container"
                onMouseEnter={() => setProfileDropdownOpen(true)}
                onMouseLeave={() => setProfileDropdownOpen(false)}
              >
                <Link
                  href="/profile"
                  className="flex items-center justify-center w-8 h-8 xl:w-9 xl:h-9 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 text-white font-semibold text-sm hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-md hover:shadow-lg"
                  onClick={() => setProfileDropdownOpen(false)}
                >
                  {session.user?.name?.[0]?.toUpperCase() ||
                    session.user?.email?.[0]?.toUpperCase() ||
                    "U"}
                </Link>

                {/* Profile Dropdown Menu */}
                <div
                  className={cn(
                    "absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 shadow-xl overflow-hidden transition-all duration-200 z-50 rounded-lg",
                    profileDropdownOpen
                      ? "opacity-100 visible translate-y-0"
                      : "opacity-0 invisible -translate-y-2",
                  )}
                >
                  <Link
                    href="/profile"
                    className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors border-b border-gray-100"
                    onClick={() => setProfileDropdownOpen(false)}
                  >
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span className="font-medium">Profile</span>
                    </div>
                  </Link>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setProfileDropdownOpen(false);
                      signOut({ callbackUrl: "/" });
                    }}
                    className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <LogOut className="w-4 h-4" />
                      <span className="font-medium">Sign Out</span>
                    </div>
                  </button>
                </div>
              </div>
            ) : (
              <Link
                href="/login"
                className="group flex items-center gap-1.5 text-xs xl:text-sm font-medium text-gray-600 hover:text-gray-900 tracking-wide uppercase transition-all duration-200 pb-1 border-b-2 border-transparent hover:border-blue-600 whitespace-nowrap"
              >
                <User className="w-3.5 h-3.5 xl:w-4 xl:h-4" />
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="xl:hidden text-gray-700 p-2 hover:bg-gray-100 rounded transition-colors ml-auto"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="xl:hidden mt-4 space-y-1 border-t border-gray-200 pt-4 pb-4 bg-white">
            {/* 1. Home Navigation */}
            {homeNavigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors",
                  pathname === item.href && "text-blue-600 bg-blue-50",
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <item.icon className="w-4 h-4" />
                <span className="font-medium">{item.name}</span>
              </Link>
            ))}

            {/* 2. Our Listings Navigation */}
            {ourListingsNavigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors",
                  pathname === item.href && "text-blue-600 bg-blue-50",
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <item.icon className="w-4 h-4" />
                <span className="font-medium">{item.name}</span>
              </Link>
            ))}

            {/* 3. Dashboard Section */}
            <Link
              href="/dashboard"
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors",
                pathname === "/dashboard" && "text-blue-600 bg-blue-50",
              )}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Home className="w-4 h-4" />
              <span className="font-medium">Dashboard</span>
            </Link>

            {/* Dashboard Subitems */}
            {dashboardItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-8 py-2.5 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors text-sm",
                  pathname === item.href && "text-blue-600 bg-blue-50",
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <item.icon className="w-3 h-3" />
                <span className="font-medium">{item.name}</span>
              </Link>
            ))}

            {/* 3. Company Section Header */}
            <div className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 cursor-default">
              <BookOpen className="w-4 h-4" />
              <span className="font-medium">Company</span>
            </div>

            {/* Company Subitems */}
            {companyItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-8 py-2.5 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors text-sm"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <item.icon className="w-3 h-3" />
                <span className="font-medium">{item.name}</span>
              </Link>
            ))}

            {/* 4. Settings Navigation */}
            {settingsNavigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors",
                  pathname === item.href && "text-blue-600 bg-blue-50",
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <item.icon className="w-4 h-4" />
                <span className="font-medium">{item.name}</span>
              </Link>
            ))}

            {/* 5. Analyze Navigation */}
            {analyzeNavigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors",
                  pathname === item.href && "text-blue-600 bg-blue-50",
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <item.icon className="w-4 h-4" />
                <span className="font-medium">{item.name}</span>
              </Link>
            ))}

            {/* 6. Sell Property Navigation */}
            {sellPropertyNavigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors",
                  pathname === item.href && "text-blue-600 bg-blue-50",
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <item.icon className="w-4 h-4" />
                <span className="font-medium">{item.name}</span>
              </Link>
            ))}

            {/* 7. Other Navigation (if any items exist) */}
            {otherNavigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors",
                  pathname === item.href && "text-blue-600 bg-blue-50",
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <item.icon className="w-4 h-4" />
                <span className="font-medium">{item.name}</span>
              </Link>
            ))}
            {session ? (
              <>
                <Link
                  href="/profile"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <User className="w-4 h-4" />
                  <span className="font-medium">Profile</span>
                </Link>
                <button
                  onClick={() => {
                    signOut({ callbackUrl: "/" });
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 w-full text-left transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="font-medium">Sign Out</span>
                </button>
              </>
            ) : (
              <div className="px-4 pt-2">
                <Link
                  href="/login"
                  className="block w-full px-4 py-3 bg-blue-600 text-white text-center font-medium rounded hover:bg-blue-700 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
