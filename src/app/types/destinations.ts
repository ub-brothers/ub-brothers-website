

export interface Destination {
    _id: string,
    countryName: string,
    prize: number,
    requirements:string,
    requirement1:string,
    requirement2:string,
    requirement3:string,
    requirement4:string,
    requirement5:string,
    requirement6:string,
    requirement7:string,
    requirement8:string,
    requirement9:string,
    requirement10:string,
    requirement11:string,
    requirement12:string,
    requirement13:string,
    requirement14:string,
    requirement15:string,
    supportiveDoc:string,
    requirement16:string,
    requirement17:string,
    requirement18:string,
    requirement19:string,
    requirement20:string,
    requirement21:string,
    imageUrl2: string,
    imageUrl3: string,
    imageUrl :string,
    shortDescription: string,
    
    rating: number,
    availability: "Available" | "Coming Soon",
}

export interface TourType {
    _id: string,
    countryName: string,
    prize: number,
    shortDescription: string,
   
    tourIncludeHeading: string,
    tourInclude1: string,
    tourInclude2: string,
    tourInclude3: string,
    tourInclude4: string,
    tourInclude5: string,
    tourInclude6: string,
    tourInclude7: string,
    tourInclude8: string,
    tourInclude9: string,
    heading1: string,
    day1:string,
    heading2: string,
    day2:string,
    heading3: string,
    day3:string,
    heading4: string,
    day4:string,
    heading5: string,
    day5:string,
    heading6: string,
    day6:string,
    heading7: string,
    day7:string,
    heading8: string,
    day8:string,
    heading9: string,
    day9:string,
    requirementsH: string,
    requirement1:string,
    requirement2:string,
    requirement3:string,
    requirement4:string,
    requirement5:string,
    requirement6:string,
    imageUrl :string,
    imageUrl2: string,
    imageUrl3: string,
    imageUrl4: string,
    
    
}

export interface FileCons {
    _id: string,
    countryName: string,
    prize: number,
    requirements:string,
    requirement1:string,
    requirement2:string,
    requirement3:string,
    requirement4:string,
    requirement5:string,
    requirement6:string,
    requirement7:string,
    requirement8:string,
    requirement9:string,
    requirement10:string,
    requirement11:string,
    requirement12:string,
    requirement13:string,
    requirement14:string,
    requirement15:string,
    supportiveDoc:string,
    requirement16:string,
    requirement17:string,
    requirement18:string,
    requirement19:string,
    requirement20:string,
    requirement21:string,
    requirement22:string,
    requirement23:string,
    requirement24:string,
    imageUrl2: string,
    imageUrl3: string,
    imageUrl :string,
    shortDescription: string,
}



export interface IranType {
    _id: string,
    countryName: string,
    prize: number,
    shortDescription: string,
   prize1: string,
   prize2: string,
   prize3:string,
    tourIncludeHeading: string,
    tourInclude1: string,
    tourInclude2: string,
    tourInclude3: string,
    tourInclude4: string,
    imageUrl :string,
    imageUrl2: string
    
}

export interface Flight {
    date: string;
    flightNumber: string;
    originDestination: string;
    time: string;
    baggage: string;
    isReturn: boolean
  }

  export interface FlightGroup {
    id: string;
    airline: string;
    seats: number;
    childSeats: number;
    airlineLogo?:string,
    flights: Flight[];  // Array of flights
    airlineImage: string;  
     meal: string;
    price: string;
    airlineName: string;
  }  
