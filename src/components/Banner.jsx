import React from 'react'

function Banner() {
  return (
    <>
    <div className="container mx-auto py-20 mt-12 md:mt-24 border-t border-gray-200">
        <div className="bg-black relative">
            <div className="relative z-10 text-white text-center px-6 md:px-12 py-24 md:py-48">
                <h3 className="font-display text-2xl uppercase">End of Season Sale</h3>
                <p className="mt-6">A ultimate fashion destination for styles that are handpicked, on trend and at prices that are the best you’ll find anywhere</p>
                <a href="/shopnow" className="inline-block bg-black uppercase text-sm py-4 px-6 mt-8 hover:opacity-75">Browse</a>
            </div>
            <img src="https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=2550&amp;q=80" className="absolute inset-0 w-full h-full object-cover opacity-75"/>
        </div>
    </div>
    <div className="container mx-auto border-t border-gray-200 px-6">
        <div className="text-center max-w-md mx-auto my-12 md:my-24">
            <p className="text-lg">"Our nationwide network of retail outlets delivers a world-class shopping environment and unmatched customer experience powered by our state-of-the-art technology and seamless supply-chain infrastructure"</p>
            <div className="mt-4 font-bold">outlet</div>
        </div>
    </div>
    </>
  )
}

export default Banner