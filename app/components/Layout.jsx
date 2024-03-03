import {Await, NavLink,useLocation} from '@remix-run/react';
import {Suspense, useEffect, useState} from 'react';
import {Aside} from '~/components/Aside';
import {Footer} from '~/components/Footer';
import {DesktopHeader, HeaderMenu} from '~/components/Header/DesktopHeader';
import {MobileHeader} from '~/components/Header/MobileHeader';
import HeadModel from './HeadModel';
import {CartMain} from '~/components/Cart';
import BottomNav from '~/components/BottomNav/BottomNav';
import {useRootLoaderData} from '~/root';
import {
  PredictiveSearchForm,
  PredictiveSearchResults,
} from '~/components/Search';

// icons
import {IoSearchOutline} from 'react-icons/io5';

// CSS
import {FaWhatsapp, FaLinkedinIn, FaPinterestP} from 'react-icons/fa';
import {FaTwitter, FaInstagram, FaAngleRight} from 'react-icons/fa6';
import OfferMarque from './OfferMarque';

// TEST DATA
import {OFFER_DATA} from '../testData/ComponentTestingData';

/**
 * @param {LayoutProps}
 */
export function Layout({cart, children = null, footer, header, isLoggedIn}) {
  return (
    <>
      
      <FloatingCartButton />
      <BottomNavMenu header={header} cart={cart} viewport="mobile" />

      <OfferMarque offers={OFFER_DATA}/>
      {DesktopHeader && (
        <DesktopHeader header={header} cart={cart} isLoggedIn={isLoggedIn} />
      )}
      {MobileHeader && (
        <MobileHeader header={header} cart={cart} isLoggedIn={isLoggedIn} />
      )}

      <CartPopup cart={cart}/>
      <SearchPop />
      <main className="m-0">{children}</main>
      <Suspense>
        <Await resolve={footer}>
          {(footer) => <Footer menu={footer.menu} shop={header.shop} />}
        </Await>
      </Suspense>
    </>
  );
}

function FloatingCartButton({cart}){
  const location = useLocation();

  useEffect(() => {
    const fabButton = document.getElementById('FAB_BTN');

    if (location.pathname.includes('products')) {
      fabButton.style.display = 'none';
    } else {
      fabButton.style.display = '';
    }
  }, [location.pathname]);
  return (
    <div id="FAB_BTN" className='fixed bottom-0 bg-[#5d8bd7] rounded-lg right-0 m-5 mb-5 flex items-center justify-center' style={{zIndex:3}}>
      <a href="#cart-pop">
        <button className='text-white py-3 px-5 flex items-center justify-center'>View Cart</button>
      </a>
    </div>
    );
}


function BottomNavMenu({header, cart, viewport}) {
  const {menu, shop} = header;
  const [isOpen, setOpen] = useState(true);

  const primaryDomainUrl = shop.primaryDomain.url;
  // Set State unused

  const {publicStoreDomain} = useRootLoaderData();

  const closeAside = function (event) {
    if (viewport === 'mobile') {
      event.preventDefault();
      window.location.href = event.currentTarget.href;
    }
  };

  return (
    menu &&
    primaryDomainUrl && (
      <BottomNav id={'mobileMenu'} isOpen={isOpen}>
        <div
          className="rounded-md backdrop-blur-md bg-white/30 flex flex-col justify-start items-center p-5"
          style={{overflowY: 'scroll', maxHeight: '70vh'}}
        >
          <div className="flex flex-row items-center justify-between w-full my-5"
          >
            <NavLink
              end
              onClick={closeAside}
              prefetch="intent"
              style={activeLinkStyle}
              to="./"
            >
              Home
            </NavLink>
            <NavLink
              end
              onClick={closeAside}
              prefetch="intent"
              style={activeLinkStyle}
              to="./"
            >
              <FaAngleRight className="rounded-full bg-[#d3d3d3] text-black hover:bg-slate-950 hover:text-white" />
            </NavLink>
          </div>
          {(menu || FALLBACK_HEADER_MENU).items.map((item) => {
            if (!item.url) return null;

            // if the url is internal, we strip the domain
            const url =
              item.url.includes('myshopify.com') ||
              item.url.includes(publicStoreDomain) ||
              item.url.includes(primaryDomainUrl)
                ? new URL(item.url).pathname
                : item.url;
            return (
              <div
                className="flex flex-row items-center justify-between w-full my-5"
                key={item.id}
              >
                <NavLink
                  className="header-menu-item font-bold footer_font"
                  end
                  key={item.id}
                  prefetch="intent"
                  style={activeLinkStyle}
                  onClick={closeAside}
                  to={url}
                >
                  {item.title}
                </NavLink>
                <NavLink
                  end
                  onClick={closeAside}
                  prefetch="intent"
                  style={activeLinkStyle}
                  to={url}
                >
                  <FaAngleRight className="rounded-full bg-[#d3d3d3] text-black" />
                </NavLink>
              </div>
            );
          })}
          <div className="flex flex-row justify-between items-center w-full mb-3 mt-5">
            <FaInstagram className="" />
            <FaWhatsapp className="" />
            <FaLinkedinIn className="" />
            <FaPinterestP className="" />
            <FaTwitter className="" />
          </div>
          <div className="border-b-2 w-full"></div>
          <div className="mt-3 w-full">Account</div>
        </div>
      </BottomNav>
    )
  );
}

