import React from "react";
import styles from "./Header.module.css"

const Header = (props) => {
    return (
        <div className={styles.header}>
            <div className={styles.headerText}>
                login
            </div>
        </div>
    )
}

export default Header;