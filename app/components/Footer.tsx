import {NavLink} from '@remix-run/react';
import type {FooterQuery, HeaderQuery} from 'storefrontapi.generated';
import {useRootLoaderData} from '~/root';

// ICONS
import VisaCardIcon from '~/icons/VisaCardIcon';
import MasterCardIcon from '~/icons/MasterCardIcon';
import GpayIcon from '~/icons/GpayIcon';
import ShopIcon from '~/icons/ShopIcon';

export function Footer({
  menu,
  shop,
}: FooterQuery & {shop: HeaderQuery['shop']}) {
  return (
    <footer
      className="footer"
      style={{
        background: 'linear-gradient(to bottom, #8A8A8A, #000)',
      }}
    >
      {/* BRAND NAME */}
      <div className="text-center mt-40">
        <p className="text-4xl footer_font text-white">Fashionwallah</p>
      </div>

      {/* FEATURES AND OFFER SECTION */}
      <FooterFeatures feature_and_offer={STORE_OFFERS_AND_FEATURES} />

      <div className="flex responsive_row_col">
        {/* CONTACT SECTION */}
        <ContactSection />

        {/* SECTION 2 LINKS */}
        {menu && shop?.primaryDomain?.url && (
          <FooterMenu menu={menu} primaryDomainUrl={shop.primaryDomain.url} />
        )}

        {/* SECTION 3 SHORT DESCRIPTION */}
        <div className="text-gray-200 row_col_mx row_col_mx text-md  my-3">
          Discover a wide range of fashion accessories for women & men like
          natural stone bracelets, pearl necklaces, stainless steel rings and
          scrunchies, with a range of aesthetics to mirror the versatility of
          your modern wardrobe. Offering gift wrap and express delivery across
          India, to make Mesmerize India your go to fashion accessory brand for
          shopping affordable jewellery, whether it is for yourself or your
          loved ones. Be bold. Stay fresh.
        </div>
      </div>
      <div className="flex flex-row justify-between items-center my-20 px-10">
        <div className="w-2/12 text-gray-300">
          Copyright ©2023 All Rights Reserved FashionWallah.
        </div>

        <div className="flex flex-row justify-between w-3/12">
          <VisaCardIcon />
          <MasterCardIcon />
          <GpayIcon />
          <ShopIcon />
        </div>
      </div>
    </footer>
  );
}

function FooterMenu({
  menu,
  primaryDomainUrl,
}: {
  menu: FooterQuery['menu'];
  primaryDomainUrl: HeaderQuery['shop']['primaryDomain']['url'];
}) {
  const {publicStoreDomain} = useRootLoaderData();

  return (
    <nav className="row_col_mx" role="navigation">
      <div className="flex flex-col justify-between items-center h-full text-center my-3">
        {(menu || FALLBACK_FOOTER_MENU).items.map((item, index) => {
          if (!item.url) return null;
          // if the url is internal, we strip the domain
          const url =
            item.url.includes('myshopify.com') ||
            item.url.includes(publicStoreDomain) ||
            item.url.includes(primaryDomainUrl)
              ? new URL(item.url).pathname
              : item.url;
          const isExternal = !url.startsWith('/');
          return (
            <div className="text-md" key={item.id}>
              {isExternal ? (
                <a
                  href={url}
                  key={item.id}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span className="text-gray-200 hover:text-white">
                    {item.title}
                  </span>
                </a>
              ) : (
                <NavLink
                  end
                  key={item.id}
                  prefetch="intent"
                  style={activeLinkStyle}
                  to={url}
                >
                  <span className="text-gray-200 hover:text-white">
                    {item.title}
                  </span>
                </NavLink>
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
}

const FooterFeatures = ({
  feature_and_offer,
}: {
  feature_and_offer: {
    id: number;
    emoji: string;
    feature: string;
  }[];
}) => {
  return (
    <div className="flex flex-row justify-center items-center my-10">
      {feature_and_offer.map((item, index) => (
        <div
          key={item.id}
          className="flex flex-col justify-center items-center mx-5 text-4xl"
        >
          <div>{item.emoji}</div>
          <div className="text-center text-white text-2xl">{item.feature}</div>
        </div>
      ))}
    </div>
  );
};

const FALLBACK_FOOTER_MENU = {
  id: 'gid://shopify/Menu/199655620664',
  items: [
    {
      id: 'gid://shopify/MenuItem/461633060920',
      resourceId: 'gid://shopify/ShopPolicy/23358046264',
      tags: [],
      title: 'Privacy Policy',
      type: 'SHOP_POLICY',
      url: '/policies/privacy-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633093688',
      resourceId: 'gid://shopify/ShopPolicy/23358013496',
      tags: [],
      title: 'Refund Policy',
      type: 'SHOP_POLICY',
      url: '/policies/refund-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633126456',
      resourceId: 'gid://shopify/ShopPolicy/23358111800',
      tags: [],
      title: 'Shipping Policy',
      type: 'SHOP_POLICY',
      url: '/policies/shipping-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633159224',
      resourceId: 'gid://shopify/ShopPolicy/23358079032',
      tags: [],
      title: 'Terms of Service',
      type: 'SHOP_POLICY',
      url: '/policies/terms-of-service',
      items: [],
    },
  ],
};

const STORE_OFFERS_AND_FEATURES = [
  {
    id: 1,
    emoji: '🎉',
    feature: 'Exciting discounts on all products',
  },
  {
    id: 2,
    emoji: '⚡',
    feature: 'Fast and reliable shipping services',
  },
  {
    id: 3,
    emoji: '🌟',
    feature: 'Exclusive deals for loyal customers',
  },
  {
    id: 4,
    emoji: '🎁',
    feature: 'Special gifts with every purchase',
  },
];

// CONTACT ELEMENT

const ContactSection = () => {
  return (
    <div className="flex flex-col justify-between items-left row_col_mx  my-3">
      <div className="text-white text-4xl footer_font">Hey there 👋🏼</div>
      <div className="text-gray-200 my-3 footer_font">
        Stay in touch for good vibes & no spam.
      </div>
      <div>
        <div className="mb-4 border border-rounded rounded-md focus:border-white p-3">
          <label className="block text-gray-300 text-sm mb-2" htmlFor="Email">
            E-mail
          </label>
          <div className="flex flex-row">
            <input
              className="appearance-none
                    w-full py-2
                    text-gray-700
                    leading-tight
                    bg-transparent
                    focus:text-white
                    border-0
                    footer_font
                    contact_input"
              style={{minWidth: '10vw'}}
              id="Email"
              type="text"
            />
            <button className="rounded-full text-white bg-none mx-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

function activeLinkStyle({
  isActive,
  isPending,
}: {
  isActive: boolean;
  isPending: boolean;
}) {
  return {
    fontWeight: isActive ? 'bold' : undefined,
    color: isPending ? 'grey' : 'white',
  };
}
