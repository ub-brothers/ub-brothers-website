"use client"
import Link from "next/link";
import { usePathname} from "next/navigation";

export default function DestinationLayout( {children,
}: Readonly<{
  children: React.ReactNode;
}>
){
    const pathname = usePathname(); 
    return(
        <>
        <div className="my-4 text-center ">
        <Link href="/destinations">
          <button
            className={`${
              pathname.startsWith ("/destinations") ? "bg-blue-500" : "bg-orange-500"
            } w-[100px] rounded-2xl h-6 text-white font-bold font-sans hover:bg-blue-700 hover:shadow-[0_4px_14px_rgba(0,0,0,0.2)] transition duration-300 shadow-lg`}
          >
            E-visa
          </button>
        </Link>
        <Link href="/stickerVisa" className="mx-2">
          <button
            className={`${
              pathname.startsWith ("/stickerVisa") ? "bg-blue-500" : "bg-orange-500"
            } w-[140px] rounded-2xl h-6 text-white font-bold font-sans hover:bg-blue-700 hover:shadow-[0_4px_14px_rgba(0,0,0,0.2)] transition duration-300 shadow-lg`}
          >
            Sticker Visa
          </button>
        </Link>
        <Link href="/fileConsult">
          <button
            className={`${
              pathname.startsWith ("/fileConsult") ? "bg-blue-500" : "bg-orange-500"
            } w-[170px] sm:mt-0 mt-2 rounded-2xl h-6 text-white font-bold font-sans hover:bg-blue-700 hover:shadow-[0_4px_14px_rgba(0,0,0,0.2)] transition duration-300 shadow-lg`}
          >
            File & Consultancy
          </button>
        </Link>
        <Link href="/tour" className="mx-2">
          <button
            className={`${
              pathname.startsWith ("/tour") ? "bg-blue-500" : "bg-orange-500"
            } w-[150px] sm:mt-0 mt-2 rounded-2xl h-6 text-white font-bold font-sans hover:bg-blue-700 hover:shadow-[0_4px_14px_rgba(0,0,0,0.2)] transition duration-300 shadow-lg`}
          >
            Tour Packages
          </button>
        </Link>
        <div className="sm:text-right text-center m-4 sm:text-md text-sm">
        <h1  className="font-bold">Mirza Ali:</h1>
        <p>+923 264214241</p></div>
      </div>
        {children}
        </>
    )
    
}
