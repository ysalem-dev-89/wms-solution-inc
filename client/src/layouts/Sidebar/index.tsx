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
import { NavLink } from 'react-router-dom';

const Sidebar = ({}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const menuItem = [
    {
      path: '/',
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
      icon: <FaCommentAlt />
    },
    {
      path: '/users',
      name: 'Users',
      icon: <FaUserAlt />
    }
  ];
  return (
    <div style={{ width: isOpen ? '250px' : '50px' }} className="sidebar">
      <div className="top_section">
        <h1
          style={{ display: isOpen ? 'block' : 'none' }}
          className="logo fs-4"
        >
          WMS
        </h1>
        <div className="bars">
          <FaBars onClick={toggle} />
        </div>
      </div>
      {menuItem.map((item, index) => (
        <NavLink
          to={item.path}
          key={index}
          className="link"
          // activeclassName="active"
        >
          <div className="icon">{item.icon}</div>
          <div
            style={{ display: isOpen ? 'block' : 'none' }}
            className="link_text"
          >
            {item.name}
          </div>
        </NavLink>
      ))}
    </div>
  );
};

export default Sidebar;

// import { NavItem, NavLink, Nav } from 'reactstrap';
// import { Link } from 'react-router-dom';

// const Sidebar = ({}) => (
//   <div className="sidebar">
//     <div className="sidebar-header">
//       <span color="info" style={{ color: '#fff' }}>
//         &times;
//       </span>
//       <h3>Bootstrap Sidebar</h3>
//     </div>
//     <div className="side-menu">
//       <Nav vertical className="list-unstyled pb-3">
//         <p>Dummy Heading</p>
//         <NavItem>
//           <NavLink tag={Link} to={'/'}>
//             Home
//           </NavLink>
//         </NavItem>
//         <NavItem>
//           <NavLink tag={Link} to={'/products'}>
//             Products
//           </NavLink>
//         </NavItem>
//         <NavItem>
//           <NavLink tag={Link} to={'/categories'}>
//             Categories
//           </NavLink>
//         </NavItem>
//         <NavItem>
//           <NavLink tag={Link} to={'/transactions'}>
//             Transactions
//           </NavLink>
//         </NavItem>
//         <NavItem>
//           <NavLink tag={Link} to={'/users'}>
//             Users
//           </NavLink>
//         </NavItem>
//       </Nav>
//     </div>
//   </div>
// );

// export default Sidebar;
