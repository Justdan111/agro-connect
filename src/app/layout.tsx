import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SidebarProvider } from "@/context/sidebarContext";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { UserProvider } from "@/context/userContext";
import { CartProvider } from "@/context/cartContext";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Agro Connect",
  description: "Connect farmers, buyers, and transporters in a seamless agricultural marketplace",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
         <UserProvider>
          <SidebarProvider>
          <CartProvider>
            <ThemeProvider attribute="class"  defaultTheme="light" enableSystem disableTransitionOnChange>
              {children}
            </ThemeProvider>
            </CartProvider>
          </SidebarProvider>
        </UserProvider>
      </body>
    </html>
  );
}
