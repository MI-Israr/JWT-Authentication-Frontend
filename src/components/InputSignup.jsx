import InputField from "./InputField";

const InputSignup = ({ form, handleChange, errors }) => {
  const inputs = [
    { name: "firstName", placeholder: "Enter first name" },
    { name: "lastName", placeholder: "Enter last name" },
    {
      name: "email",
      type: "email",
      placeholder: "Enter email",
    },
  ];

  return (
    <>
      {inputs.map((input) => (
        <InputField
          key={input.name}
          name={input.name}
          type={input.type || "text"}
          placeholder={input.placeholder}
          value={form[input.name]}
          onChange={handleChange}
          error={errors[input.name]}
        />
      ))}
    </>
  );
};

export default InputSignup;
