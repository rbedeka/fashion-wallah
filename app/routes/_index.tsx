import {defer, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {Await, useLoaderData, Link, type MetaFunction} from '@remix-run/react';
import {Suspense} from 'react';
import {Image, Money} from '@shopify/hydrogen';
import type {
  FeaturedCollectionFragment,
  RecommendedProductsQuery,
} from 'storefrontapi.generated';
import FadeCarousel, {
  links as FadeCarouselCss,
} from '~/components/fadeCarousel/FadeCarousel';
import RatingFeed, {ReviewsNRating} from '~/components/RatingsFeed';

export const TEST_RATING_DATA = [
  {
    id: 1,
    rating: 4.7,
    feedBack:
      'Absolutely stunning craftsmanship! The jewelry I received exceeded my expectations.',
    sender: 'Priya Patel',
  },
  {
    id: 2,
    rating: 4.9,
    feedBack:
      'Exquisite pieces! Each item I purchased was beautifully designed and of exceptional quality.',
    sender: 'Rajesh Kumar',
  },
  {
    id: 3,
    rating: 4.5,
    feedBack:
      'Impressed with the elegance and beauty of the jewelry. Will definitely be a returning customer.',
    sender: 'Aarav Sharma',
  },
];

export function links() {
  return [...FadeCarouselCss()];
}

export const meta: MetaFunction = () => {
  return [{title: 'Hydrogen | Home'}];
};

export async function loader({context}: LoaderFunctionArgs) {
  const {storefront} = context;
  const {collections} = await storefront.query(FEATURED_COLLECTION_QUERY);
  const featuredCollection = collections.nodes[0];
  const recommendedProducts = storefront.query(RECOMMENDED_PRODUCTS_QUERY);
  const bannerImages = collections.nodes;

  return defer({featuredCollection, recommendedProducts, bannerImages});
}

export default function Homepage() {
  const data = useLoaderData<typeof loader>();
  return (
    <div className="home">
      <FadeCarousel>
        {data.bannerImages.map((item, index) => (
          <div key={item.id}>
            <div
              className="flex justify-center items-center m-0"
              style={{
                background: 'linear-gradient(transparent,#d3d3d3,transparent)',
              }}
            >
              {item.image && (
                <img
                  src={item.image.url}
                  key={item.image.id}
                  alt="BannerImage"
                  style={{width: '50%'}}
                />
              )}
            </div>
          </div>
        ))}
      </FadeCarousel>
      <FeaturedCollection collection={data.featuredCollection} />
      <RecommendedProducts products={data.recommendedProducts} />
      <ReviewsNRating
        count={[100, 23123]}
        label={['reviews', 'happy customers']}
        reviews={[]}
      />
      <FadeCarousel>
        {TEST_RATING_DATA.map((rating, index) => (
          <div key={rating.id}>
            <RatingFeed
              RatingObject={rating}
              rateSize={40}
              fontStyle={{
                fontSize: '1.5em',
                color: '#1E404C',
              }}
            />
          </div>
        ))}
      </FadeCarousel>
    </div>
  );
}

function FeaturedCollection({
  collection,
}: {
  collection: FeaturedCollectionFragment;
}) {
  if (!collection) return null;
  const image = collection?.image;
  return (
    <Link
      className="featured-collection"
      to={`/collections/${collection.handle}`}
    >
      {image && (
        <div className="featured-collection-image">
          <Image data={image} sizes="100vw" />
        </div>
      )}
      <h1>{collection.title}</h1>
    </Link>
  );
}

function RecommendedProducts({
  products,
}: {
  products: Promise<RecommendedProductsQuery>;
}) {
  return (
    <div className="recommended-products">
      <h2>Recommended Products</h2>
      <Suspense fallback={<div>Loading...</div>}>
        <Await resolve={products}>
          {({products}) => (
            <div className="recommended-products-grid">
              {products.nodes.map((product) => (
                <Link
                  key={product.id}
                  className="recommended-product"
                  to={`/products/${product.handle}`}
                >
                  <Image
                    data={product.images.nodes[0]}
                    aspectRatio="1/1"
                    sizes="(min-width: 45em) 20vw, 50vw"
                  />
                  <h4>{product.title}</h4>
                  <small>
                    <Money data={product.priceRange.minVariantPrice} />
                  </small>
                </Link>
              ))}
            </div>
          )}
        </Await>
      </Suspense>
      <br />
    </div>
  );
}

const FEATURED_COLLECTION_QUERY = `#graphql
  fragment FeaturedCollection on Collection {
    id
    title
    image {
      id
      url
      altText
      width
      height
    }
    handle
  }
  query FeaturedCollection($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    collections(first: 1, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...FeaturedCollection
      }
    }
  }
` as const;

const RECOMMENDED_PRODUCTS_QUERY = `#graphql
  fragment RecommendedProduct on Product {
    id
    title
    handle
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    images(first: 1) {
      nodes {
        id
        url
        altText
        width
        height
      }
    }
  }
  query RecommendedProducts ($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    products(first: 4, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...RecommendedProduct
      }
    }
  }
` as const;
