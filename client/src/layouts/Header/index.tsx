import '../style.css';
import {
  Navbar,
  NavbarBrand,
  NavbarText,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  Button,
  Breadcrumb,
  BreadcrumbItem
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(!dropdownOpen);

  return (
    <header>
      <div className="header-content bg-white py-0 container-fluid">
        <Navbar light expand="md" className="py-0">
          <NavbarBrand href="/">
            {' '}
            <Breadcrumb listClassName="mb-0">
              <BreadcrumbItem className="text-decoration-none">
                <a href="#">Home</a>
              </BreadcrumbItem>
              <BreadcrumbItem className="text-decoration-none" active>
                Dashboard
              </BreadcrumbItem>
            </Breadcrumb>
          </NavbarBrand>
          <NavbarText className="nav-text d-flex">
            <div className="d-flex rounded">
              <Dropdown
                isOpen={dropdownOpen}
                toggle={toggle}
                className="rounded"
              >
                <DropdownToggle
                  caret={false}
                  className="dp-toggle bg-white border-0 rounded"
                >
                  <span className="username d-flex justify-content-center align-items-center text-white bg-primary rounded-circle">
                    AU
                  </span>
                </DropdownToggle>
                <DropdownMenu>
                  <div className="rounded px-3 py-2">
                    <div className="d-flex gap-3 align-items-center">
                      <div>
                        <span className="p-4 bg-border rounded-circle text-black">
                          AU
                        </span>
                      </div>
                      <div className="flex-grow-1">
                        <p className="mb-1">Username</p>
                        <p className="mb-2">email@example.com</p>
                      </div>
                    </div>
                    <hr />
                    <Button color="danger">
                      <NavLink
                        to="/login"
                        className="text-white d-block text-decoration-none"
                      >
                        Logout
                      </NavLink>
                    </Button>{' '}
                  </div>
                </DropdownMenu>
              </Dropdown>
            </div>
          </NavbarText>
        </Navbar>
      </div>
    </header>
  );
};

export default Header;
