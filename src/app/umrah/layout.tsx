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
            } w-[120px] rounded-2xl h-6 text-white font-bold font-sans hover:bg-blue-700 hover:shadow-[0_4px_14px_rgba(0,0,0,0.2)] transition duration-300 shadow-lg`}
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
        
        <Link href="/iranIraq" className="mx-2">
          <button
            className={`${
              pathname.startsWith ("/iranIraq") ? "bg-blue-500" : "bg-orange-500"
            } w-[160px] rounded-2xl sm:mt-0 mt-2 h-6 text-white font-bold font-sans hover:bg-blue-700 hover:shadow-[0_4px_14px_rgba(0,0,0,0.2)] transition duration-300 shadow-lg`}
          >
            Iran Iraq Ziyarat
          </button>
        </Link>
       
    
        <div className="sm:text-right text-center m-4 sm:text-md text-sm">
        <h1  className="font-bold">Narmeen Mughal:</h1>
        <p>+92 303 4225181</p></div>
      </div>
        {children}


        <div className="w-full p-8">
      <h2 className="text-3xl font-bold mb-8 text-center text-blue-900">You Can Directly Contact:</h2>
      
  

    
      <div className="text-center">
        <p className="sm:text-2xl text-lg font-semibold font-serif">Narmeen Mughal</p>
        <p className="text-sm text-gray-500 mt-2">+92 303 4225181</p>
        <p className="text-sm text-gray-500">&#9993;  ubbrothersticketing@gmail.com</p>
      </div>
    </div>
        </>
    )
    
}