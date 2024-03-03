import {useLoaderData, Link} from '@remix-run/react';
import {json} from '@shopify/remix-oxygen';
import {Pagination, getPaginationVariables, Image} from '@shopify/hydrogen';
import {FaChevronCircleRight} from 'react-icons/fa';
import {useState} from 'react';
import { TEST_COLLECTIONS } from '~/testData/ComponentTestingData';
/**
 * @param {LoaderFunctionArgs}
 */
export async function loader({context, request}) {
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 4,
  });

  const {collections} = await context.storefront.query(COLLECTIONS_QUERY, {
    variables: paginationVariables,
  });

  return json({collections});
}

export default function Collections() {
  /** @type {LoaderReturnData} */
  const {collections} = useLoaderData();

  return (
    <div
      className="collections"
      style={{background: 'linear-gradient(to bottom,#ffd1df 40%,white 100%)'}}
    >
      <p className="text-3xl">Collection</p>
      <Pagination connection={collections}>
        {({nodes, isLoading, PreviousLink, NextLink}) => (
          <div>
            <PreviousLink>
              {isLoading ? 'Loading...' : <span>↑ Load previous</span>}
            </PreviousLink>
            <CollectionsGrid collections={nodes} />
            <NextLink>
              {isLoading ? 'Loading...' : <span>Load extra ↓</span>}
            </NextLink>
          </div>
        )}
      </Pagination>
    </div>
  );
}

/**
 * @param {{collections: CollectionFragment[]}}
 */
export function CollectionsGrid({collections}) {
  // console.log(collections);
  return (
    <div className="collection-grid">
      {collections.map((collection, index) => (
        <CollectionItem
          key={collection.id}
          collection={collection}
          index={index}
        />
      ))}
    </div>
  );
}

/**
 * @param {{
 *   collection: CollectionFragment;
 *   index: number;
 * }}
 */
export function CollectionItem({collection, index}) {
  const [visiblity, setVisiblity] = useState('hidden');
  return (
    <div className="relative m-5">
      <Link
        className="collection-item"
        key={collection.id}
        to={`/collections/${collection.handle}`}
        prefetch="intent"
      >
        {collection?.image && (
          // <img src={collection.image.url} alt={collection.title} />
          <Image
            alt={collection.image.altText || collection.title || 'some thing'}
            aspectRatio="1/1"
            data={collection.image}
            loading={index < 3 ? 'eager' : undefined}
          />
        )}
        <div
          className="absolute m-3 bottom-0 left-0 flex flex-col justify-start"
          onMouseOver={() => setVisiblity('visible')}
          onFocus={() => setVisiblity('visible')} // Add onFocus event handler
          onMouseOut={() => setVisiblity('hidden')}
          onBlur={() => setVisiblity('hidden')} // Add onBlur event handler
        >
          <FaChevronCircleRight
            style={{color: 'white', visibility: visiblity}}
          />
          <h5 className="text-white text-xl">{collection.title}</h5>
        </div>
      </Link>
    </div>
  );
}

const COLLECTIONS_QUERY = `#graphql
  fragment Collection on Collection {
    id
    title
    handle
    image {
      id
      url
      altText
      width
      height
    }
  }
  query StoreCollections(
    $country: CountryCode
    $endCursor: String
    $first: Int
    $language: LanguageCode
    $last: Int
    $startCursor: String
  ) @inContext(country: $country, language: $language) {
    collections(
      first: $first,
      last: $last,
      before: $startCursor,
      after: $endCursor
    ) {
      nodes {
        ...Collection
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`;

/** @typedef {import('@shopify/remix-oxygen').LoaderFunctionArgs} LoaderFunctionArgs */
/** @typedef {import('storefrontapi.generated').CollectionFragment} CollectionFragment */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
