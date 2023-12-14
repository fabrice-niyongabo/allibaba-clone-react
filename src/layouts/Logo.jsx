import { Link } from "react-router-dom";
import logo from "../assets/images/logo2.png";
import { appColors } from "../constants";
import { isMobile } from "react-device-detect";

const Logo = () => {
  return (
    <Link to="/" style={{ textDecoration: "none" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src={logo}
          alt="logo"
          style={{
            width: 50,
            height: 50,
          }}
        />
        {!isMobile && (
          <h2
            style={{
              display: "inline-block",
              margin: 0,
              padding: 0,
              color: appColors.ORANGE,
            }}
          >
            Afrisellers
          </h2>
        )}
      </div>
    </Link>
  );
};

export default Logo;
