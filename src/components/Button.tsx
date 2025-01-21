import { Html } from "@elysiajs/html";

const colors = {
  primary: "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",
  secondary: "text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800",
  danger: "text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800",
  success: "text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800",
};

export default function Button({
  children,
  color = "primary",
  type = "button",
  link = false,
  className='',
  ...rest
}: {
  children: any,
  link?: boolean,
  className?: string,
  color?: "primary" | "secondary" | "danger" | "success",
  type?: "button" | "submit" | "reset"
} & Record<string, any>) {
  const colorClasses = colors[color];

  if (link) {
    return (
      <a
        class={"px-3 py-2 text-xs font-medium text-center inline-flex items-center rounded-lg focus:ring-4 focus:outline-none " + colorClasses +` ${className}`}
        {...rest}>
        {children}
      </a>
    )
  }

  return (
    <button
      class={"px-3 py-2 text-xs font-medium text-center inline-flex items-center rounded-lg focus:ring-4 focus:outline-none " + colorClasses +` ${className}`}
      type={type} {...rest}>
      {children}
    </button>
  )
}