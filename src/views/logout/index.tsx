import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetUser } from "../../actions/user";
import { resetBooking } from "../../actions/bookings";
import { resetWishlist } from "../../actions/wishlist";

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetUser());
    dispatch(resetBooking());
    dispatch(resetWishlist());
    const url = new URL(window.location.href);
    const pathValue = url.searchParams.get("redirect");
    if (pathValue && pathValue.trim().length > 1) {
      navigate(`/login-register?redirect=${pathValue}`);
    } else {
      navigate("/login-register");
    }
    localStorage.clear();
  }, []);
  return null;
};

export default Logout;
