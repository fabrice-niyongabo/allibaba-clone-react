import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetUser } from "../../actions/user";

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetUser());
    const url = new URL(window.location.href);
    const pathValue = url.searchParams.get("redirect");
    if (pathValue && pathValue.trim().length > 1) {
      navigate(`login-register?redirect=${pathValue}`);
    } else {
      navigate("/login-register");
    }
    localStorage.clear();
  }, []);
  return null;
};

export default Logout;
