"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight, Leaf, ShoppingCart, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function LandingPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="flex min-h-screen flex-col bg-agro-primary/10">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-agro-accent to-white py-20 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
            <motion.div
              className="flex flex-col justify-center space-y-4"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter text-agro-primary sm:text-5xl xl:text-6xl/none">
                  Connecting Agriculture's Future
                </h1>
                <p className="max-w-[600px] text-gray-700 md:text-xl">
                  AgroConnect brings together farmers, buyers, and transporters in a seamless marketplace, empowering
                  agricultural communities with technology.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild size="lg" className="bg-agro-primary hover:bg-green-400 ">
                  <Link href="/auth/register">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/auth/login">Sign In</Link>
                </Button>
              </div>
            </motion.div>
            <motion.div
              className="flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Image
                src="/images/agroconnect.png?height=400&width=400"
                width={400}
                height={400}
                alt="AgroConnect Platform"
                className="rounded-lg object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* User Types Section */}
      <section className="py-12 md:py-24 bg-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-agro-primary">
                Choose Your Role
              </h2>
              <p className="max-w-[900px] text-gray-700 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                AgroConnect serves different users in the agricultural ecosystem. Select your role to get started.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {[
              {
                title: "Farmer",
                description: "Manage your farm, sell produce, and get AI-powered insights to optimize your yields.",
                icon: <Leaf className="h-12 w-12 text-agro-primary" />,
                delay: 0.1,
              },
              {
                title: "Buyer",
                description: "Source quality produce directly from farmers, negotiate prices, and manage procurement.",
                icon: <ShoppingCart className="h-12 w-12 text-agro-primary" />,
                delay: 0.2,
              },
              {
                title: "Transporter",
                description: "Connect with farmers and buyers to provide logistics services for agricultural products.",
                icon: <Truck className="h-12 w-12 text-agro-primary" />,
                delay: 0.3,
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: item.delay }}
              >
                <Card className="h-full">
                  <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                    <div className="p-2 rounded-full bg-agro-accent">{item.icon}</div>
                    <h3 className="text-xl font-bold text-agro-primary">{item.title}</h3>
                    <p className="text-gray-700">{item.description}</p>
                    <Button asChild variant="outline" className="mt-auto">
                      <Link href={`/auth/register?role=${item.title.toLowerCase()}`}>Register as {item.title}</Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-24 bg-agro-accent/30">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-agro-primary">
                Platform Features
              </h2>
              <p className="max-w-[900px] text-gray-700 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Discover the powerful tools and features that make AgroConnect the leading agricultural marketplace
                platform.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {[
              "AI-Powered Crop Advisory",
              "Real-time Market Prices",
              "Secure Payment System",
              "Logistics Integration",
              "Weather Forecasting",
              "Community Knowledge Base",
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-agro-primary mb-2">{feature}</h3>
                    <p className="text-gray-700">
                      Advanced tools and features designed specifically for agricultural businesses and operations.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-24 bg-agro-primary">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center text-white">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to Transform Your Agricultural Business?
              </h2>
              <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join thousands of farmers, buyers, and transporters already using AgroConnect.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild size="lg" variant="secondary" className=" text-agro-primary hover:bg-white/90">
                <Link href="/auth/register">Get Started Now</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-6">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-agro-primary mb-4">AgroConnect</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-gray-700 hover:text-agro-primary">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-700 hover:text-agro-primary">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="text-gray-700 hover:text-agro-primary">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-agro-primary mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/blog" className="text-gray-700 hover:text-agro-primary">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/guides" className="text-gray-700 hover:text-agro-primary">
                    Guides
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-gray-700 hover:text-agro-primary">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-agro-primary mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/terms" className="text-gray-700 hover:text-agro-primary">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-gray-700 hover:text-agro-primary">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/cookies" className="text-gray-700 hover:text-agro-primary">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-agro-primary mb-4">Connect</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-700 hover:text-agro-primary">
                    Twitter
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-700 hover:text-agro-primary">
                    Facebook
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-700 hover:text-agro-primary">
                    Instagram
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-200 pt-6 text-center text-gray-700">
            <p>© {new Date().getFullYear()} AgroConnect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
