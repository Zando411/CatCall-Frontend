export default function Button({
  children,
  onClick,
  className,
  disabled,
  type,
  defaults,
}) {
  let buttonClass = className;
  let defaultStyles = "";
  if (defaults == true) {
    defaultStyles =
      "transition hover:bg-accent hover:scale-105 hover:text-white hover:shadow-lg rounded-lg px-6 py-2 text-xl cursor-pointer";
  }

  if (className === "primary") {
    buttonClass = "bg-primary text-xl text-white px-6 py-2 rounded-lg";
  } else if (className === "secondary") {
    buttonClass = "bg-secondary text-xl text-white px-6 py-2 rounded-lg";
  }

  buttonClass += ` ${defaultStyles}`;
  return (
    <button
      onClick={onClick}
      className={buttonClass}
      disabled={disabled}
      type={type || "button"}
    >
      {children}
    </button>
  );
}
