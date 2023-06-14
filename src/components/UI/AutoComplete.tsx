import { FunctionComponent, useState } from "react";
import useOutsideClick from "../../hooks/useOutsideClick";

interface IAutoCompleteProps {
  placeholder?: string;
  value?: string;
  options?: { value: string; label: string; done?: boolean }[];
  onSearch?: (value: string) => void;
  onChange?: (value: { value: string; label: string }) => void;
}

const AutoComplete: FunctionComponent<IAutoCompleteProps> = ({
  placeholder = "",
  value = "",
  options = [],
  onChange,
  onSearch,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOutsideClick = () => setIsOpen(false);

  const ref = useOutsideClick(handleOutsideClick);

  return (
    <div className="relative" ref={ref}>
      <input
        type="text"
        value={value}
        onClick={() => setIsOpen(true)}
        onChange={(e) => {
          onSearch && onSearch(e.target.value);
          setIsOpen(true);
        }}
        placeholder={placeholder}
        className="px-1"
      />
      <div className="absolute min-w-full max-w-full bg-white top-[110%] z-50  shadow-1">
        <ul
          style={{
            height: isOpen
              ? options.length > 5
                ? "125px"
                : options.length * 25 + "px"
              : 0,
            overflow: isOpen && options.length > 5 ? "auto" : "hidden",
          }}
          className="scroll tr-2"
        >
          {options.map((item) => (
            <li
              onClick={() => {
                !item.done && onChange && onChange(item);
                setIsOpen(false);
              }}
              className="p-1 cursor-pointer border-b-[1px] text-xs hover:bg-[#eee]"
              key={item.value}
            >
              {item.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AutoComplete;
