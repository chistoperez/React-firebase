import ButtonLoading from "./ButtonLoading";

const Button = ({ text, type, color = "green", loading, onClick }) => {
  if (loading) return <ButtonLoading color={color} />;
  return (
    <button
      onClick={onClick}
      type={type}
      className={`focus:outline-none text-white bg-${color}-700 hover:bg-${color}-800 focus:ring-4 focus:ring-${color}-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-${color}-600 dark:hover:bg-${color}-700 dark:focus:ring-${color}-800`}
    >
      {text}
    </button>
  );
};

export default Button;
