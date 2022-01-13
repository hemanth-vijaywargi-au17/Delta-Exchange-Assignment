import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { login } from "../../Slices/userSlice";

const SignIn = () => {
  const [Email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { name, signin_error } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch()

  if (name) {
    return <Navigate to="/" />;
  }

  const handleSubmitForm = (e) => {
    e.preventDefault();
    dispatch(login({email:Email,password:password}))
  };

  return (
    <div className="form-parent">
      <form
        className="form"
        method="POST"
        onSubmit={handleSubmitForm}
      >
        <h2 className="form-heading">Login</h2>

        <input
          className="form-input"
          type="email"
          name="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={Email}
          required
        />

        <input
          className="form-input"
          type="password"
          name="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />

        <div className="form-error-message">
          {signin_error}
        </div>

        <button type="submit" className="form-submit-btn">
          Submit
        </button>

        <div>
          <span>Not a member ?</span>
          <Link to="/signup" className="form-secondary-btn">
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
