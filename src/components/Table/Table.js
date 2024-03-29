import { Fragment } from "react";
import styles from "./Table.module.css";

function Table({ data, config, keyFn }) {
    const renderedHeaders = config.map((column) => {
        if (column.header) {
            return <Fragment key={column.label}>{column.header()}</Fragment>; // wrap function column.header() with <div> to fix issue with key prop.
        }
        return <th key={column.label}>{column.label}</th>;
    });

    const renderedRows = data.map((rowData) => {
        const renderedCells = config.map((column) => {
            return (
                <td key={column.label} className={styles.cell}>
                    {column.render(rowData)}
                </td>
            );
        });

        return (
            <tr key={keyFn(rowData)} className={styles.cellWrapper}>
                {renderedCells}
            </tr>
        );
    });

    return (
        <table className={styles.tableWrapper}>
            <thead>
            <tr className={styles.row}>{renderedHeaders}</tr>
            </thead>
            <tbody>{renderedRows}</tbody>
        </table>
    );
}

export default Table;
