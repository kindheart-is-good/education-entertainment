import SortableTable from "../../components/Table/SortableTable";
import Table from "../../components/Table/Table";
import styles from "../CardLibrary/CardLibrary.module.css";

function TensesPage() {
    const data = [
        { name: "Simple", color: "bg-orange-500",
            past: 'Это время используется для описания действий или событий, которые произошли в определенное время в прошлом.',
            present: 'Это время используется для выражения действий, фактов или общих истин, которые происходят регулярно, постоянно или не зависят от времени.',
            future: 'Это время используется для выражения действий или событий, которые произойдут в будущем без указания на точное время.' },
        { name: "Continuous", color: "bg-red-500", score: 3 },
        { name: "Perfect", color: "bg-yellow-500", score: 1 },
        { name: "Perfect Continuous", color: "bg-yellow-500", score: 1 },
    ];

    const config = [
        {
            label: "%",
            render: (fruit) => fruit.name,
            //sortValue: (fruit) => fruit.name,
        },
        {
            label: "Past",
            render: (fruit) => fruit.past,
            //sortValue: (fruit) => fruit.score,
        },
        {
            label: "Present",
            //render: (fruit) => <div className={`p-3 m-2 ${fruit.color}`} />,
            render: (fruit) => fruit.present,
        },
        {
            label: "Future",
            render: (fruit) => fruit.future,
            //sortValue: (fruit) => fruit.score,
        },
    ];

    /* I gonna put the burden of coming up with a key on the developer who is using <Table /> component.
      Because I really can't assume what properties will have data that passes inside of a <Table /> component.
      For this purpose I created this function being used to generate a key.
    */
    const keyFn = (fruit) => {
        return fruit.name;
    };

    return (
        <div className={styles.content}>
            {/*<SortableTable data={data} config={config} keyFn={keyFn} />*/}
            <Table data={data} config={config} keyFn={keyFn} />
        </div>
    );
}

export default TensesPage;
