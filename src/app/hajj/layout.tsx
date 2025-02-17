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
           <Link href="/umrah" className="mx-2">
          <button
            className={`${
              pathname.startsWith ("/umrah") ? "bg-blue-500" : "bg-orange-500"
            } w-[140px] rounded-2xl h-6 text-white font-bold font-sans hover:bg-blue-700 hover:shadow-[0_4px_14px_rgba(0,0,0,0.2)] transition duration-300 shadow-lg`}
          >
            Umrah
          </button>
        </Link>
        <Link href="/hajj">
          <button
            className={`${
              pathname.startsWith ("/hajj") ? "bg-blue-500" : "bg-orange-500"
            } w-[100px] rounded-2xl h-6 text-white font-bold font-sans hover:bg-blue-700 hover:shadow-[0_4px_14px_rgba(0,0,0,0.2)] transition duration-300 shadow-lg`}
          >
            Hajj
          </button>
        </Link>
       
    
        <div className="sm:text-right text-center m-4 sm:text-md text-sm">
        <h1  className="font-bold">Mirza Shaharyaar Mughal:</h1>
        <p>+92 300 9480157</p></div>
      </div>
        {children}

       
        </>
    )
    
}