import React from "react";

let data = [
  {
    id: "1",
    heading: "Bags + Clutches",
    image: "https://images.unsplash.com/photo-1524498250077-390f9e378fc0?auto=format&fit=crop&w=900&q=60",
    description: "Whether you're looking for durable flexible spacious backpacks,clutches with offers high-quality options to meet all your needs. Shop our collection to find:",
  },
  {
    id: "2",
    heading: "Clothing",
    image: "/clothing.avif",
    description: "handcrafted,handpicked, in stores & online",
    reverse: true,
  },
  {
    id: "3",
    heading: "Jewellery",
    image: "/jewellery.avif",
    description: "Gen Z & Millennial approved Minimal, Stunning & Trend-setting Global Fashion",
  },
];

function Card() {
  return (
   
      <div className="container mx-auto">
        <h2 className="text-center uppercase font-display text-lg lg:text-xl text-black py-6 md:py-24 px-6">OUR COLLECTIONS</h2>
        {data.map((e) => {
          return (
            <>
              <section key={e.id}>
                <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-12   my-4 py-4">
                  <div className="lg:col-span-5 py-8 md:px-12 md:py-32 flex items-center justify-center">
                    <div className="max-w-sm">
                      <h3 className="text-4xl mb-6 font-display text-black leading-tight" style={{ fontFamily: "PlayFair,serif" }}>
                        {e.heading}
                      </h3>
                      <p>{e.description}</p>
                      <a href="/shopnow" className="flex items-center mt-8 uppercase text-sm text-black font-semibold">
                        Shop now
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 5l7 7-7 7"></path>
                        </svg>
                      </a>
                    </div>
                  </div>

                  <div className={`${e.reverse ? "lg:-order-1" : "lg:order-last"} lg:col-span-7 relative h-48 md:h-64 lg:h-auto`}>
                    <a href="">
                      <img src={e.image} alt="bags-clutches" className="absolute inset-0 w-full h-full object-cover" />
                    </a>
                  </div>
                </div>
              </section>
            </>
          );
        })}
      </div>
   
  );
}

export default Card;