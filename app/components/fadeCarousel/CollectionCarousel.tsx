import {Image} from '@shopify/hydrogen';
import React from 'react';

type CollectionBannerProps = {
  image: {
    id: string;
    url: string;
    altText: any;
  };
  BannerTextData: {
    Title: string;
    Description: string;
    BannerFontColor: string;
  };
};

export default function CollectionBanner({
  bannerData,
}: {
  bannerData: CollectionBannerProps;
}) {
  return (
    <div className="relative">
      <Image
        data={bannerData.image}
        sizes="100vw"
        className="object-cover"
        style={{height: '60vh'}}
      />

      <div
        className="flex flex-col justify-center items-center"
        style={bannerDataStyle}
      >
        <div
          className="text-3xl text-bold"
          style={{color: bannerData.BannerTextData.BannerFontColor}}
        >
          {bannerData.BannerTextData.Title}
        </div>
        <div
          className="text-lg"
          style={{color: bannerData.BannerTextData.BannerFontColor}}
        >
          {bannerData.BannerTextData.Description}
        </div>
      </div>
    </div>
  );
}

const bannerDataStyle: React.CSSProperties = {
  width: '100%',
  height: '60vh',
  position: 'absolute',
  top: '0',
  left: '0',
  background: 'rgba(0,0,0,0.3)',
};
