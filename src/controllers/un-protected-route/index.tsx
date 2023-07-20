import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { IUser, USER_ROLE_ENUM } from "../../interfaces";
import { RootState } from "../../reducers";

const LoggedInRedirection = () => {
  const url = new URL(window.location.href);
  const pathValue = url.searchParams.get("redirect");

  return pathValue && pathValue.trim().length > 1 ? (
    <Navigate to={`/${pathValue}`} />
  ) : (
    <Navigate to="/dashboard" />
  );
};

const AdminLoggedInRedirection = () => {
  const url = new URL(window.location.href);
  const pathValue = url.searchParams.get("redirect");

  return pathValue && pathValue.trim().length > 1 ? (
    <Navigate to={`/${pathValue}`} />
  ) : (
    <Navigate to="/dashboard/main" />
  );
};

const UnProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { token, role, apply, shopId } = useSelector(
    (state: RootState) => state.user as IUser
  );
  return (
    <>
      {!token || token.trim() === "" ? (
        children
      ) : role === USER_ROLE_ENUM.ADMIN ? (
        <AdminLoggedInRedirection />
      ) : (
        <>
          {shopId === null && apply === true ? (
            <Navigate to="/apply" />
          ) : (
            <LoggedInRedirection />
          )}
        </>
      )}
    </>
  );
};

export default UnProtectedRoute;
