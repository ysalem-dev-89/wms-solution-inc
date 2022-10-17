import '../style.css';
import { AiOutlineUser } from 'react-icons/ai';
import { Nav, Navbar, NavbarBrand, NavbarText, NavItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <div className="header-content">
        <Navbar light expand="md">
          <NavbarBrand href="/" className="text-white">
            Dashboard
          </NavbarBrand>
          <NavbarText className="nav-text d-flex">
            <NavLink to={'/login'} className="link rounded">
              Login
            </NavLink>
            <NavLink to={'/user/admin/profile'} className="link rounded">
              User <AiOutlineUser></AiOutlineUser>
            </NavLink>
          </NavbarText>
        </Navbar>
      </div>
    </header>
  );
};

export default Header;
