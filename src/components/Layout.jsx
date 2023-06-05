import { NavLink, Outlet } from 'react-router-dom';
import { FcClapperboard } from 'react-icons/fc';
import { Suspense } from 'react';

const Layout = () => {
  return (
    <div>
      <div className="header">
        <ul className="header_nav">
          <FcClapperboard size={50} />
          <li>
            <NavLink className="header_nav--text" to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink className="header_nav--text " to="/movies">
              Movies
            </NavLink>
          </li>
        </ul>
      </div>
      <main>
        <Suspense fallback={<p>Load page...</p>}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
};

export default Layout;
