'use client';
import { useEffect, useState } from "react"
import { IranType} from "../types/destinations"
import {client} from "@/sanity/lib/client"
import { hajjPack } from '@/sanity/lib/queries';
import { jwtDecode } from 'jwt-decode';
import Link from 'next/link';

export default function HajjCard(){
 const [ tours, setTours ] = useState<IranType[]>([])
    const [isApprovedUser, setIsApprovedUser] = useState(false);

     useEffect(()=>{
    
    
          const token = localStorage.getItem("token");
    
          if (token) {
            try {
              const decoded: any = jwtDecode(token);
           
      
              if (decoded.approved === true || decoded.approved === "true") {
                setIsApprovedUser(true);
              } else {
                setIsApprovedUser(false);
              }
            } catch (error) {
              console.error("Invalid token", error);
            }
          }
      
    
            async function fetchedTour(){
                const fetchTour: IranType[] = await client.fetch(hajjPack)
                setTours(fetchTour)
            }
            fetchedTour();
        }, [])

        return(
            <div>
                <div className="flex grid lg:grid-cols-3 sm:grid-cols-2 mb-8">
                            {tours.map ((tour)=>(
                             
                <div key={tour._id} className="w-[290px]  rounded-xl border-2  border-gray-300  bg-gray-100 xl:mx-10 mx-2 sm:mx-4 hover:shadow-md hover:shadow-black  text-left my-3">
                <Link href={{
                  pathname: "/hajjForm",
                  query: {
                    countryName: tour.countryName,
                    shortDescription: tour.shortDescription,
                    prize1: tour.prize1,
                    prize2: tour.prize2,
                    prize3: tour.prize3,
                    makkahHotel: tour.makkahHotel,
                    madinaHotel: tour.madinaHotel,
                    sharingPriceForUsers: tour.sharingPriceForUsers,
                    triplePriceForUsers:tour.triplePriceForUsers,
                    doublePriceForUsers:tour.doublePriceForUsers,
                    ticketHead:tour.ticketHead,
                    azizaStay2:tour.azizaStay2,
                    azizaStayDetail2:tour.azizaStayDetail2,
                    airlineName:tour.airlineName,
                    airlineImage:tour.airlineImage,
                    dep:tour.dep,
                    flightNum1:tour.flightNum1,
                    dateOfFlight1:tour.dateOfFlight1,
                    route1:tour.route1,
                    time1:tour.time1,
                    return:tour.return,
                    flightNum2:tour.flightNum2,
                    dateOfFlight2:tour.dateOfFlight2,
                    route2:tour.route2,
                    time2:tour.time2,
                    makkahHotelH:tour.makkahHotelH,
                    madinaHotelH:tour.madinaHotelH,
                    foodHead:tour.foodHead,
                    food:tour.food,
                    transportHead: tour.transportHead,
    transport: tour.transport,
    holyZiaratHead: tour.holyZiaratHead,
    holyziarat: tour.holyziarat,
    documentsH: tour.documentsH,
    doc1: tour.doc1,
    doc2: tour.doc2,
    doc3: tour.doc3,
    doc4: tour.doc4,
    doc5: tour.doc5,
    doc6: tour.doc6,
    azizaStay: tour.azizaStay,
    azizaStayDetail: tour.azizaStayDetail,
    makkahStay: tour.makkahStay,
    makkahStayDetail: tour.makkahStayDetail,
    madinaStay: tour.madinaStay,
    madinaStayDetail: tour.madinaStayDetail,
                  },
                }} >
                <div className="relative group text-center">
                <img src={tour.imageUrl2} alt={tour.countryName} className="mx-auto my-4 h-[250px] rounded-lg w-[250px] sm:w-[270px] transition duration-300 group-hover:brightness-75 " />
                 
                </div> 
                
                <h3 className=" sm:text-xl text-md text-left flex ml-4 gap-1 font-bold sm:gap-2 text-lg text-black">{tour.countryName}</h3>
                <h3 className=" sm:text-lg text-sm text-left flex ml-4 gap-1  sm:gap-2 text-lg text-gray-600">{tour.shortDescription}</h3>
                <h2 className="text-left text-gray-700 text-sm ml-4 sm:text-md mt-1">Sharing: <b>{isApprovedUser ? tour.sharingPriceForUsers : tour.prize1}</b> PKR/-</h2>
                <h2 className="text-left text-gray-700 text-sm ml-4 sm:text-md mt-1">Triple: <b>{isApprovedUser ? tour.triplePriceForUsers : tour.prize2}</b> PKR/-</h2>
                <h2 className="text-left text-gray-700 text-sm ml-4 sm:text-md mt-1">Double: <b>{isApprovedUser ? tour.doublePriceForUsers : tour.prize3}</b> PKR/-</h2>
                <div className="text-center">
                <button className="bg-orange-500 rounded-xl h-8 w-[100px] sm:w-[130px] text-white text-sm sm:text-md mb-4 mt-4 hover:bg-blue-500  hover:shadow-[0_4px_14px_rgba(0,0,0,0.2)] transition duration-300 shadow-lg font-serif text-center">Book Now</button> </div>
                </Link>
                                   
                                </div>
                            ))}
                        </div>
            </div>
        )


}