export default function Input({
  label,
  name,
  type,
  placeholder,
  value,
  onChange,
  register,
  errorMessage,
}) {
  return (
    <div className="form-control">
      <label htmlFor={name} className="label">
        <span className="label-text">{label}</span>
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`input input-bordered focus:outline-none ${errorMessage && "invalid"}`}
        {...register}
      />
      <span className="error-message">{errorMessage}</span>
    </div>
  );
}
