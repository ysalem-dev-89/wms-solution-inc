import '../style.css';
import { useState } from 'react';
import {
  FaTh,
  FaBars,
  FaUserAlt,
  FaRegChartBar,
  FaShoppingBag
} from 'react-icons/fa';
import { AiOutlineTransaction } from 'react-icons/ai';
import Logo from '../../assets/images/wms_logo.png';

import { Nav, NavItem } from 'reactstrap';
import { Link, NavLink } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);
  const { auth } = useAuth();
  const { user } = auth;

  const menuItem = [
    {
      path: '/dashboard',
      name: 'Dashboard',
      icon: <FaTh />
    },
    {
      path: '/products',
      name: 'Products',
      icon: <FaShoppingBag />
    },
    {
      path: '/categories',
      name: 'Categories',
      icon: <FaRegChartBar />
    },
    user?.role == 'superAdmin' ||
    user?.role == 'admin' ||
    user?.role == 'transactions'
      ? {
          path: '/transactions',
          name: 'Transactions',
          icon: <AiOutlineTransaction />
        }
      : null,
    user?.role == 'superAdmin' || user?.role == 'admin'
      ? {
          path: '/users',
          name: 'Users',
          icon: <FaUserAlt />
        }
      : null
  ];
  return (
    <aside
      style={{ width: isOpen ? '320px' : '65px' }}
      className="sidebar bg-bg-dark"
    >
      <div
        className={`sidebar-top d-flex px-4 py-4 align-items-center ${
          isOpen ? 'justify-content-between' : 'justify-content-center'
        }`}
      >
        <Link to="" className="text-decoration-none">
          <h1
            className={`logo fs-4 text-white m-0 ${
              isOpen ? 'd-flex' : 'd-none'
            } gap-2 align-items-center`}
          >
            <img src={Logo} alt="wms logo" />
            WMS
          </h1>
        </Link>
        <div className="bars d-flex text-white" role="button">
          <FaBars onClick={toggle} />
        </div>
      </div>
      <Nav
        className={`flex-column overflow-hidden mb-5 ${
          isOpen ? 'mx-3' : 'mx-2'
        } mt-3`}
      >
        {menuItem.map((item, index) =>
          item ? (
            <NavItem key={index}>
              <NavLink
                to={item.path}
                className="link text-white d-flex align-items-center px-3 gap-3 rounded mb-2"
              >
                <div className="icon">{item.icon}</div>
                <div className={`link-text ${isOpen ? 'd-block' : 'd-none'}`}>
                  {item.name}
                </div>
              </NavLink>
            </NavItem>
          ) : (
            <></>
          )
        )}
      </Nav>
    </aside>
  );
};

export default Sidebar;
