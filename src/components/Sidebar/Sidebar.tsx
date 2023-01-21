import React from 'react';
import styles from './Sidebar.module.css';
import {NavLink} from "react-router-dom";

const Sidebar = () => {
    return (
        <div className={styles.navbar}>

            <div className={styles.item}>
                <NavLink to="/content/" className={ navData => navData.isActive ? styles.active : styles.item }>Go to start page</NavLink>
            </div>

            <div className={styles.item}>
                <NavLink to="/quiz/" className={ navData => navData.isActive ? styles.active : styles.item }>Quiz (phrasal verbs)</NavLink>
            </div>

            <div className={styles.item}>
                <NavLink to="/guess-letters/" className={ navData => navData.isActive ? styles.active : styles.item }>Guess Letters</NavLink>
            </div>

            <div className={styles.item}>
                <NavLink to="/testing-backend/" className={ navData => navData.isActive ? styles.active : styles.item }>Testing Backend</NavLink>
            </div>

        </div>
    );
};

export default Sidebar;