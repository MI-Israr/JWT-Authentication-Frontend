import { useState } from "react";
import ShowPass from "../assets/show.png";
import HidePass from "../assets/invisible.png";

const PasswordInput = ({ name, value, placeholder, onChange, error }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <div className="password-field">
        <input
          name={name}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        <span
          className="eye-icon"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <img src={HidePass} alt="" />
          ) : (
            <img src={ShowPass} alt="" />
          )}
        </span>
      </div>
      {error && <p className="error">{error}</p>}
    </>
  );
};

export default PasswordInput;
