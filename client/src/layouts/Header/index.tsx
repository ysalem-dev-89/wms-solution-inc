/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Dropdown,
  NavbarText,
  DropdownToggle,
  DropdownMenu,
  Button,
  Breadcrumb,
  BreadcrumbItem
} from 'reactstrap';
import { NavLink, Link, redirect } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useState, useContext } from 'react';
import { MdPointOfSale } from 'react-icons/md';
import useAuth from '../../hooks/useAuth';
import { authApi } from '../../api';
import { dispatch } from '../../interfaces/authprovider';
import { PageContext } from '../../contexts/PageContext';
import '../style.css';
import Alert from './Alert';
import Logo from '../../assets/images/wms_logo.png';

const logout = async (dispatch?: dispatch) => {
  try {
    await authApi.logOut();

    dispatch?.({
      type: 'LOGOUT'
    });

    redirect('/');
  } catch (error: any) {}
};

const Header = () => {
  const { handleSubmit } = useForm<any>();
  const { pages } = useContext(PageContext);

  const { auth, dispatch } = useAuth();

  const { user } = auth;

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen(!dropdownOpen);

  return (
    <header>
      <div className="header-content bg-white py-0 container-fluid">
        <nav
          className={`navbar navbar-expand-lg d-flex justify-content-between  px-1 py-0`}
        >
          <Breadcrumb listClassName="mb-0 p-2">
            {!auth?.loggedIn ? (
              <>
                <BreadcrumbItem className="text-decoration-none">
                  <NavLink
                    to="login"
                    style={({ isActive }) =>
                      isActive ? undefined : { color: 'rgb(126, 123, 121)' }
                    }
                  >
                    LogIn
                  </NavLink>
                </BreadcrumbItem>
                <BreadcrumbItem className="text-decoration-none">
                  <NavLink
                    to="about"
                    style={({ isActive }) =>
                      isActive ? undefined : { color: 'rgb(126, 123, 121)' }
                    }
                  >
                    About Us
                  </NavLink>
                </BreadcrumbItem>
              </>
            ) : (
              <>
                {pages.map((item, index, arr) =>
                  index < arr.length - 1 ? (
                    <BreadcrumbItem
                      key={item.link}
                      className="text-decoration-none"
                    >
                      <Link to={item.link}>{item.title}</Link>
                    </BreadcrumbItem>
                  ) : (
                    <BreadcrumbItem
                      key={item.link}
                      className="text-decoration-none"
                      active
                    >
                      {item.title}
                    </BreadcrumbItem>
                  )
                )}
              </>
            )}
          </Breadcrumb>

          {user?.role == 'superAdmin' ||
          user?.role == 'admin' ||
          user?.role == 'transactions' ? (
            <Button className="dp-toggle bg-white border-0 rounded ms-auto">
              <Link to="/pos" className="text-decoration-none">
                <span
                  title="Point of Sale | Cashier"
                  className="username d-flex justify-content-center align-items-center text-white bg-blue rounded-circle"
                >
                  <MdPointOfSale />
                </span>
              </Link>
            </Button>
          ) : (
            <></>
          )}

          {auth?.loggedIn ? (
            <NavbarText className="nav-text d-flex  align-items-center circles">
              <Alert />
              <div className="d-flex rounded test circle1">
                <Dropdown
                  isOpen={dropdownOpen}
                  toggle={toggle}
                  className="rounded"
                >
                  <DropdownToggle
                    caret={false}
                    className="dp-toggle d-flex gap-2 align-items-center  bg-white border-0 rounded"
                  >
                    <span
                      className="username d-flex justify-content-center align-items-center text-white bg-primary rounded-circle"
                      title={`${user?.username} | ${user?.role}`}
                    >
                      {user?.role?.slice(0, 2).toUpperCase()}
                    </span>
                    {/* {user?.username}
                    <FaAngleDown /> */}
                  </DropdownToggle>
                  <DropdownMenu>
                    <div className="rounded px-3 py-2">
                      <div className="d-flex gap-3 align-items-center">
                        <div>
                          <span className="p-4 bg-border rounded-circle text-black">
                            {user?.role?.slice(0, 2).toUpperCase()}
                          </span>
                        </div>
                        <div className="flex-grow-1">
                          <p className="mb-1">{user?.email}</p>
                          <p className="mb-2">{user?.username}</p>
                        </div>
                      </div>
                      <hr />
                      <form
                        onSubmit={handleSubmit(() => {
                          logout(dispatch);
                        })}
                      >
                        <Button color="danger" className="text-white">
                          Logout
                        </Button>{' '}
                      </form>
                    </div>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </NavbarText>
          ) : (
            <img
              src={Logo}
              alt=""
              className="navbar-brand"
              style={{ width: '2.5rem', display: 'block' }}
            />
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
