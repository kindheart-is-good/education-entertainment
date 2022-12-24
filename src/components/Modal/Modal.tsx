import React from "react";
import "./Modal.css";

interface ModalProps {
    active: boolean,
    setActive: (is: boolean) => void,
    children: any,

}

const Modal: React.FC<ModalProps> = ({ active, setActive, children }) => {

    return (
        <div
            className={active ? "modal active" : "modal"}
            /*className={d => d.isActive(active) ? styles.active : styles.modal}*/
            onClick={() => setActive(false)}
        >
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