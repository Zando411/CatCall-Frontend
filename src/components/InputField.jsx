export default function InputField({
  label,
  id,
  name,
  value,
  onChange,
  type = "text",
  required = true,
  placeholder,
}) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="flex">
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className="focus:outline-accent mt-1 w-full rounded-md border border-gray-400 p-1 px-2 shadow-sm placeholder:text-sm"
        required={required}
        placeholder={placeholder}
      />
    </div>
  );
}
