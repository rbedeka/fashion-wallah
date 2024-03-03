import {NavLink} from '@remix-run/react';
import {useRootLoaderData} from '~/root';

// ICONS
import VisaCardIcon from '../icons/VisaCardIcon';
import MasterCardIcon from '../icons/MasterCardIcon';
import GpayIcon from '../icons/GpayIcon';
import ShopIcon from '../icons/ShopIcon';
import logo from '../styles/images/logo.png'
// import HorizontalCarousel from './hozizontalCarousel/HorizontalCarousel';

/**
 * @param {FooterQuery & {shop: HeaderQuery['shop']}}
 */

export function Footer({menu, shop}) {
  return (
    <footer
      className="footer"
      style={{
        background:
          'linear-gradient(#414345,#232526 100%)',
      }}
    >
      {/* BRAND NAME */}
      <div className="text-center mt-3 flex justify-center items-center">
        <img src={logo} className='brand_logo'/>
      </div>

      {/* FEATURES AND OFFER SECTION */}
      {/* <FooterFeatures feature_and_offer={STORE_OFFERS_AND_FEATURES} /> */}

      <div className="flex responsive_row_col">
        <ContactSection />
        {/* SECTION 3 SHORT DESCRIPTION */}
        <div className="text-gray-200 row_col_mx row_col_mx text-md  my-3 mx-16">
          Discover a wide range of fashion accessories for women & men like
          natural stone bracelets, pearl necklaces, stainless steel rings and
          scrunchies, with a range of aesthetics to mirror the versatility of
          your modern wardrobe. Offering gift wrap and express delivery across
          India, to make Mesmerize India your go to fashion accessory brand for
          shopping affordable jewellery, whether it is for yourself or your
          loved ones. Be bold. Stay fresh.
        </div>
      </div>
      
      {/* SECTION LINKS */}
        {menu && shop?.primaryDomain?.url && (
        <FooterMenu menu={menu} primaryDomainUrl={shop.primaryDomain.url} />
      )}
      <div className="w-full cards my-5 px-10">
          <VisaCardIcon />
          <MasterCardIcon />
          <GpayIcon />
          <ShopIcon />
        
      </div>
      <div className="text-gray-300 text-center mob-mar">
          Copyright ©2023 All Rights Reserved FashionWallah.
      </div>
    </footer>
  );
}

/**
 * @param {{
 *   menu: FooterQuery['menu'];
 *   primaryDomainUrl: HeaderQuery['shop']['primaryDomain']['url'];
 * }}
 */

function FooterMenu({menu, primaryDomainUrl}) {
  const root_data = useRootLoaderData();

  const {publicStoreDomain} = root_data;

  return (
    <nav className="w-full flex justify-center items-center backdrop-blur-md bg-white/30" role="navigation">
      <div className="footer_links text-left my-3 grid">
        {(menu || FALLBACK_FOOTER_MENU).items.map((item, index) => {
          if (!item.url) return null;
          
          const url =
            item.url.includes('myshopify.com') ||
            item.url.includes(publicStoreDomain) ||
            item.url.includes(primaryDomainUrl)
              ? new URL(item.url).pathname
              : item.url;
          const isExternal = !url.startsWith('/');
          return (
            <div className="text-md footer_link text-center" key={item.id}>
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

const FooterFeatures = ({feature_and_offer}) => {
  return (
    <div className="m-10">
      {/* <HorizontalCarousel dots={true} arrows={false} slides_to_show={[1,1,1]}>
      {feature_and_offer.map((item, index) =ss> (
        <div className="flex flex-col justify-center items-center mx-5 text-4xl w-full bg-blue-500">
          <div className='text-center'>{item.emoji}</div>
          <div className="text-center text-white text-2xl">{item.feature}</div>
        </div>
      ))}
    </HorizontalCarousel> */}
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
    emoji: '🎉',
    feature: 'Exciting discounts on all products',
  },
  {
    emoji: '⚡',
    feature: 'Fast and reliable shipping services',
  },
  {
    emoji: '🌟',
    feature: 'Exclusive deals for loyal customers',
  },
  {
    emoji: '🎁',
    feature: 'Special gifts with every purchase',
  },
];

// CONTACT ELEMENT

const ContactSection = () => {
  return (
    <div className="flex flex-col justify-between items-left row_col_mx  my-3 mx-16">
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

/**
 * @param {{
 *   isActive: boolean;
 *   isPending: boolean;
 * }}
 */
function activeLinkStyle({isActive, isPending}) {
  return {
    fontWeight: isActive ? 'bold' : undefined,
    color: isPending ? 'grey' : 'white',
  };
}

/** @typedef {import('storefrontapi.generated').FooterQuery} FooterQuery */
/** @typedef {import('storefrontapi.generated').HeaderQuery} HeaderQuery */
