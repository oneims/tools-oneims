export const Input = ({
  label,
  name,
  autoComplete,
  placeholder,
  type,
  required,
  register,
  errors,
  validations,
}) => {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        aria-labelledby={name}
        autoComplete={autoComplete}
        type={type}
        placeholder={placeholder}
        required={required}
        {...register(name, {
          ...validations,
        })}
      />
      {errors && errors[name] && (
        <div className="THEME__font-size-0n8 THEME__text-danger mt-2">
          <span>{errors[name]?.message}</span>
        </div>
      )}
    </>
  );
};

export const Textarea = ({
  label,
  name,
  autoComplete,
  placeholder,
  type,
  required,
  register,
  errors,
  validations,
}) => {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <textarea
        id={name}
        name={name}
        aria-labelledby={name}
        autoComplete={autoComplete}
        type={type}
        placeholder={placeholder}
        required={required}
        {...register(name, {
          ...validations,
        })}
      ></textarea>
      {errors && errors[name] && (
        <div className="THEME__font-size-0n8 THEME__text-danger mt-2">
          <span>{errors[name]?.message}</span>
        </div>
      )}
    </>
  );
};
