import { NavLink, Outlet } from 'react-router-dom';
import { FcClapperboard } from 'react-icons/fc';

const Layout = () => {
  return (
    <div>
      <div className="header">
        <ul className="header_nav">
          <FcClapperboard size={50} />
          <li>
            <NavLink className="header_nav--text " to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink className="header_nav--text" to="/movies">
              Movies
            </NavLink>
          </li>
        </ul>
      </div>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
