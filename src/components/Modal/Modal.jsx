import React from "react";
import "./Modal.css";

const Modal = ({active, setActive, children}) => {

    return (
        <div
            className={active ? "modal active" : "modal"}
            /*className={d => d.isActive(active) ? styles.active : styles.modal}*/
            onClick={() => setActive(false)}
        >
            Hello
            <div
                className={active ? "modalContent active" : "modalContent"}
                onClick={e => e.stopPropagation()}  /* stopPropagation() - Чтобы окно не закрывалось при нажатии на контентную часть */
            >
                {children}
            </div>
        </div>
    )
}

export default Modal