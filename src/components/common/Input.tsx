import React from "react";

type InputProps = {
  placeholder?: string;
  type?: string;
  value?: string | number;
  name?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isReadOnly?: boolean;
};

const Input: React.FC<InputProps> = ({
  placeholder,
  type,
  name,
  value,
  onChange,
  isReadOnly,
}) => {
  return (
    <div className="flex-col">
      {isReadOnly && (
        <label className="text-sm text-gray-500" htmlFor={name}>
          {placeholder}
        </label>
      )}
      <input
        className={`outline-none border-2 rounded-md p-2 mt-2 mb-2 w-full 
        ${
          isReadOnly
            ? "bg-gray-200 cursor-not-allowed text-center "
            : "border-gray-500 focus:border-gray-950"
        }
        `}
        name={name}
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
        readOnly={isReadOnly}
        disabled={isReadOnly}
      />
    </div>
  );
};

export default Input;
