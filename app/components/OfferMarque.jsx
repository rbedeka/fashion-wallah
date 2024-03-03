import React, { useRef, useEffect, useState } from 'react';

export default function OfferMarque({ offers }) {

  return (
    <div className='p-1 product-page-style w-full flex flex-row justify-between items-center'>
      <marquee>
        <div className='flex flex-row justify-between items-center'>
          {
            offers.map((offer) => (
              <div key={offer.id} className='text-sm mx-5'>
                <li>{offer.text}</li>
              </div>
            ))
          }
                  
        </div>
      </marquee>
    </div>
  );
}
