import React from 'react';
import styles from './Sidebar.module.css';
import {NavLink} from "react-router-dom";

const Sidebar = (props) => {
    return (
        <div className={styles.navbar}>
            <div className={styles.item}>
                <NavLink to="/quiz" className={ navData => navData.isActive ? styles.active : styles.item }>
                    Start Quiz
                </NavLink>
            </div>
        </div>
    );
};

export default Sidebar;