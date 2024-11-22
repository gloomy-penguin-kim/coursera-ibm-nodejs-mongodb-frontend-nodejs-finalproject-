import { Outlet, NavLink } from 'react-router-dom';
import Navigation from './Navigation';

const Layout = () => (
  <> 
    <Navigation />
    <br/>
    <Outlet />
  </>
);

export default Layout

