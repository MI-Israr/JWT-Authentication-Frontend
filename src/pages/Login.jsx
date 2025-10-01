// import { useState } from "react";
// import { login } from "../api/auth";
// import { Link, useNavigate } from "react-router-dom";
// import PasswordInput from "./PasswordInput";

// const Login = () => {
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [message, setMessage] = useState("");
//   const [isError, setIsError] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await login(form);

//       localStorage.setItem("token", res.data.token);
//       localStorage.setItem("user", JSON.stringify(res.data.user));

//       setIsError(false);
//       setMessage(" Login successful!");

//       navigate("/home");
//     } catch (err) {
//       setIsError(true);
//       setMessage("❌ " + (err.response?.data?.error || err.message));
//     }
//   };

//   return (
//     <div className="auth-container">
//       <h2>LOGIN</h2>
//       <form className="auth-form" onSubmit={handleSubmit}>
//         <input
//           name="email"
//           type="email"
//           placeholder="Email"
//           onChange={handleChange}
//         />
//         <PasswordInput
//           name="password"
//           value={form.password}
//           onChange={handleChange}
//         />
//         <button type="submit">Login</button>
//         <p className="route">
//           create an account{" "}
//           <Link to="/signup" className="link">
//             Signup
//           </Link>{" "}
//         </p>
//       </form>
//       {message && (
//         <p className={`message ${isError ? "error" : "success"}`}>{message}</p>
//       )}
//     </div>
//   );
// };

// export default Login;
import { useState } from "react";
import { login } from "../api/auth";
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import PasswordInput from "../components/PasswordInput";
import RouteLink from "../components/RouteLink";
import { loginSchema } from "../schemas/index.js";

const Login = ({ setIsAuth }) => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await loginSchema.validate(form, { abortEarly: false });
      setErrors({});

      const res = await login(form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      setIsError(false);
      setMessage("✅ Login successful!");
      setIsAuth(true);
      navigate("/home");
    } catch (err) {
      if (err.name === "ValidationError") {
        const formErrors = {};
        err.inner.forEach((e) => (formErrors[e.path] = e.message));
        setErrors(formErrors);
      } else {
        setIsError(true);
        setMessage("❌ " + (err.response?.data?.error || err.message));
      }
    }
  };

  return (
    <div className="auth-container">
      <h2>LOGIN</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <InputField
          label="Email"
          name="email"
          type="email"
          placeholder="Enter email"
          value={form.email}
          onChange={handleChange}
          error={errors.email}
        />
        <PasswordInput
          name="password"
          value={form.password}
          onChange={handleChange}
          error={errors.password}
        />
        <p className="forget-pass">forget password</p>
        <button type="submit">Login</button>
        <RouteLink to="signup" text="Don’t have an account" />
      </form>
      {message && (
        <p className={`message ${isError ? "error" : "success"}`}>{message}</p>
      )}
    </div>
  );
};

export default Login;
