import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return  <div className="min-h-screen bg-[#FFFFF4]">
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FFFFFFE6] backdrop-blur-md border-b-2 border-[#151616]">
    <div className="">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center ml-20">
                <span className="ml-20 font-bold text-black text-2xl">DotSlash</span>
              </Link>
              <div className="ml-5 px-3 py-2">
                <Link href="/" className="text-black hover:bg-[#D6F34C] px-3 py-2 rounded-lg text-lg">
                  Home
                </Link>
                <Link href="/about" className="text-black hover:bg-[#D6F34C] px-3 py-2 rounded-lg text-lg">
                  About
                </Link>
                <Link href="/contact" className="text-black hover:bg-[#D6F34C] px-3 py-2 rounded-lg text-lg">
                  Contact
                </Link>
              </div>
            </div>
            <div className="flex items-center gap-4 mr-20">
              <button className=" px-4 py-2 rounded-lg border-2 border-[#151616] hover:bg-[#D6F32F]/10
                      text-sm font-medium transition-colors text-black"
                >Log In</button>
              <button className="text-black px-4 py-2 rounded-lg bg-[#D6F32F] border-2 border-[#151616] 
                      shadow-[3px_3px_0px_0px_#151616] hover:shadow-[1px_1px_0px_0px_#151616] 
                      hover:translate-x-[2px] hover:translate-y-[2px] transition-all text-sm font-medium"
              >Sign Up</button> 
            </div>
          </div>
        </div>
    </nav>
  </div>
}
