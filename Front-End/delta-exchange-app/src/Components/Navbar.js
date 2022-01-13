import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../Slices/userSlice";

function Navbar() {
  const {name} = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const logOut = () => {
    dispatch(logout());
  };

  return (
    <div className="navbar">
      {/*Nav Brand */}
      <Link to="/" className="navbrand">
        <div className="navbrand-name">Delta</div>
      </Link>

      {/*Navigation*/}
      <nav className="navigation">
        {/*Links*/}
        {name ? (
          <>
            <div className="nav-link" onClick={logOut}>
              Log out
            </div>
            <div className="">
              {name}
            </div>
          </>
        ) : (
          <>
            <Link className="nav-link" to="/signin">
              Login
            </Link>

            <Link className="nav-link" to="/signup">
              Sign Up
            </Link>
          </>
        )}
      </nav>
    </div>
  );
}

export default Navbar;
