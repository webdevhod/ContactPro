// import './header.scss';

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

// import { Navbar, Nav, NavbarToggler, Collapse } from 'reactstrap';
// import LoadingBar from 'react-redux-loading-bar';

// import { Home, Brand } from './header-components';
import { AdminMenu, EntitiesMenu, AccountMenu } from '../menus';
// import { AccountMenu } from '../menus';

export interface IHeaderProps {
  isAuthenticated: boolean;
  isAdmin: boolean;
  ribbonEnv: string;
  isInProduction: boolean;
  isOpenAPIEnabled: boolean;
}

const Header = (props: IHeaderProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const { pathname } = useLocation();

  /* jhipster-needle-add-element-to-menu - JHipster will add new menu items here */

  return (
    <nav className="navbar navbar-expand-md navbar-light fixed-top border-bottom border-light navShadow">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src="content/img/ContactPro.png" height="45" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={toggleMenu}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <ul className="navbar-nav me-auto mb-2 mb-md-0">
            <li className="nav-item">
              <Link className={`nav-link${pathname == '/' ? ' active' : ''}`} aria-current="page" to="/">
                Home
              </Link>
            </li>
            {props.isAuthenticated == true ? (
              <>
                <li className="nav-item">
                  <Link className={`nav-link${pathname == '/contact' ? ' active' : ''}`} to="/contact">
                    Contacts
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link${pathname == '/category' ? ' active' : ''}`} to="/category">
                    Categories
                  </Link>
                </li>
              </>
            ) : null}
          </ul>
          <ul className="navbar-nav">
            {props.isAuthenticated == false ? (
              <>
                <li className="nav-item me-2 mb-2">
                  <Link type="button" className="btn btn-primary rounded-pill btnlinks" to="/account/register">
                    Register
                  </Link>
                </li>
                <li className="nav-item me-2">
                  <Link type="button" className="btn btn-outline-primary rounded-pill btnlinks" to="/login">
                    Login
                  </Link>
                </li>
              </>
            ) : (
              <>
                {props.isAuthenticated && props.isAdmin && (
                  <AdminMenu showOpenAPI={props.isOpenAPIEnabled} showDatabase={!props.isInProduction} />
                )}
                <AccountMenu isAuthenticated={props.isAuthenticated} />
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
// import './header.scss';

// import React, { useState } from 'react';

// import { Navbar, Nav, NavbarToggler, Collapse } from 'reactstrap';
// import LoadingBar from 'react-redux-loading-bar';

// import { Home, Brand } from './header-components';
// import { AdminMenu, EntitiesMenu, AccountMenu } from '../menus';

// export interface IHeaderProps {
//   isAuthenticated: boolean;
//   isAdmin: boolean;
//   ribbonEnv: string;
//   isInProduction: boolean;
//   isOpenAPIEnabled: boolean;
// }

// const Header = (props: IHeaderProps) => {
//   const [menuOpen, setMenuOpen] = useState(false);

//   const renderDevRibbon = () =>
//     props.isInProduction === false ? (
//       <div className="ribbon dev">
//         <a href="">Development</a>
//       </div>
//     ) : null;

//   const toggleMenu = () => setMenuOpen(!menuOpen);

//   /* jhipster-needle-add-element-to-menu - JHipster will add new menu items here */

//   return (
//     <div id="app-header">
//       {renderDevRibbon()}
//       <LoadingBar className="loading-bar" />
//       <Navbar data-cy="navbar" dark expand="md" fixed="top" className="bg-primary">
//         <NavbarToggler aria-label="Menu" onClick={toggleMenu} />
//         <Brand />
//         <Collapse isOpen={menuOpen} navbar>
//           <Nav id="header-tabs" className="ms-auto" navbar>
//             <Home />
//             {props.isAuthenticated && <EntitiesMenu />}
//             {props.isAuthenticated && props.isAdmin && (
//               <AdminMenu showOpenAPI={props.isOpenAPIEnabled} showDatabase={!props.isInProduction} />
//             )}
//             <AccountMenu isAuthenticated={props.isAuthenticated} />
//           </Nav>
//         </Collapse>
//       </Navbar>
//     </div>
//   );
// };

// export default Header;
