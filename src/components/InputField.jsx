const InputField = ({
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
}) => {
  return (
    <div className="form-group">
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={error ? "input error-border" : "input"}
      />
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default InputField;
