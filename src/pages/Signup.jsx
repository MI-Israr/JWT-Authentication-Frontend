import { useState } from "react";
import { signup } from "../api/auth.jsx";
import { useNavigate } from "react-router-dom";
import PasswordInput from "../components/PasswordInput.jsx";
import { registerSchema } from "../schemas/index.js";
import InputSignup from "../components/InputSignup.jsx";
import RouteLink from "../components/RouteLink.jsx";

const Signup = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await registerSchema.validate(form, { abortEarly: false });
      setErrors({});

      const res = await signup(form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      setMessage("✅ Signup successful!");
      navigate("/home");
    } catch (err) {
      if (err.name === "ValidationError") {
        const formErrors = {};
        err.inner.forEach((e) => (formErrors[e.path] = e.message));
        setErrors(formErrors);
      } else {
        setMessage("❌ " + (err.response?.data?.error || err.message));
      }
    }
  };

  return (
    <div className="auth-container">
      <h2>SIGNUP</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <InputSignup form={form} handleChange={handleChange} errors={errors} />
        <PasswordInput
          name="password"
          value={form.password}
          onChange={handleChange}
          error={errors.password}
        />
        <button type="submit">Signup</button>
        <RouteLink to="login" text="Already have an account" />
      </form>

      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default Signup;