function CartPopup({cart}){
return <HeadModel
        title={''}
        id={'cart-pop'}
      >
        {/* HEAD MODEL IS DIALOG AND IT'S CHILD ELEMENTS ARE PLACED BELOW  */}
        <Suspense fallback={<p>Loading cart ...</p>}>
          <Await resolve={cart}>
            {(cart) => {
              return <CartMain cart={cart} layout="aside" />;
            }}
          </Await>
        </Suspense>
      </HeadModel>
}

function SearchPop({}){
  const [focused, setFocused] = useState(false);

  return <HeadModel
        title={'Search'}
        id={'search-pop'}
      >
        {/* HEAD MODEL IS DIALOG AND IT'S CHILD ELEMENTS ARE PLACED BELOW  */}
        <div className="predictive-search p-5">
          <PredictiveSearchForm>
            {({fetchResults, inputRef}) => (
              <div className="flex flex-row items-center">
                <input
                  name="q"
                  onChange={fetchResults}
                  placeholder="Search"
                  ref={inputRef}
                  onFocus={() => {
                    setFocused(true);
                    fetchResults();
                  }}
                  autoComplete='off'
                  onBlur={() => setFocused(false)}
                  type="search"
                  className={
                    (focused
                      ? 'border border-none outline-none'
                      : 'border border-none') + ' w-80'
                  }
                />
                <button type="submit" className='mx-5'>
                  <IoSearchOutline size={30} />
                </button>
              </div>
            )}
          </PredictiveSearchForm>
          <PredictiveSearchResults />
        </div>
      </HeadModel>
}

// FUNCTION COPIED FROM HEADER
function activeLinkStyle({isActive, isPending}) {
  return {
    fontWeight: isActive ? 'bold' : 'normal',
    color: isPending ? 'grey' : 'black',
  };
}

/**
 * @param {{cart: LayoutProps['cart']}}
 */
function CartAside({cart}) {
  return (
    <Aside id="cart-aside" heading="CART">
      <Suspense fallback={<p>Loading cart ...</p>}>
        <Await resolve={cart}>
          {(cart) => {
            return <CartMain cart={cart} layout="aside" />;
          }}
        </Await>
      </Suspense>
    </Aside>
  );
}

function SearchAside() {
  return (
    <Aside id="search-aside" heading="SEARCH">
      <div className="predictive-search">
        <br />
        <PredictiveSearchForm>
          {({fetchResults, inputRef}) => (
            <div>
              <input
                name="q"
                onChange={fetchResults}
                onFocus={fetchResults}
                placeholder="Search"
                ref={inputRef}
                type="search"
              />
              &nbsp;
              <button type="submit">Search</button>
            </div>
          )}
        </PredictiveSearchForm>
        <PredictiveSearchResults />
      </div>
    </Aside>
  );
}

/**
 * @param {{
 *   menu: HeaderQuery['menu'];
 *   shop: HeaderQuery['shop'];
 * }}
 */
function MobileMenuAside({menu, shop}) {
  return (
    menu &&
    shop?.primaryDomain?.url && (
      <Aside id="mobile-menu-aside" heading="MENU">
        <HeaderMenu
          menu={menu}
          viewport="mobile"
          primaryDomainUrl={shop.primaryDomain.url}
        />
      </Aside>
    )
  );
}

export const FALLBACK_HEADER_MENU = {
  id: 'gid://shopify/Menu/199655587896',
  items: [
    {
      id: 'gid://shopify/MenuItem/461609500728',
      resourceId: null,
      tags: [],
      title: 'Collections',
      type: 'HTTP',
      url: '/collections',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609533496',
      resourceId: null,
      tags: [],
      title: 'Blog',
      type: 'HTTP',
      url: '/blogs/journal',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609566264',
      resourceId: null,
      tags: [],
      title: 'Policies',
      type: 'HTTP',
      url: '/policies',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609599032',
      resourceId: 'gid://shopify/Page/92591030328',
      tags: [],
      title: 'About',
      type: 'PAGE',
      url: '/pages/about',
      items: [],
    },
  ],
};

/**
 * @typedef {{
 *   cart: Promise<CartApiQueryFragment | null>;
 *   children?: React.ReactNode;
 *   footer: Promise<FooterQuery>;
 *   header: HeaderQuery;
 *   isLoggedIn: Promise<boolean>;
 * }} LayoutProps
 */

/** @typedef {import('storefrontapi.generated').CartApiQueryFragment} CartApiQueryFragment */
/** @typedef {import('storefrontapi.generated').FooterQuery} FooterQuery */
/** @typedef {import('storefrontapi.generated').HeaderQuery} HeaderQuery */
