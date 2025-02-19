

export default function Hero(){
    return(
      
        <div className="relative">
        
          <video
  autoPlay
  loop
  muted
  playsInline
  className="inset-0 w-full h-[80vh] sm:h-[90vh] md:h-screen object-cover  "
>
  <source src="/image/final.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>


        </div>
    )
}