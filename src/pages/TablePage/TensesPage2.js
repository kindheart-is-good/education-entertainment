import SortableTable from "../../components/Table/SortableTable";
import Table from "../../components/Table/Table";
import styles from "../CardLibrary/CardLibrary.module.css";
import Accordion from "../../components/Accordion/Accordion";

function TensesPage2() {
    const data = [
        { name: "Past", color: "bg-orange-500",
            simple: 'Это время используется для описания действий или событий, которые произошли в определенное время в прошлом.',
            continuous: 'Это время используется для описания действий, которые происходили в определенный момент в прошлом или в течение определенного периода времени в прошлом. (They were playing football when it started raining.)',
            perfect: 'Это время используется для описания действия, которое произошло до другого действия в прошлом, выступая как "действие, совершенное до какого-то момента в прошлом". (She had already eaten when I arrived.)',
            perf_cont: 'Это время используется для описания действия, которое началось и продолжалось в прошлом до определенного момента в прошлом. (She had been working at the company for five years before she got promoted.)'},
        { name: "Present", color: "bg-red-500",
            simple: 'Это время используется для выражения действий, фактов или общих истин, которые происходят регулярно, постоянно или не зависят от времени.',
            continuous: 'Это время используется для выражения действий, которые происходят в момент речи или в определенный период времени вокруг нее.',
            perfect: 'Это время используется для связи между прошлым и настоящим, чтобы описать действия, которые произошли в прошлом, но имеют значение или отношение к настоящему времени.',
            perf_cont: 'Это время используется для выражения действия, которое началось в прошлом, продолжается в настоящем и, возможно, будет продолжаться в будущем, подчеркивая длительность действия.'},
        { name: "Future", color: "bg-yellow-500",
            simple: 'Это время используется для выражения действий или событий, которые произойдут в будущем без указания на точное время.',
            continuous: 'Это время используется для описания действий, которые будут продолжаться в определенный момент в будущем.',
            perfect: 'Это время используется для описания действия, которое будет завершено к определенному моменту в будущем.',
            perf_cont: 'Это время используется для выражения действия, которое будет продолжаться в течение определенного периода времени в будущем, подчеркивая длительность этого действия к определенному моменту в будущем.'},
    ];

    const item = [
        {
            id: "rigjfg",
            label: "(She finished her work yesterday.)",
            content: "Она закончила свою работу вчера.",
        },
    ];

    const config = [
        {
            label: "%",
            render: (fruit) => fruit.name,
            sortValue: (fruit) => fruit.name,
        },
        {
            label: "Simple",
            //render: (fruit) => fruit.simple,
            render: (fruit) => <div>{fruit.simple}<Accordion items={item} /></div>,
        },
        {
            label: "Continuous",
            //render: (fruit) => <div className={`p-3 m-2 ${fruit.color}`} />,
            render: (fruit) => fruit.continuous,
        },
        {
            label: "Perfect",
            render: (fruit) => fruit.perfect,
            //sortValue: (fruit) => fruit.score,
        },
        {
            label: "Perfect Continuous",
            render: (fruit) => fruit.perf_cont,
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

export default TensesPage2;
