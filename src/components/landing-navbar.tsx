"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Menu, X, Leaf, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function LandingNavbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="bg-agro-primary p-2 rounded-lg group-hover:scale-110 transition-transform">
              <Leaf className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl md:text-2xl font-bold text-agro-primary">
              Agro<span className="text-green-600">Connect</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="#features"
              className={`text-sm font-medium transition-colors hover:text-agro-primary ${
                isScrolled ? "text-gray-700" : "text-gray-700"
              }`}
            >
              Features
            </Link>

            {/* How It Works Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger
                className={`flex items-center text-sm font-medium transition-colors hover:text-agro-primary ${
                  isScrolled ? "text-gray-700" : "text-gray-700"
                }`}
              >
                How It Works
                <ChevronDown className="ml-1 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                <DropdownMenuItem asChild>
                  <Link href="#farmers" className="cursor-pointer">
                    For Farmers
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="#buyers" className="cursor-pointer">
                    For Buyers
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="#transporters" className="cursor-pointer">
                    For Transporters
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link
              href="#pricing"
              className={`text-sm font-medium transition-colors hover:text-agro-primary ${
                isScrolled ? "text-gray-700" : "text-gray-700"
              }`}
            >
              Pricing
            </Link>

            <Link
              href="#about"
              className={`text-sm font-medium transition-colors hover:text-agro-primary ${
                isScrolled ? "text-gray-700" : "text-gray-700"
              }`}
            >
              About
            </Link>

            <Link
              href="#contact"
              className={`text-sm font-medium transition-colors hover:text-agro-primary ${
                isScrolled ? "text-gray-700" : "text-gray-700"
              }`}
            >
              Contact
            </Link>
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button asChild variant="ghost" className="text-agro-primary hover:text-agro-primary hover:bg-green-50">
              <Link href="/auth/login">Sign In</Link>
            </Button>
            <Button asChild className="bg-agro-primary hover:bg-green-600 text-white">
              <Link href="/auth/register">Get Started</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-agro-primary" />
            ) : (
              <Menu className="h-6 w-6 text-agro-primary" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
          className="md:hidden bg-white border-t border-gray-200"
        >
          <div className="container mx-auto px-4 py-4 space-y-4">
            <Link
              href="#features"
              className="block py-2 text-gray-700 hover:text-agro-primary font-medium"
              onClick={toggleMobileMenu}
            >
              Features
            </Link>

            {/* Mobile How It Works Section */}
            <div className="space-y-2">
              <p className="text-sm font-semibold text-gray-900">How It Works</p>
              <Link
                href="#farmers"
                className="block py-2 pl-4 text-gray-700 hover:text-agro-primary"
                onClick={toggleMobileMenu}
              >
                For Farmers
              </Link>
              <Link
                href="#buyers"
                className="block py-2 pl-4 text-gray-700 hover:text-agro-primary"
                onClick={toggleMobileMenu}
              >
                For Buyers
              </Link>
              <Link
                href="#transporters"
                className="block py-2 pl-4 text-gray-700 hover:text-agro-primary"
                onClick={toggleMobileMenu}
              >
                For Transporters
              </Link>
            </div>

            <Link
              href="#pricing"
              className="block py-2 text-gray-700 hover:text-agro-primary font-medium"
              onClick={toggleMobileMenu}
            >
              Pricing
            </Link>

            <Link
              href="#about"
              className="block py-2 text-gray-700 hover:text-agro-primary font-medium"
              onClick={toggleMobileMenu}
            >
              About
            </Link>

            <Link
              href="#contact"
              className="block py-2 text-gray-700 hover:text-agro-primary font-medium"
              onClick={toggleMobileMenu}
            >
              Contact
            </Link>

            {/* Mobile CTA Buttons */}
            <div className="pt-4 space-y-2 border-t border-gray-200">
              <Button asChild variant="outline" className="w-full" onClick={toggleMobileMenu}>
                <Link href="/auth/login">Sign In</Link>
              </Button>
              <Button asChild className="w-full bg-agro-primary hover:bg-green-600" onClick={toggleMobileMenu}>
                <Link href="/auth/register">Get Started</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  )
}
