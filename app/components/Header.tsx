import {Await, NavLink} from '@remix-run/react';
import {Suspense, useState} from 'react';
import type {CartApiQueryFragment, HeaderQuery} from 'storefrontapi.generated';
import type {LayoutProps} from './Layout';
import {useRootLoaderData} from '~/root';
import {IoSearchSharp} from 'react-icons/io5';
import {PiShoppingBag} from 'react-icons/pi';
import HeadModel from './HeadModal';
import {PredictiveSearchForm, PredictiveSearchResults} from './Search';
import {CartMain} from './Cart';

type HeaderProps = Pick<LayoutProps, 'header' | 'cart' | 'isLoggedIn'>;

type Viewport = 'desktop' | 'mobile';

export function Header({header, isLoggedIn, cart}: HeaderProps) {
  const {shop, menu} = header;
  return (
    <header className="header backdrop-blur-md bg-white/30 bg-white">
      {/* BRAND */}
      <NavLink prefetch="intent" to="/" style={activeLinkStyle} end>
        <div className="flex flex-row justify-center">
          <div className="bg-white text-transparent p-1 text-center bg-gradient-to-r from-cyan-500 via-purple-500 to-red-500 bg-clip-text shadow-text font-bold text-2xl">
            {shop.name}
          </div>
        </div>
      </NavLink>

      {/* MENU */}
      <HeaderMenu
        menu={menu}
        viewport="desktop"
        primaryDomainUrl={header.shop.primaryDomain.url}
      />

      {/* EXTRAS */}
      <HeaderCtas isLoggedIn={isLoggedIn} cart={cart} />
    </header>
  );
}

export function HeaderMenu({
  menu,
  primaryDomainUrl,
  viewport,
}: {
  menu: HeaderProps['header']['menu'];
  primaryDomainUrl: HeaderQuery['shop']['primaryDomain']['url'];
  viewport: Viewport;
}) {
  const {publicStoreDomain} = useRootLoaderData();
  const className = `header-menu-${viewport}`;

  function closeAside(event: React.MouseEvent<HTMLAnchorElement>) {
    if (viewport === 'mobile') {
      event.preventDefault();
      window.location.href = event.currentTarget.href;
    }
  }

  return (
    <nav className={className} role="navigation">
      {viewport === 'mobile' && (
        <NavLink
          end
          onClick={closeAside}
          prefetch="intent"
          style={activeLinkStyle}
          to="/"
        >
          Home
        </NavLink>
      )}
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
          <NavLink
            className="header-menu-item font-bold footer_font"
            end
            key={item.id}
            onClick={closeAside}
            prefetch="intent"
            style={activeLinkStyle}
            to={url}
          >
            {item.title}
          </NavLink>
        );
      })}
    </nav>
  );
}

function HeaderCtas({
  isLoggedIn,
  cart,
}: Pick<HeaderProps, 'isLoggedIn' | 'cart'>) {
  return (
    <nav className="header-ctas" role="navigation">
      <NavLink prefetch="intent" to="/account" style={activeLinkStyle}>
        <Suspense fallback="Sign in">
          <Await resolve={isLoggedIn} errorElement="Sign in">
            {(isLoggedIn) => (isLoggedIn ? 'Account' : 'Sign in')}
          </Await>
        </Suspense>
      </NavLink>
      <SearchToggle />
      <CartToggle cart={cart} />
      <HeaderMenuMobileToggle />
    </nav>
  );
}

function HeaderMenuMobileToggle() {
  return (
    <a className="header-menu-mobile-toggle" href="#mobile-menu-aside">
      <h3>☰</h3>
    </a>
  );
}

function SearchToggle() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [focused, setFocused] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <button onClick={showModal} style={{cursor: 'pointer'}}>
        <IoSearchSharp style={{fontSize: '25px'}} />
      </button>
      {/* ACTUAL DIALOG CODE */}
      <HeadModel
        title={'Search'}
        isVisible={isModalVisible}
        handleCancel={handleCancel}
      >
        {/* HEAD MODEL IS DIALOG AND IT'S CHILD ELEMENTS ARE PLACED BELOW  */}
        <div className="predictive-search">
          <br />
          <PredictiveSearchForm>
            {({fetchResults, inputRef}) => (
              <div className="flex flex-row items-center">
                <input
                  name="q"
                  onChange={fetchResults}
                  placeholder="Search"
                  ref={inputRef}
                  onFocus={(r) => {
                    setFocused(true);
                    fetchResults(r);
                  }}
                  onBlur={() => setFocused(false)}
                  type="search"
                  className={
                    (focused
                      ? 'border-b border-black outline-none'
                      : 'border border-none') + ' w-80'
                  }
                />
                &nbsp;
                <button type="submit">
                  <IoSearchSharp size={30} />
                </button>
              </div>
            )}
          </PredictiveSearchForm>
          <PredictiveSearchResults />
        </div>
      </HeadModel>
    </>
  );
}
function CartBadge({
  count,
  cart,
}: {
  count: number;
  cart: Promise<CartApiQueryFragment | null>;
}) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <>
      <button onClick={showModal} style={{cursor: 'pointer'}}>
        <PiShoppingBag style={{fontSize: '25px'}} />
      </button>
      {/* ACTUAL DIALOG CODE */}
      <HeadModel
        title={'Cart'}
        isVisible={isModalVisible}
        handleCancel={handleCancel}
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
    </>
  );
}

//@ts-expect-error
function CartToggle({cart}) {
  return (
    <Suspense fallback={<CartBadge count={0} cart={cart} />}>
      <Await resolve={cart}>
        {(cart) => {
          if (!cart) return <CartBadge count={0} cart={cart} />;
          return <CartBadge count={cart.totalQuantity || 0} cart={cart} />;
        }}
      </Await>
    </Suspense>
  );
}

const FALLBACK_HEADER_MENU = {
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

function activeLinkStyle({
  isActive,
  isPending,
}: {
  isActive: boolean;
  isPending: boolean;
}) {
  return {
    fontWeight: isActive ? 'bold' : undefined,
    color: isPending ? 'grey' : 'black',
  };
}

const brand_style = {
  boxShadow: `0px 0px 0px 10px radial-gradient(circle at center, cyan 0%, purple 25%, red 50%, yellow 75%)`,
  background: 'linear-gradient(to right,cyan,purple,red,yellow)',
};
