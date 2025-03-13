export default function DropdownField({
  label,
  id,
  name,
  value,
  onChange,
  options,
}) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="flex">
        {label}
      </label>
      <select
        id={id}
        name={name}
        value={value || ""}
        onChange={onChange}
        className={`focus:outline-accent focus:border-accent focus:ring-accent $ mt-1 w-full rounded-md border border-gray-400 px-2 py-[5px] shadow-sm placeholder:text-sm`}
      >
        <option value="" className="">
          Select {label}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
