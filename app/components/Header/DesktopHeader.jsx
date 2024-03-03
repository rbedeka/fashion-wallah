import {Await, NavLink, useNavigate} from '@remix-run/react';
import {Suspense} from 'react';
import {useRootLoaderData} from '~/root';
import {IoSearchOutline} from 'react-icons/io5';
import {RiShoppingBag3Fill} from 'react-icons/ri';
import logo from '../../styles/images/logo.png'
import {FALLBACK_HEADER_MENU} from '../Layout';

/**
 * @param {HeaderProps}
 */
export function DesktopHeader({header, isLoggedIn, cart}) {
  const {shop, menu} = header;
  return (
    <header className="header backdrop-blur-md bg-white/30 desktop-component">
      {/* BRAND */}
      <NavLink
        className="flex flex-row justify-center"
        prefetch="intent"
        to="./"
        exact
        style={activeLinkStyle}
        end
      >
       
        <img src={logo} style={{width:'20vw'}} />
        
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

/**
 * @param {{
 *   menu: HeaderProps['header']['menu'];
 *   primaryDomainUrl: HeaderQuery['shop']['primaryDomain']['url'];
 *   viewport: Viewport;
 * }}
 */
export function HeaderMenu({menu, primaryDomainUrl, viewport}) {
  const {publicStoreDomain} = useRootLoaderData();

  const className = `header-menu-${viewport}`;

  function closeAside(event) {
    if (viewport === 'mobile') {
      event.preventDefault();
      window.location.href = event.currentTarget.href;
    }
  }
  // (menu || FALLBACK_HEADER_MENU).items.map((item) => {
  //   console.log(item);
  // })

  return (
    <nav className={className} role="navigation">
      {viewport === 'mobile' && (
        <NavLink
          end
          onClick={closeAside}
          prefetch="intent"
          style={activeLinkStyle}
          to="./"
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

/**
 * @param {Pick<HeaderProps, 'isLoggedIn' | 'cart'>}
 */
function HeaderCtas({isLoggedIn, cart}) {
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
      {/* <HeaderMenuMobileToggle /> */}
    </nav>
  );
}

function HeaderMenuMobileToggle() {
  return (
    <a className="header-menu-mobile-toggle" href="#mobileMenu">
      <h3>☰</h3>
    </a>
  );
}

export function SearchToggle() {
  
  return (
    <a href='#search-pop' style={{cursor: 'pointer'}}>
      <IoSearchOutline style={{fontSize: '25px'}} />
    </a>  
  );
}
/**
 * @param {{count: number}}
 */
export function CartBadge({count, cart}) {
  return (
      <a href='#cart-pop'>
        <RiShoppingBag3Fill style={{fontSize: '25px'}} />
      </a>   
  );
}

/**
 * @param {Pick<HeaderProps, 'cart'>}
 */
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

/**
 * @param {{
 *   isActive: boolean;
 *   isPending: boolean;
 * }}
 */
function activeLinkStyle({isActive, isPending}) {
  return {
    fontWeight: isActive ? 'bold' : undefined,
    color: isPending ? 'grey' : 'black',
  };
}

/** @typedef {Pick<LayoutProps, 'header' | 'cart' | 'isLoggedIn'>} HeaderProps */
/** @typedef {'desktop' | 'mobile'} Viewport */

/** @typedef {import('storefrontapi.generated').HeaderQuery} HeaderQuery */
/** @typedef {import('../Layout').LayoutProps} LayoutProps */
