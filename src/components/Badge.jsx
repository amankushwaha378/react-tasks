const variantClasses = {
  success: "bg-green-100 text-green-700",
  danger: "bg-red-100 text-red-700",
  warning: "bg-yellow-100 text-yellow-700",
  info: "bg-blue-100 text-blue-700",
  gray: "bg-gray-100 text-gray-700",
};

const sizeClasses = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-2.5 py-1 text-sm",
  lg: "px-3 py-1.5 text-base",
};

function Badge({
  children,
  variant = "gray",
  size = "md",
  className = "",
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full font-medium ${
        variantClasses[variant] || variantClasses.gray
      } ${sizeClasses[size] || sizeClasses.md} ${className}`}
    >
      {children}
    </span>
  );
}

export default Badge;