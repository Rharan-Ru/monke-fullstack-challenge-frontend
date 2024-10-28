import React from "react";

type ButtonProps = {
  placeholder?: string;
  icon?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  buttonStyle?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  placeholder,
  icon,
  onClick,
  buttonStyle,
  type,
  disabled,
}) => {
  return (
    <button
      type={type || "button"}
      className={`rounded-md p-2 mt-2 mb-2 w-full ${
        disabled && "cursor-not-allowed opacity-50"
      } ${buttonStyle || "bg-gray-950 text-white hover:bg-gray-700"}`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {placeholder}
    </button>
  );
};

export default Button;
