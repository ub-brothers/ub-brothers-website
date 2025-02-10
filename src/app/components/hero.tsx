

export default function Hero(){
    return(
      
        <div className="relative">
        
          <video
  autoPlay
  loop
  muted
  playsInline
  className="inset-0 w-full  object-cover my-2  sm:my-2 "
>
  <source src="/image/final.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>
{/* <div className="absolute top-1/2 mt-[150px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10  text-center shadow-md hover:shadow-[0_4px_14px_rgba(0,0,0,0.2)] transition duration-300">
<button className="my-1 font-bold font-serif hover:bg-orange-600 shadow-lg bg-blue-500 rounded-lg h-[40px] w-[200px] text-white text-lg ">Explore More!</button>
</div> */}

        </div>
    )
}