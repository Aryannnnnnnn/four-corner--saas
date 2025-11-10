"use client";

import {
  BookMarked,
  BookOpen,
  ChevronDown,
  DollarSign,
  FolderOpen,
  Home,
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
  const [propertiesDropdownOpen, setPropertiesDropdownOpen] = useState(false);
  const [buyersDropdownOpen, setBuyersDropdownOpen] = useState(false);
  const [sellersDropdownOpen, setSellersDropdownOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  // Mobile accordion state
  const [mobilePropertiesOpen, setMobilePropertiesOpen] = useState(false);
  const [mobileBuyersOpen, setMobileBuyersOpen] = useState(false);
  const [mobileSellersOpen, setMobileSellersOpen] = useState(false);
  const [mobileLocalResourcesOpen, setMobileLocalResourcesOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);

  // Navigation structure
  const propertiesItems = [
    { name: "View All Listings", href: "/listings", icon: FolderOpen },
    { name: "Analyze Property", href: "/analyze-your-property", icon: Search },
    { name: "List Your Property", href: "/list-property", icon: PlusCircle },
  ];

  const buyersItems = [
    { name: "Buyer's Education Hub", href: "/buyers-education", icon: BookOpen },
    { name: "First Time Buyer", href: "/buyers-education/first-time-buyer", icon: BookMarked },
    { name: "Understanding Mortgages", href: "/buyers-education/understanding-mortgages", icon: DollarSign },
    { name: "VT Homebuyer Programs", href: "/buyers-education/vt-homebuyer-programs", icon: Home },
    { name: "Vermont Attorney Requirement", href: "/buyers-education/vermont-attorney-requirement", icon: BookMarked },
    { name: "Sample Forms & Documents", href: "/buyers-education/sample-forms", icon: FolderOpen },
    { name: "Home Inspection", href: "/buyers-education/home-inspection", icon: Search },
    { name: "Appraisal Process", href: "/buyers-education/appraisal-process", icon: Search },
    { name: "Closing Costs Explained", href: "/buyers-education/closing-costs", icon: DollarSign },
    { name: "Final Walkthrough", href: "/buyers-education/final-walkthrough", icon: FolderOpen },
    { name: "Closing Process", href: "/buyers-education/closing-process", icon: FolderOpen },
  ];

  const sellersItems = [
    { name: "Seller's Education Hub", href: "/sellers-education", icon: BookOpen },
    { name: "Preparing to Sell", href: "/sellers-education/preparing-to-sell", icon: BookMarked },
    { name: "SPIR & Seller Disclosures", href: "/sellers-education/spir-disclosures", icon: FolderOpen },
    { name: "Pricing Strategy", href: "/sellers-education/pricing-strategy", icon: DollarSign },
    { name: "Staging Tips", href: "/sellers-education/staging-tips", icon: Home },
    { name: "Marketing Your Home", href: "/sellers-education/marketing-your-home", icon: BookOpen },
    { name: "Negotiating Offers", href: "/sellers-education/negotiating-offers", icon: DollarSign },
    { name: "Seller Closing Costs", href: "/sellers-education/closing-costs", icon: DollarSign },
  ];

  const localResourcesItems = [
    { name: "Local Resources Hub", href: "/local-resources", icon: Home },
    { name: "Schools & Education", href: "/local-resources/schools-education", icon: BookOpen },
    { name: "Utilities & Services", href: "/local-resources/utilities-services", icon: Settings },
    { name: "Community & Amenities", href: "/local-resources/community-amenities", icon: Home },
    { name: "Transportation", href: "/local-resources/transportation", icon: Home },
    { name: "Local Government", href: "/local-resources/local-government", icon: BookOpen },
    { name: "ANR Maps & Resources", href: "/local-resources/anr-maps", icon: BookMarked },
    { name: "Wastewater Permits", href: "/local-resources/wastewater-permits", icon: Settings },
    { name: "County Land Records", href: "/local-resources/land-records", icon: FolderOpen },
    { name: "Act 250 Guide", href: "/act-250-guide", icon: BookMarked },
    { name: "Contract Glossary", href: "/contract-glossary", icon: BookOpen },
  ];

  const aboutItems = [
    { name: "About Us", href: "/about", icon: BookOpen },
    { name: "Success Stories", href: "/success-stories", icon: BookMarked },
  ];

  // Close dropdowns when clicking outside or on route change
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Don't close if clicking inside a dropdown or on the profile button
      if (target.closest('.dropdown-container')) {
        return;
      }
      setPropertiesDropdownOpen(false);
      setBuyersDropdownOpen(false);
      setSellersDropdownOpen(false);
      setAboutDropdownOpen(false);
      setProfileDropdownOpen(false);
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    // Close dropdowns when route changes
    setPropertiesDropdownOpen(false);
    setBuyersDropdownOpen(false);
    setSellersDropdownOpen(false);
    setAboutDropdownOpen(false);
    setProfileDropdownOpen(false);
  }, [pathname]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className=" px-4 sm:px-6 lg:px-8">
        {/* Three-column grid layout for proper centering */}
        <div className="grid grid-cols-3 items-center h-16">
          {/* Logo - Left Column */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
              <Image
                src="/logooo.jpg"
                alt="Four Corner Properties"
                width={120}
                height={45}
                priority
                quality={100}
                className="h-8 sm:h-10 w-auto object-contain"
                unoptimized
              />
            </Link>
          </div>

          {/* Desktop Navigation - Center Column */}
          <nav className="hidden xl:flex items-center justify-center space-x-6 2xl:space-x-8">
            {/* 1. Home */}
            <Link
              href="/"
              className={cn(
                "group flex items-center justify-center gap-1.5 text-sm font-semibold text-gray-700 hover:text-[#21266c] tracking-wide uppercase transition-all duration-300 whitespace-nowrap relative",
                pathname === "/" && "text-[#21266c]",
              )}
            >
              <span className="relative z-10">Home</span>
              <span className={cn(
                "absolute bottom-0 left-0 right-0 h-0.5 bg-[#3b82f6] transition-all duration-300",
                pathname === "/" ? "opacity-100" : "opacity-0 group-hover:opacity-100"
              )}></span>
            </Link>

                        {/* 6. About Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => setAboutDropdownOpen(true)}
              onMouseLeave={() => setAboutDropdownOpen(false)}
            >
              <div className="flex items-center justify-center gap-1.5 text-sm font-semibold text-gray-700 hover:text-[#21266c] tracking-wide uppercase transition-all duration-300 cursor-default whitespace-nowrap relative">
                <span className="relative z-10">About</span>
                <ChevronDown className={cn(
                  "w-3.5 h-3.5 opacity-70 transition-transform duration-300",
                  aboutDropdownOpen && "rotate-180"
                )} />
              </div>

              <div
                className={cn(
                  "absolute top-full left-0 w-60 bg-white border border-gray-200 rounded-lg shadow-2xl overflow-hidden transition-all duration-300 z-50",
                  aboutDropdownOpen
                    ? "opacity-100 visible translate-y-0"
                    : "opacity-0 invisible -translate-y-2 pointer-events-none",
                )}
              >
                {aboutItems.map((item, index) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "block px-5 py-3.5 text-sm font-medium text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent hover:text-[#21266c] transition-all duration-200 border-b border-gray-100 last:border-b-0",
                      index === 0 && "rounded-t-lg"
                    )}
                  >
                    <span className="block">{item.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/calculators"
              className={cn(
                "group flex items-center justify-center gap-1.5 text-sm font-semibold text-gray-700 hover:text-[#21266c] tracking-wide uppercase transition-all duration-300 whitespace-nowrap relative",
                pathname === "/calculators" && "text-[#21266c]",
              )}
            >
              <span className="relative z-10">Calculators</span>
              <span className={cn(
                "absolute bottom-0 left-0 right-0 h-0.5 bg-[#3b82f6] transition-all duration-300",
                pathname === "/calculators" ? "opacity-100" : "opacity-0 group-hover:opacity-100"
              )}></span>
            </Link>

            {/* 2. Properties & Local Resources Combined Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => setPropertiesDropdownOpen(true)}
              onMouseLeave={() => setPropertiesDropdownOpen(false)}
            >
              <div className="flex items-center justify-center gap-1.5 text-sm font-semibold text-gray-700 hover:text-[#21266c] tracking-wide uppercase transition-all duration-300 cursor-default whitespace-nowrap relative">
                <span className="relative z-10">Properties</span>
                <ChevronDown className={cn(
                  "w-3.5 h-3.5 opacity-70 transition-transform duration-300 relative z-10",
                  propertiesDropdownOpen && "rotate-180"
                )} />
                <span className={cn(
                  "absolute bottom-0 left-0 right-0 h-0.5 bg-[#3b82f6] transition-all duration-300",
                  "opacity-0 group-hover:opacity-100"
                )}></span>
              </div>

              <div
                className={cn(
                  "absolute top-full left-0 w-[600px] bg-white border border-gray-200 rounded-lg shadow-2xl overflow-hidden transition-all duration-300 z-50",
                  propertiesDropdownOpen
                    ? "opacity-100 visible translate-y-0"
                    : "opacity-0 invisible -translate-y-2 pointer-events-none",
                )}
              >
                <div className="flex">
                  {/* Left Side - Properties */}
                  <div className="flex-1 p-2">
                    <div className="px-3 py-2 mb-1">
                      <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Properties</h3>
                    </div>
                    {propertiesItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent hover:text-[#21266c] transition-all duration-200 rounded-md"
                      >
                        <span className="block">{item.name}</span>
                      </Link>
                    ))}
                  </div>

                  {/* Center Divider */}
                  <div className="w-px bg-gray-200"></div>

                  {/* Right Side - Local Resources */}
                  <div className="flex-1 p-2">
                    <div className="px-3 py-2 mb-1">
                      <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Local Resources</h3>
                    </div>
                    {localResourcesItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent hover:text-[#21266c] transition-all duration-200 rounded-md"
                      >
                        <span className="block">{item.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 3. For Buyers Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => setBuyersDropdownOpen(true)}
              onMouseLeave={() => setBuyersDropdownOpen(false)}
            >
              <div className="flex items-center justify-center gap-1.5 text-sm font-semibold text-gray-700 hover:text-[#21266c] tracking-wide uppercase transition-all duration-300 cursor-default whitespace-nowrap relative">
                <span className="relative z-10">For Buyers</span>
                <ChevronDown className={cn(
                  "w-3.5 h-3.5 opacity-70 transition-transform duration-300",
                  buyersDropdownOpen && "rotate-180"
                )} />
              </div>

              <div
                className={cn(
                  "absolute top-full left-0 w-72 bg-white border border-gray-200 rounded-lg shadow-2xl overflow-hidden transition-all duration-300 z-50",
                  buyersDropdownOpen
                    ? "opacity-100 visible translate-y-0"
                    : "opacity-0 invisible -translate-y-2 pointer-events-none",
                )}
              >
                {buyersItems.map((item, index) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "block px-5 py-3.5 text-sm font-medium text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent hover:text-[#21266c] transition-all duration-200 border-b border-gray-100 last:border-b-0",
                      index === 0 && "rounded-t-lg bg-gradient-to-r from-blue-50/30 to-transparent font-semibold"
                    )}
                  >
                    <span className="block">{item.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* 4. For Sellers Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => setSellersDropdownOpen(true)}
              onMouseLeave={() => setSellersDropdownOpen(false)}
            >
              <div className="flex items-center justify-center gap-1.5 text-sm font-semibold text-gray-700 hover:text-[#21266c] tracking-wide uppercase transition-all duration-300 cursor-default whitespace-nowrap relative">
                <span className="relative z-10">For Sellers</span>
                <ChevronDown className={cn(
                  "w-3.5 h-3.5 opacity-70 transition-transform duration-300",
                  sellersDropdownOpen && "rotate-180"
                )} />
              </div>

              <div
                className={cn(
                  "absolute top-full left-0 w-72 bg-white border border-gray-200 rounded-lg shadow-2xl overflow-hidden transition-all duration-300 z-50",
                  sellersDropdownOpen
                    ? "opacity-100 visible translate-y-0"
                    : "opacity-0 invisible -translate-y-2 pointer-events-none",
                )}
              >
                {sellersItems.map((item, index) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "block px-5 py-3.5 text-sm font-medium text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent hover:text-[#21266c] transition-all duration-200 border-b border-gray-100 last:border-b-0",
                      index === 0 && "rounded-t-lg bg-gradient-to-r from-blue-50/30 to-transparent font-semibold"
                    )}
                  >
                    <span className="block">{item.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* 5. Contact */}
            <Link
              href="/contact"
              className={cn(
                "group flex items-center justify-center gap-1.5 text-sm font-semibold text-gray-700 hover:text-[#21266c] tracking-wide uppercase transition-all duration-300 whitespace-nowrap relative",
                pathname === "/contact" && "text-[#21266c] border-[#3b82f6]",
              )}
            >
              <span className="relative z-10">Contact</span>
            </Link>
          </nav>

          {/* Authentication Section - Right Column */}
          <div className="hidden xl:flex items-center justify-end space-x-3">
            {session ? (
              <>
                {/* Profile Icon with Dropdown */}
              <div
                className="relative group dropdown-container"
                onMouseEnter={() => setProfileDropdownOpen(true)}
                onMouseLeave={() => setProfileDropdownOpen(false)}
              >
                <Link
                  href="/profile"
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-[#21266c] to-[#3b82f6] text-white font-bold text-sm hover:from-[#3b82f6] hover:to-[#21266c] transition-all duration-300 shadow-md hover:shadow-xl hover:scale-105"
                  onClick={() => setProfileDropdownOpen(false)}
                >
                  {session.user?.name?.[0]?.toUpperCase() ||
                    session.user?.email?.[0]?.toUpperCase() ||
                    "U"}
                </Link>

                {/* Profile Dropdown Menu */}
                <div
                  className={cn(
                    "absolute top-full right-0 mt-1 w-52 bg-white border border-gray-200 rounded-lg shadow-2xl overflow-hidden transition-all duration-300 z-50",
                    profileDropdownOpen
                      ? "opacity-100 visible translate-y-0"
                      : "opacity-0 invisible -translate-y-2 pointer-events-none",
                  )}
                >
                  <Link
                    href="/dashboard"
                    className="block px-5 py-3.5 text-sm font-medium text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent hover:text-[#21266c] transition-all duration-200 border-b border-gray-100"
                    onClick={() => setProfileDropdownOpen(false)}
                  >
                    <div className="flex items-center gap-3">
                      <Home className="w-4 h-4" />
                      <span>Dashboard</span>
                    </div>
                  </Link>
                  <Link
                    href="/profile"
                    className="block px-5 py-3.5 text-sm font-medium text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent hover:text-[#21266c] transition-all duration-200 border-b border-gray-100"
                    onClick={() => setProfileDropdownOpen(false)}
                  >
                    <div className="flex items-center gap-3">
                      <User className="w-4 h-4" />
                      <span>Profile</span>
                    </div>
                  </Link>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setProfileDropdownOpen(false);
                      signOut({ callbackUrl: "/" });
                    }}
                    className="w-full text-left px-5 py-3.5 text-sm font-medium text-red-600 hover:bg-gradient-to-r hover:from-red-50 hover:to-transparent transition-all duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </div>
                  </button>
                </div>
              </div>

                {/* Settings Gear Icon */}
                <Link
                  href="/settings"
                  className={cn(
                    "flex items-center justify-center w-10 h-10 rounded-full text-gray-600 hover:text-[#21266c] hover:bg-gray-100 transition-all duration-300 hover:scale-105",
                    pathname === "/settings" && "text-[#21266c] bg-gray-100",
                  )}
                >
                  <Settings className="w-5 h-5" />
                </Link>
              </>
            ) : (
              <Link
                href="/login"
                className="group flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-[#21266c] tracking-wide uppercase transition-all duration-300 whitespace-nowrap"
              >
                <User className="w-4 h-4" />
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Menu Button - Only visible on mobile */}
          <div className="xl:hidden flex items-center justify-end col-span-2">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 p-2.5 hover:bg-gray-100 rounded-lg transition-all duration-300 hover:scale-105"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="xl:hidden mt-4 space-y-2 border-t border-gray-200 pt-5 pb-5 bg-white max-h-[calc(100vh-80px)] overflow-y-auto">
            {/* 1. Home */}
            <Link
              href="/"
              className={cn(
                "flex items-center gap-3 px-5 py-4 rounded-lg text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent hover:text-[#21266c] transition-all duration-200 min-h-[44px]",
                pathname === "/" && "text-[#21266c] bg-gradient-to-r from-blue-50 to-transparent font-semibold",
              )}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Home className="w-5 h-5" />
              <span className="font-medium">Home</span>
            </Link>

                        {/* 6. About Section */}
            <div>
              <button
                onClick={() => setMobileAboutOpen(!mobileAboutOpen)}
                className="flex items-center justify-between w-full px-5 py-4 rounded-lg text-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-transparent transition-all duration-200 min-h-[44px]"
              >
                <div className="flex items-center gap-3">
                  <BookOpen className="w-5 h-5" />
                  <span className="font-semibold">About</span>
                </div>
                <ChevronDown
                  className={cn(
                    "w-5 h-5 transition-transform duration-300",
                    mobileAboutOpen && "rotate-180",
                  )}
                />
              </button>
              {mobileAboutOpen && (
                <div className="mt-2 space-y-1 ml-3 pl-5 border-l-2 border-blue-200">
                  {aboutItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent hover:text-[#21266c] transition-all duration-200 text-sm min-h-[44px]"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <item.icon className="w-4 h-4" />
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* 2. Calculators */}
            <Link
              href="/calculators"
              className={cn(
                "flex items-center gap-3 px-5 py-4 rounded-lg text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent hover:text-[#21266c] transition-all duration-200 min-h-[44px]",
                pathname === "/" && "text-[#21266c] bg-gradient-to-r from-blue-50 to-transparent font-semibold",
              )}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Home className="w-5 h-5" />
              <span className="font-medium">Calculators</span>
            </Link>



            {/* 2. Properties Section */}
            <div>
              <button
                onClick={() => setMobilePropertiesOpen(!mobilePropertiesOpen)}
                className="flex items-center justify-between w-full px-5 py-4 rounded-lg text-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-transparent transition-all duration-200 min-h-[44px]"
              >
                <div className="flex items-center gap-3">
                  <FolderOpen className="w-5 h-5" />
                  <span className="font-semibold">Properties</span>
                </div>
                <ChevronDown
                  className={cn(
                    "w-5 h-5 transition-transform duration-300",
                    mobilePropertiesOpen && "rotate-180",
                  )}
                />
              </button>
              {mobilePropertiesOpen && (
                <div className="mt-2 space-y-1 ml-3 pl-5 border-l-2 border-blue-200">
                  {propertiesItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent hover:text-[#21266c] transition-all duration-200 text-sm min-h-[44px]"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <item.icon className="w-4 h-4" />
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* 3. For Buyers Section */}
            <div>
              <button
                onClick={() => setMobileBuyersOpen(!mobileBuyersOpen)}
                className="flex items-center justify-between w-full px-5 py-4 rounded-lg text-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-transparent transition-all duration-200 min-h-[44px]"
              >
                <div className="flex items-center gap-3">
                  <BookOpen className="w-5 h-5" />
                  <span className="font-semibold">For Buyers</span>
                </div>
                <ChevronDown
                  className={cn(
                    "w-5 h-5 transition-transform duration-300",
                    mobileBuyersOpen && "rotate-180",
                  )}
                />
              </button>
              {mobileBuyersOpen && (
                <div className="mt-2 space-y-1 ml-3 pl-5 border-l-2 border-blue-200">
                  {buyersItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent hover:text-[#21266c] transition-all duration-200 text-sm min-h-[44px]"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <item.icon className="w-4 h-4" />
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* 4. For Sellers Section */}
            <div>
              <button
                onClick={() => setMobileSellersOpen(!mobileSellersOpen)}
                className="flex items-center justify-between w-full px-5 py-4 rounded-lg text-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-transparent transition-all duration-200 min-h-[44px]"
              >
                <div className="flex items-center gap-3">
                  <PlusCircle className="w-5 h-5" />
                  <span className="font-semibold">For Sellers</span>
                </div>
                <ChevronDown
                  className={cn(
                    "w-5 h-5 transition-transform duration-300",
                    mobileSellersOpen && "rotate-180",
                  )}
                />
              </button>
              {mobileSellersOpen && (
                <div className="mt-2 space-y-1 ml-3 pl-5 border-l-2 border-blue-200">
                  {sellersItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent hover:text-[#21266c] transition-all duration-200 text-sm min-h-[44px]"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <item.icon className="w-4 h-4" />
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* 5. Local Resources Section */}
            <div>
              <button
                onClick={() => setMobileLocalResourcesOpen(!mobileLocalResourcesOpen)}
                className="flex items-center justify-between w-full px-5 py-4 rounded-lg text-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-transparent transition-all duration-200 min-h-[44px]"
              >
                <div className="flex items-center gap-3">
                  <Home className="w-5 h-5" />
                  <span className="font-semibold">Local Resources</span>
                </div>
                <ChevronDown
                  className={cn(
                    "w-5 h-5 transition-transform duration-300",
                    mobileLocalResourcesOpen && "rotate-180",
                  )}
                />
              </button>
              {mobileLocalResourcesOpen && (
                <div className="mt-2 space-y-1 ml-3 pl-5 border-l-2 border-blue-200">
                  {localResourcesItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent hover:text-[#21266c] transition-all duration-200 text-sm min-h-[44px]"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <item.icon className="w-4 h-4" />
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* 7. Contact */}
            <Link
              href="/contact"
              className={cn(
                "flex items-center gap-3 px-5 py-4 rounded-lg text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent hover:text-[#21266c] transition-all duration-200 min-h-[44px]",
                pathname === "/contact" && "text-[#21266c] bg-gradient-to-r from-blue-50 to-transparent font-semibold",
              )}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <PlusCircle className="w-5 h-5" />
              <span className="font-medium">Contact</span>
            </Link>

            {/* Divider for auth section */}
            <div className="my-3 border-t border-gray-200"></div>

            {session ? (
              <>
                <Link
                  href="/dashboard"
                  className={cn(
                    "flex items-center gap-3 px-5 py-4 rounded-lg text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent hover:text-[#21266c] transition-all duration-200 min-h-[44px]",
                    pathname === "/dashboard" && "text-[#21266c] bg-gradient-to-r from-blue-50 to-transparent font-semibold",
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Home className="w-5 h-5" />
                  <span className="font-medium">Dashboard</span>
                </Link>
                <Link
                  href="/profile"
                  className={cn(
                    "flex items-center gap-3 px-5 py-4 rounded-lg text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent hover:text-[#21266c] transition-all duration-200 min-h-[44px]",
                    pathname === "/profile" && "text-[#21266c] bg-gradient-to-r from-blue-50 to-transparent font-semibold",
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <User className="w-5 h-5" />
                  <span className="font-medium">Profile</span>
                </Link>
                <Link
                  href="/settings"
                  className={cn(
                    "flex items-center gap-3 px-5 py-4 rounded-lg text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent hover:text-[#21266c] transition-all duration-200 min-h-[44px]",
                    pathname === "/settings" && "text-[#21266c] bg-gradient-to-r from-blue-50 to-transparent font-semibold",
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Settings className="w-5 h-5" />
                  <span className="font-medium">Settings</span>
                </Link>
                <button
                  onClick={() => {
                    signOut({ callbackUrl: "/" });
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-3 px-5 py-4 rounded-lg text-red-600 hover:bg-gradient-to-r hover:from-red-50 hover:to-transparent w-full text-left transition-all duration-200 min-h-[44px]"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-semibold">Sign Out</span>
                </button>
              </>
            ) : (
              <div className="px-2 pt-2">
                <Link
                  href="/login"
                  className="flex items-center justify-center gap-2 w-full px-5 py-4 bg-gradient-to-r from-[#21266c] to-[#3b82f6] text-white text-center font-semibold rounded-lg hover:from-[#3b82f6] hover:to-[#21266c] transition-all duration-300 shadow-md hover:shadow-lg min-h-[44px]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <User className="w-5 h-5" />
                  <span>Sign In</span>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
