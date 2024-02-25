// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import {useLoaderData, Link} from '@remix-run/react';
import {json, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {Pagination, getPaginationVariables, Image} from '@shopify/hydrogen';
import type {CollectionFragment} from 'storefrontapi.generated';
import {FaChevronCircleRight} from 'react-icons/fa';
import React, {useState} from 'react';

export async function loader({context, request}: LoaderFunctionArgs) {
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 4,
  });

  const {collections} = await context.storefront.query(COLLECTIONS_QUERY, {
    variables: paginationVariables,
  });

  return json({collections});
}

export default function Collections() {
  const {collections} = useLoaderData<typeof loader>();

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

function CollectionsGrid({collections}: {collections: CollectionFragment[]}) {
  return (
    <div className="collections-grid">
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

function CollectionItem({
  collection,
  index,
}: {
  collection: CollectionFragment;
  index: number;
}) {
  const [visiblity, setVisiblity] = useState<'hidden' | 'visible'>('hidden');

  return (
    <div className="relative">
      <Link
        className="collection-item"
        key={collection.id}
        to={`/collections/${collection.handle}`}
        prefetch="intent"
      >
        {collection?.image && (
          <Image
            alt={collection.image.altText || collection.title}
            aspectRatio="1/1"
            data={collection.image}
            loading={index < 3 ? 'eager' : undefined}
          />
        )}
        <div
          className="absolute m-3 bottom-0 left-0 flex flex-col justify-start"
          onMouseOver={() => setVisiblity('visible')}
          onMouseOut={() => setVisiblity('hidden')}
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
` as const;
