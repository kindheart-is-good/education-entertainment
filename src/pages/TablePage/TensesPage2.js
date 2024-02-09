import cn from 'classnames';
import SortableTable from "../../components/Table/SortableTable";
import Table from "../../components/Table/Table";
import styles from "../TablePage/TensesPage.module.css";

function TensesPage2() {
    const data = [
        { name: "Past", color: "bg-orange-500",
            simple: 'Это время используется для описания действий или событий, которые произошли в определенное время в прошлом.',
            continuous: 'Это время используется для описания действий, которые происходили в определенный момент в прошлом или в течение определенного периода времени в прошлом.',
            perfect: 'Это время используется для описания действия, которое произошло до другого действия в прошлом, выступая как "действие, совершенное до какого-то момента в прошлом".',
            perf_cont: 'Это время используется для описания действия, которое началось и продолжалось в прошлом до определенного момента в прошлом.',
            simpleExample: 'She finished her work yesterday.',
            simpleBuild: 'V2',
            simpleBuildQ: 'Question:' + '     ' + 'did + V ?',
            continuousExample: 'They were playing football when it started raining.',
            continuousBuild: 'to be (was, were) + V ing',
            continuousBuildQ: '',
            perfectExample: 'She had already eaten when I arrived.',
            perfectBuild: 'had + V3',
            perfectBuildQ: '',
            perf_contExample: 'She had been working at the company for five years before she got promoted.',
            perf_contBuild: 'had been + V ing',
            perf_contBuildQ: '',
            pastIndex: 0,
            item: [
                {id: "rigjfg",
                label: "She finished her work yesterday.",
                content: "Она закончила свою работу вчера."},
                {id: "rigjf",
                label: "dummy для теста",
                content: "dummy для теста"},
            ]
        },
        { name: "Present", color: "bg-red-500",
            simple: 'Это время используется для выражения действий, фактов или общих истин, которые происходят регулярно, постоянно или не зависят от времени.',
            continuous: 'Это время используется для выражения действий, которые происходят в момент речи или в определенный период времени вокруг нее.',
            perfect: 'Это время используется для связи между прошлым и настоящим, чтобы описать действия, которые произошли в прошлом, но имеют значение или отношение к настоящему времени.',
            perf_cont: 'Это время используется для выражения действия, которое началось в прошлом, продолжается в настоящем и, возможно, будет продолжаться в будущем, подчеркивая длительность действия.',
            simpleExample: 'I eat breakfast every morning.',
            simpleBuild: 'V / Vs',
            simpleBuildQ: "Question:\r\ndo / does + V ?",
            continuousExample: 'She is reading a book right now.',
            continuousBuild: 'to be (am, is, are) + V ing',
            continuousBuildQ: '',
            perfectExample: 'I have visited Paris. (Здесь акцент на опыте поездки в Париж, который имеет значение в настоящем.)',
            perfectBuild: 'have / has + V3',
            perfectBuildQ: '',
            perf_contExample: 'I have been studying English for two hours.',
            perf_contBuild: 'have / has + V ing',
            perf_contBuildQ: '',
        },
        { name: "Future", color: "bg-yellow-500",
            simple: 'Это время используется для выражения действий или событий, которые произойдут в будущем без указания на точное время.',
            continuous: 'Это время используется для описания действий, которые будут продолжаться в определенный момент в будущем.',
            perfect: 'Это время используется для описания действия, которое будет завершено к определенному моменту в будущем.',
            perf_cont: 'Это время используется для выражения действия, которое будет продолжаться в течение определенного периода времени в будущем, подчеркивая длительность этого действия к определенному моменту в будущем.',
            simpleExample: 'I will call you later.',
            simpleBuild: 'will / shall + V',
            simpleBuildQ: '',
            continuousExample: 'This time tomorrow, I will be flying to New York.',
            continuousBuild: 'will be + V ing',
            continuousBuildQ: '',
            perfectExample: 'By next year, I will have graduated from university.',
            perfectBuild: 'will have + V3',
            perfectBuildQ: '',
            perf_contExample: 'By next summer, I will have been living in this city for ten years.',
            perf_contBuild: 'will have been + V ing',
            perf_contBuildQ: '',
        },
    ];

    const ite = [
        {
            simple: [
                {id: "s", label: "She finished her work yesterday.", content: "Она закончила свою работу вчера.",},],
            continuous: [
                {id: "c", label: "They were playing football when it started raining.", content: "Они играли в футбол, когда начался дождь.",},]
        },
        {
            simple: [
                {id: "s", label: "She finished her work yesterday.", content: "Она закончила свою работу вчера.",},],
            continuous: [
                {id: "c", label: "They were playing football when it started raining.", content: "Они играли в футбол, когда начался дождь.",},]
        },
    ];

    const item = [
        {
            id: "rigjfg",
            label: "She finished her work yesterday.",
            content: "Она закончила свою работу вчера.",
        },
        {
            id: "rigjf",
            label: "She ",
            content: "Она",
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
            //render: (fruit) => <div className={`p-3 m-2 ${fruit.color}`} />,
            //render: (fruit) => fruit.simple,
            //render: (fruit) => <div>{fruit.simple}<Accordion items={ite[0].simple} /></div>,
            /*render: (fruit) => <div className={cn({
                [styles.a]: fruit.pastIndex === 0,
            })}>{fruit.simple}</div>,*/
            render: (fruit) => (
                <div className={styles.tenseWrapper}>
                    <div className={styles.description}>{fruit.simple}</div>
                    <p className={styles.chapter}>Example:</p>
                    <div>{fruit.simpleExample}</div>
                    <p className={styles.chapter}>Build:</p>
                    <div className={styles.build}>{fruit.simpleBuild}</div>
                    <div className={styles.build}>{fruit.simpleBuildQ}</div>
                </div>),
        },
        {
            label: "Continuous",
            render: (fruit) => (
                <div className={styles.tenseWrapper}>
                    <div className={styles.description}>{fruit.continuous}</div>
                    <p className={styles.chapter}>Example:</p>
                    <div>{fruit.continuousExample}</div>
                    <p className={styles.chapter}>Build:</p>
                    <div className={styles.build}>{fruit.continuousBuild}</div>
                    <div className={styles.build}>{fruit.continuousBuildQ}</div>
                </div>),
        },
        {
            label: "Perfect",
            render: (fruit) => (
                <div className={styles.tenseWrapper}>
                    <div className={styles.description}>{fruit.perfect}</div>
                    <p className={styles.chapter}>Example:</p>
                    <div>{fruit.perfectExample}</div>
                    <p className={styles.chapter}>Build:</p>
                    <div className={styles.build}>{fruit.perfectBuild}</div>
                    <div className={styles.build}>{fruit.perfectBuildQ}</div>
                </div>),
        },
        {
            label: "Perfect Continuous",
            render: (fruit) => (
                <div className={styles.tenseWrapper}>
                    <div className={styles.description}>{fruit.perf_cont}</div>
                    <p className={styles.chapter}>Example:</p>
                    <div>{fruit.perf_contExample}</div>
                    <p className={styles.chapter}>Build:</p>
                    <div className={styles.build}>{fruit.perf_contBuild}</div>
                    <div className={styles.build}>{fruit.perf_contBuildQ}</div>
                </div>),
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
