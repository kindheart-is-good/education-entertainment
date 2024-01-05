import { useEffect, useRef, useState } from "react";
import { GoChevronDown } from "react-icons/go";
import Panel from "../Panel/Panel";

function Dropdown({ options, value, onChange }) {
    const [isOpen, setIsOpen] = useState(false);
    const divEl = useRef();

    useEffect(() => {
        const handler = (event) => {
                /* Прежде всего, делаю следующую проверку для случаев, когда divEl.current может быть null.
                Например, если код написан так что этот div при некоторых условиях может быть невидимым, скрывать видимость. */
            if (!divEl.current) {
                return;
            }
                /* Хотя можно и просто написать так:
                if (!divEl.current?.contains(event.target)) {
                  setIsOpen(false);
                }*/

            if (!divEl.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("click", handler, true);

        return () => {
            document.removeEventListener("click", handler);
        };
    }, []);

    const handleClick = () => {
        setIsOpen((currentIsOpen) => !currentIsOpen);
    };

    const handleOptionClick = (option) => {
        setIsOpen(false);
        onChange(option);
    };

    const renderedOptions = options.map((option) => {
        return (
            <div
                className="hover:bg-sky-100 rounded cursor-pointer p-1"
                onClick={() => handleOptionClick(option)}
                key={option.value}
            >
                {option.label}
            </div>
        );
    });

    /* Строки ниже заменил на boolean expression внутри return вместе пременной {content} которую там ставил раньше. */
    //let content = "Select...";
    //if (value) {
    //  content = value.label;
    //}

    return (
        <div ref={divEl} className="w-48 relative">
            <Panel
                className="flex justify-between items-center cursor-pointer"
                onClick={handleClick}
            >
                {value?.label || "Select..."}
                <GoChevronDown className="text-lg" />
            </Panel>
            {isOpen && <Panel className="absolute top-full">{renderedOptions}</Panel>}
        </div>
    );
}

export default Dropdown;
