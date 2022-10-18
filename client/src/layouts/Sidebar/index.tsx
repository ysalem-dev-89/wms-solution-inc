import '../style.css';
import { useState } from 'react';
import {
  FaTh,
  FaBars,
  FaUserAlt,
  FaRegChartBar,
  FaCommentAlt,
  FaShoppingBag
} from 'react-icons/fa';
import { AiOutlineTransaction } from 'react-icons/ai';

import { Nav, NavItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

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
    {
      path: '/transactions',
      name: 'Transactions',
      icon: <AiOutlineTransaction />
    },
    {
      path: '/users',
      name: 'Users',
      icon: <FaUserAlt />
    }
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
        <h1
          className={`logo fs-4 text-white m-0 ${
            isOpen ? 'd-flex' : 'd-none'
          } gap-2 align-items-center`}
        >
          <img src="./images/wms_logo.png" alt="wms logo" />
          WMS
        </h1>
        <div className="bars d-flex text-white">
          <FaBars onClick={toggle} />
        </div>
      </div>
      <Nav
        className={`flex-column overflow-hidden mb-5 ${
          isOpen ? 'mx-3' : 'mx-2'
        } mt-3`}
      >
        {menuItem.map((item, index) => (
          <NavItem key={index}>
            <NavLink
              to={item.path}
              className="link text-white d-flex align-items-center px-3 gap-3 rounded mb-2"
              // activeclassName="active"
            >
              <div className="icon">{item.icon}</div>
              <div className={`link-text ${isOpen ? 'd-block' : 'd-none'}`}>
                {item.name}
              </div>
            </NavLink>
          </NavItem>
        ))}
      </Nav>
    </aside>
  );
};

export default Sidebar;
