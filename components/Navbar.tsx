import Link from "next/link";

export default function Navbar() {
    return <div className="min-h-screen bg-[#FFFFF4]">
        <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FFFFFFE6] backdrop-blur-md border-b-2 border-[#151616]">
            <div className="">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center gap-4">
                        <div>
                            <Link href="/" className="flex items-center ml-20">
                                <span className="ml-20 font-bold text-black text-3xl">DotSlash</span>
                            </Link>
                        </div>
                        <div className="ml-5 px-3 py-2 flex items-center gap-4">
                            <div className="transform transition duration-100 ease-in-out hover:scale-100">
                                <Link href="/" className="font-medium text-lg text-[#151616] hover:bg-[#D6F34C] px-3 py-2 rounded-lg rounded-lg bg-[#D6F32F] border-2 border-[#151616] shadow-[3px_3px_0px_0px_#151616] hover:shadow-[1px_1px_0px_0px_#151616] hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
                                    Home
                                </Link>
                            </div>
                            <div className="transform transition duration-100 ease-in-out hover:scale-100">
                                <Link href="/about" className="font-medium text-lg text-[#151616] hover:bg-[#D6F34C] px-3 py-2 rounded-lg rounded-lg bg-[#D6F32F] border-2 border-[#151616] shadow-[3px_3px_0px_0px_#151616] hover:shadow-[1px_1px_0px_0px_#151616] hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
                                    About
                                </Link>
                            </div>
                            <div className="transform transition duration-100 ease-in-out hover:scale-100">
                                <Link href="/contact" className="font-medium text-lg text-[#151616] hover:bg-[#D6F34C] px-3 py-2 rounded-lg rounded-lg bg-[#D6F32F] border-2 border-[#151616] shadow-[3px_3px_0px_0px_#151616] hover:shadow-[1px_1px_0px_0px_#151616] hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
                                    Contact
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 mr-20">
                        <button className=" px-4 py-2 rounded-lg border-2 border-[#151616] hover:bg-[#D6F32F]/10
                      text-sm font-bold text-black shadow-[3px_3px_0px_0px_#151616] hover:shadow-[1px_1px_0px_0px_#151616] 
                      hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                        >Login</button>
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
