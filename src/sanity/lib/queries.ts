import { defineQuery } from "next-sanity";

export const detailCountry = defineQuery(`*[_type == "stickerVisa"  && _id == $id][0]{
   _id,
  countryName,
  requirements,
requirement1,
requirement2,
requirement3,
requirement4,
requirement5,
requirement6,
requirement7,
requirement8,
requirement9,
requirement10,
requirement11,
requirement12,
requirement13,
requirement14,
requirement15,
supportiveDoc,
requirement16,
requirement17,
requirement18,
requirement19,
requirement20,
requirement21,
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
 requirement2,
 requirement3,
 requirement4,
 requirement5,
 requirement6,
 requirement7,
 requirement8,

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
  

   export const fileAndConsultancy = defineQuery(`*[_type == "fileConsultancy"]{
    _id,
    countryName,
    prize,
    requirements,
    requirement1,
    "imageUrl": image.asset->url,
    "imageUrl2": image2.asset->url,
    "imageUrl3": image3.asset->url,
    shortDescription
  }`)

  export const fileAndConsultancyDetail = defineQuery(`*[_type == "fileConsultancy"  && _id == $id][0]{
    _id,
   countryName,
   requirements,
 requirement1,
 requirement2,
 requirement3,
 requirement4,
 requirement5,
 requirement6,
 requirement7,
 requirement8,
 requirement9,
 requirement10,
 requirement11,
 requirement12,
 requirement13,
 requirement14,
 requirement15,
 supportiveDoc,
 requirement16,
 requirement17,
 requirement18,
 requirement19,
 requirement20,
 requirement21,
  requirement22,
   requirement23,
    requirement24,
   "imageUrl": image.asset->url,
    "imageUrl2": image2.asset->url,
     "imageUrl3": image3.asset->url,
   prize,
   shortDescription
 }`)



 export const iranZiyarat = defineQuery(`*[_type == "iranIraq"]{
  _id,
  countryName,
  prize,
  shortDescription,
  tourIncludeHeading,
  tourInclude1,
  tourInclude2,
  tourInclude3,
  tourInclude4,
 
  "imageUrl": image.asset->url,
   "imageUrl2": image2.asset->url
  }`)