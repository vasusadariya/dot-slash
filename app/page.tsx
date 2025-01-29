"use client"
import LoadingWrapper from "@/components/LoadingWrapper"
import { Navbar } from "@/components/Navbar"

export default function Home() {
  return (
    <>
      <LoadingWrapper>
        <Navbar />
      </LoadingWrapper>
    </>
  )
}