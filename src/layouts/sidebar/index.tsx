import { Button, Nav, NavItem } from "reactstrap";
import Logo from "../Logo";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../reducers";
import { USER_ROLE_ENUM } from "../../interfaces";
import { adminNavigation } from "./admin";

const Sidebar = () => {
  const { role } = useSelector((state: RootState) => state.user);
  const showMobilemenu = () => {
    //@ts-ignore
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };
  let location = useLocation();

  return (
    <div className="p-3">
      <div className="d-flex align-items-center">
        <Logo />
        <Button
          close
          size="sm"
          className="ms-auto d-lg-none"
          onClick={() => showMobilemenu()}
        ></Button>
      </div>
      <div className="pt-4 mt-2">
        <Nav vertical className="sidebarNav">
          {role === USER_ROLE_ENUM.ADMIN &&
            adminNavigation.map((navi, index) => (
              <NavItem key={index} className="sidenav-bg">
                <Link
                  to={navi.href}
                  className={
                    location.pathname === navi.href
                      ? "text-primary nav-link py-3"
                      : "nav-link text-secondary py-3"
                  }
                >
                  <i className={navi.icon}></i>
                  <span className="ms-3 d-inline-block">{navi.title}</span>
                </Link>
              </NavItem>
            ))}
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;
