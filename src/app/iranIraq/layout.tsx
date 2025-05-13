"use client"

import { usePathname} from "next/navigation";
import IranFloatingOffer from "../iranOfferIcon/page";


export default function DestinationLayout( {children,
}: Readonly<{
  children: React.ReactNode;
}>
){
    const pathname = usePathname(); 
    return(
        <>
        <IranFloatingOffer/>
       
        {children}

       
        </>
    )
    
}