import { useState } from "react";
import { GoChevronDown, GoChevronLeft } from "react-icons/go";
import styles from "./Accordion.module.css";

function Accordion({ items }) {
    const [expandedIndex, setExpandedIndex] = useState(-1);

    const handleClick = (nextIndex) => {
        /* Использую версию сеттера из useState принимающего функцию - для решения бага с $0.click(); $0.click(); */
        //console.log("STALE version of expandedIndex", expandedIndex);
        setExpandedIndex((currentExpandedIndex) => {
            //console.log("UP-TO-DATE version of expandedIndex", currentExpandedIndex);
            if (currentExpandedIndex === nextIndex) {
                return -1;
            } else {
                return nextIndex;
            }
        });
    };

    const renderedItems = items.map((item, index) => {
        const isExpanded = index === expandedIndex;

        const icon = (
            <span className={styles.icon}>
                {isExpanded ? <GoChevronDown /> : <GoChevronLeft />}
            </span>
        );

        return (
            <div key={item.id}>
                <div
                    className={styles.itemWrapper}
                    onClick={() => handleClick(index)}
                >
                    {item.label}
                    {icon}
                </div>
                {isExpanded && <div className={styles.expanded}>{item.content}</div>}
            </div>
        );
    });

    return <div className={styles.wrapper}>{renderedItems}</div>;
}

export default Accordion;
