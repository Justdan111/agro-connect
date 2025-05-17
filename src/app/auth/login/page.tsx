"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Leaf, ShoppingCart, Truck } from "lucide-react"
import { UserRole, useUser } from "@/context/userContext"


export default function LoginPage() {
  const router = useRouter()
  const { setUser } = useUser()
  const [isLoading, setIsLoading] = useState(false)
  const [userRole, setUserRole] = useState<UserRole>("farmer")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate authentication
    setTimeout(() => {
      // Create a mock user with the selected role
      const user = {
        id: "user-1",
        name: userRole === "farmer" ? "John Farmer" : userRole === "buyer" ? "Alice Buyer" : "Bob Transporter",
        email: email || `${userRole}@example.com`,
        role: userRole,
      }

      // Set the user in context
      setUser(user)

      setIsLoading(false)
      router.push("/dashboard")
    }, 1500)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-agro-accent/30 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">AgroConnect</CardTitle>
          <CardDescription>Enter your credentials to access your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-4">
              <Label>Login as:</Label>
              <RadioGroup
                value={userRole}
                onValueChange={(value) => setUserRole(value as UserRole)}
                className="grid grid-cols-3 gap-4 "
              >
                <Label
                  htmlFor="farmer"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-green-400 "
                >
                  <RadioGroupItem value="farmer" id="farmer" className="sr-only" />
                  <Leaf className="mb-3 h-6 w-6" />
                  <span className="text-center text-sm font-medium">Farmer</span>
                </Label>
                <Label
                  htmlFor="buyer"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-green-400 "
                >
                  <RadioGroupItem value="buyer" id="buyer" className="sr-only" />
                  <ShoppingCart className="mb-3 h-6 w-6" />
                  <span className="text-center text-sm font-medium">Buyer</span>
                </Label>
                <Label
                  htmlFor="transporter"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-green-400 "
                >
                  <RadioGroupItem value="transporter" id="transporter" className="sr-only" />
                  <Truck className="mb-3 h-6 w-6" />
                  <span className="text-center text-sm font-medium">Transporter</span>
                </Label>
              </RadioGroup>
            </div>

            <Tabs defaultValue="email" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="email">Email</TabsTrigger>
                <TabsTrigger value="phone">Phone</TabsTrigger>
              </TabsList>
              <TabsContent value="email">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <Link href="/auth/reset-password" className="text-sm text-agro-primary hover:underline">
                        Forgot password?
                      </Link>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="remember" />
                    <label
                      htmlFor="remember"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="phone">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="otp">One-Time Password</Label>
                    <Input id="otp" type="text" placeholder="000000" />
                  </div>
                  <Button type="button" variant="outline" className="w-full">
                    Send OTP
                  </Button>
                </div>
              </TabsContent>
            </Tabs>

            <Button type="submit" className="w-full bg-green-300  hover:bg-green-200/90" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/auth/register" className="text-agro-primary hover:underline">
              Sign up
            </Link>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <Button variant="outline">Google</Button>
            <Button variant="outline">Facebook</Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
