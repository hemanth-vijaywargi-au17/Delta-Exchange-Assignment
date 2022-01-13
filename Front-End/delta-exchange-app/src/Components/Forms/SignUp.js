import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login, signup } from "../../Slices/userSlice";

const SignUp = () => {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signup_error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (signup_error === "Sign Up Success, Now logging you in!") {
      setTimeout(() => {
        dispatch(login({ email: Email, password: password }));
        navigate("/");
      }, 1000);
    }
  }, [signup_error]);

  const handleSubmitForm = (e) => {
    e.preventDefault();
    dispatch(signup({ name: Name, email: Email, password: password }));
  };

  return (
    <div className="form-parent">
      <form className="form" method="POST" onSubmit={handleSubmitForm}>
        <h2 className="form-heading">Sign Up</h2>

        <input
          className="form-input"
          type="text"
          name="name"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
          value={Name}
          required
        />

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

        <div className="form-error-message">{signup_error}</div>

        <button type="submit" className="form-submit-btn">
          Submit
        </button>

        <div>
          <span>Already a member ?</span>
          <Link to="/signin" className="form-secondary-btn">
            Sign In
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
