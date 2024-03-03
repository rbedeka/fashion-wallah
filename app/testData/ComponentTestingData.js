import BANNER_1 from './TEST_IMAGES/BANNER_1.webp'
import BANNER_2 from './TEST_IMAGES/BANNER_2.webp'
import BANNER_3 from './TEST_IMAGES/BANNER_3.webp'

export const banner_data = {
  image: {
    id: 'gid://shopify/CollectionImage/1609449013270',
    url: 'https://cdn.shopify.com/s/files/1/0688/1755/1382/collections/cd_three_pairs_of_neatly_arranged_men_and_womens_running_shoes._f4121e54-2c8a-4ad2-b366-355c0cc4348d_1.png?v=1675461870',
    altText: null,
    width: '100vw',
  },
  BannerTextData: {
    Title: 'Some Banner Title',
    Description: 'description is this is the watch for my wrist',
    BannerFontColor: 'white',
  },
};

export const TEST_RATING_DATA = [
  {
    id: 1,
    rating: 5.0,
    feedBack: "The mangalsutra I received is absolutely beautiful! It's delicate and elegant, and the craftsmanship is outstanding. It's the perfect addition to my everyday look.",
    sender: "Aisha Kapoor",
  },
  {
    id: 2,
    rating: 4.8,
    feedBack: "I was so impressed with the selection of bracelets and bangles! I found a stunning set that perfectly complements my mangalsutra. They're comfortable to wear and elevate any outfit.",
    sender: "Rahul Singh",
  },
  {
    id: 3,
    rating: 4.7,
    feedBack: "This website has become my go-to for all my jewelry needs. The necklaces are unique and eye-catching, and the quality is exceptional. I love the wide variety of mangalsutras, bracelets, and bangles, allowing me to find the perfect pieces for any occasion.",
    sender: "Priya Desai",
  },
  {
    id: 4,
    rating: 4.5,
    feedBack: "I'm so happy I discovered this website! The selection of mangalsutras is truly breathtaking. They come in various designs, allowing me to choose a piece that reflects my personal style and cultural heritage. The  bangles and bracelets are also beautifully crafted and add a touch of elegance to my everyday attire.",
    sender: "Vikram Patel",
  },
  {
    id: 5,
    rating: 5.0,
    feedBack: "I can't recommend this website enough! The shopping experience is smooth, the customer service is fantastic, and the prices are reasonable for the quality and craftsmanship of the jewelry. I've received so many compliments on my mangalsutra, bracelets, and bangles, and I'm truly satisfied with my purchases.",
    sender: "Riya Mehta",
  },
];


export const HOME_BANNER_DATA = [
  {
    image: {
      id: 'gid://shopify/CollectionImage/1609449013271',
      url: BANNER_1,
      altText: null,
      width: '50vw',
    },
    color:'',
    class:'dark_organge_background'
  },
  {
    image: {
      id: 'gid://shopify/CollectionImage/1609449013272',
      url: BANNER_2,
      altText: null,
      width: '50vw',
    },
    color:'',
    class:'pink_purple_background'
  },
  {
    image: {
      id: 'gid://shopify/CollectionImage/1609449013273',
      url: BANNER_3,
      altText: null,
      width: '50vw',
    },
    color:'',
    class:'orange_background'
  }
]

export const COLLECTION_GRADIENT = {
  "Natural Stone Bracelet": {
    class:'',
    color:'black',
  },
  "Trending": {
    class:'trending_collection',
    color:'white',
  },
};


export const OFFER_DATA = [
  {
    id: "offer-1",
    text: "Free shipping on orders over $50!",
  },
  {
    id: "offer-2",
    text: "20% off sitewide for new customers!",
  },
  {
    id: "offer-3",
    text: "Flash sale: 50% off select items!",
  },
  {
    id: "offer-4",
    text: "Up to 70% off clearance items!",
  },
];


export const TEST_COLLECTIONS = [
  {
    id: "gid://shopify/Collection/457463890238",
    title: "Home page",
    handle: "frontpage",
    image:{
      url:"https://cdn.shopify.com/s/files/1/0688/1755/1382/collections/cd_three_pairs_of_neatly_arranged_men_and_womens_running_shoes._f4121e54-2c8a-4ad2-b366-355c0cc4348d_1.png?v=1675461870",  // Placeholder image
      alt: "Home page collection image",
      width: 200,
      height: 200,
      title:'some 1',
    }
  },
  {
    id: "gid://shopify/Collection/458998350142",
    title: "Oxidised Earrings",
    handle: "oxidised-jhumkas",
    image: {
      url:"https://cdn.shopify.com/s/files/1/0688/1755/1382/collections/cd_three_pairs_of_neatly_arranged_men_and_womens_running_shoes._f4121e54-2c8a-4ad2-b366-355c0cc4348d_1.png?v=1675461870", // Placeholder image
      alt: "Oxidised Earrings collection image",
      width: 200,
      height: 200,
      title:'some 2',
    }
  },
  {
    id: "gid://shopify/Collection/458998415678",
    title: "A D Stone Collection",
    handle: "a-d-stone-collection",
    image:{
      url:"https://cdn.shopify.com/s/files/1/0688/1755/1382/collections/cd_three_pairs_of_neatly_arranged_men_and_womens_running_shoes._f4121e54-2c8a-4ad2-b366-355c0cc4348d_1.png?v=1675461870",  // Placeholder image
      alt: "A D Stone Collection collection image",
      width: 200,
      height: 200,
      title:'some 3',
    }
  },
  {
    id: "gid://shopify/Collection/459558748478",
    title: "Mangalsutra",
    handle: "mangalsutra",
    image:{
      url:"https://cdn.shopify.com/s/files/1/0688/1755/1382/collections/cd_three_pairs_of_neatly_arranged_men_and_womens_running_shoes._f4121e54-2c8a-4ad2-b366-355c0cc4348d_1.png?v=1675461870", 
      altText: "Mangalsutra collection image",
      width: '25vw',
    } 
  },
];