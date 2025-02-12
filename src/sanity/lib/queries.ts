import { defineQuery } from "next-sanity";

export const detailCountry = defineQuery(`*[_type == "stickerVisa"  && _id == $id][0]{
   _id,
  countryName,
  requirements,
requirements1,
requirements2,
requirements3,
requirements4,
requirements5,
requirements6,
requirements7,
requirements8,
requirements9,
requirements10,
requirements11,
requirements12,
requirements13,
requirements14,
requirements15,
requirements16,
requirements17,
  "imageUrl": image.asset->url,
   "imageUrl2": image2.asset->url,
    "imageUrl3": image3.asset->url,
  prize,
  shortDescription,

  availability
}`)
export const detailCountryEVisa = defineQuery(`*[_type == "destinations"  && _id == $id][0]{
  _id,
 countryName,
 requirements,
 requirement1,

 "imageUrl": image.asset->url,
  "imageUrl2": image2.asset->url,
   "imageUrl3": image3.asset->url,
 prize,
 shortDescription,
rating,
 availability
}`)
export const allDestinations = defineQuery(`*[_type == "destinations"]{
  _id,
  countryName,
  "imageUrl": image.asset->url,
    requirements,
  requirement1,

  "imageUrl": image.asset->url,
   "imageUrl2": image2.asset->url,
    "imageUrl3": image3.asset->url,
  prize,
  shortDescription,
 rating,
  availability
}`)


export const featuredestinations = defineQuery(`*[_type == "destinations"][5..12]{
  _id,
  countryName,
  "imageUrl": image.asset->url,
  prize,
  shortDescription,
 rating,
  availability
}`)

export const stickerVisa = defineQuery(`*[_type == "stickerVisa"]{
  _id,
  countryName,
    requirements,
  "imageUrl": image.asset->url,
   "image2": image.asset->url,
    "image3": image.asset->url,
  "imageUrl": image.asset->url,
  prize,
  shortDescription,
  availability
  
  }`)

  export const tourPackage = defineQuery(`*[_type == "tour"]{
    _id,
    countryName,
    prize,
    shortDescription,
    tourIncludeHeading,
    tourInclude1,
    tourInclude2,
    tourInclude3,
    tourInclude4,
    tourInclude5,
    tourInclude6,
    tourInclude7,
    tourInclude8,
    tourInclude9,
    heading1,
    day1,
    heading2,
    day2,
    heading3,
    day3,
    heading4,
    day4,
    heading5,
    day5,
    heading6,
    day6, 
    heading7,
    day7,
    heading8,
    day8,
    heading9,
    day9,
    "imageUrl": image.asset->url,
     "imageUrl2": image2.asset->url,
      "imageUrl3": image3.asset->url,
      "imageUrl4": image4.asset->url
    
   
    
    }`)

    export const tourDetailQuery = defineQuery(`*[_type == "tour"  && _id == $id][0]{
       _id,
    countryName,
    prize,
    shortDescription,
    requirement1,
    requirement2,
    requirement3,
    requirement4,
    requirement5,
    requirement6,
    tourIncludeHeading,
    tourInclude1,
    tourInclude2,
    tourInclude3,
    tourInclude4,
    tourInclude5,
    tourInclude6,
    tourInclude7,
    tourInclude8,
    tourInclude9,
    heading1,
    day1,
    heading2,
    day2,
    heading3,
    day3,
    heading4,
    day4,
    heading5,
    day5,
    heading6,
    day6, 
    heading7,
    day7,
    heading8,
    day8,
    heading9,
    day9,
    
    "imageUrl": image.asset->url,
     "imageUrl2": image2.asset->url,
      "imageUrl3": image3.asset->url,
      "imageUrl4": image4.asset->url
   }`)
  

  export const umrah = defineQuery( `*[_type == "umrah" ]{
    _id,
    countryName,
    shortDescription,
    prize,
    requirements,
    requirement1,
   "imageUrl": image.asset->url,
   "imageUrl2": image2.asset->url,
   "imageUrl3": image3.asset->url,
 }` )


 export const umrahDetail = defineQuery(`*[_type == "umrah"  && _id == $id][0]{
  _id,
countryName,
prize,
shortDescription,
requirements,
requirement1,
"imageUrl": image.asset->url,
"imageUrl2": image2.asset->url,
 "imageUrl3": image3.asset->url,
 "imageUrl4": image4.asset->url
}`)


export const hajj = defineQuery( `*[_type == "hajj" ]{
  _id,
  countryName,
  shortDescription,
  dayDuration,
  hajjDays,
  requirements,
  requirement1,
 "imageUrl": image.asset->url,
 "imageUrl2": image2.asset->url,
 "imageUrl3": image3.asset->url,
}` )


export const hajjDetail = defineQuery(`*[_type == "hajj"  && _id == $id][0]{
  _id,
countryName,
dayDuration,
shortDescription,
requirements,
requirement1,
"imageUrl": image.asset->url,
"imageUrl2": image2.asset->url,
 "imageUrl3": image3.asset->url,
 "imageUrl4": image4.asset->url,
 hajjDaysH,
 hajjDays,
 azizaBuildingH,
 azizaBuildingDays,
 maktab,
 maktabZone,
 makkahHotelH,
 makkahHotel1,
 makkahHotelDays,
 makkahHotel2,
 makkahHotel3,
 madinaHotelH,
 madinaHotelName,
 madinaHotelDays,
 sharingH,
 sharingPrize,
 tripleBedH,
 tripleBedPrize,
 doubleBedH,
 doubleBedPrize,
 includeH,
 include1,
 include2,
 include3,
 include4,
 include5,
 include6,
 include7,
 ziaratH,
 ziaratText,
 desc1,
 desc2,
 desc3,
 desc4
}`)
