import type { Metadata } from "next";
import { Roboto_Flex } from 'next/font/google'
import "./globals.css";
import {Navbar} from "@/components/Navbar";
import { ThemeProvider } from "@/components/theme-provider";
import LoadingWrapper from "@/components/LoadingWrapper";
import "@/app/styles/animations.css"
const roboto = Roboto_Flex({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <ThemeProvider>
        <LoadingWrapper>
          <Navbar />
          <main className="pt-16">{children}</main>
        </LoadingWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
