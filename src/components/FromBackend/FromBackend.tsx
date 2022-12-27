import React, {useEffect, useRef} from "react";
import styles from "./FromBackend.module.css"
import {useAppDispatch, useAppSelector} from "../../hooks/reduxHooks";
import extApiSlice, {addReceivedPV} from "../../store/extApiSlice";
import {IExamplePV} from "../../models/IExamplePV";
import {fetchPVs} from "../../store/actions/extApiActions";

function randomInteger(min: number, max: number) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

const FromBackend: React.FC = () => {
    const dispatch = useAppDispatch();
    //const {addReceivedPV} = extApiSlice.actions;

    const {phrasalVerbs} = useAppSelector(state => state.extApiPage);
    const {lastPV, isLoading, error} = useAppSelector(state => state.extApiPage);

    //const [isActivated, setActivation] = useState(false);
    //const [counter, setCounter] = useState(0);

    let renderCount = useRef(1);
    useEffect(() => {
        renderCount.current++;
        console.log(" ######## THIS IS NEW RENDER: " + renderCount.current);
    })

    const showDebugSection = () => {
        return <div className={styles.debugSection}>
            <p><span>exampleId:</span> {lastPV?.exampleId}</p>
            <p><span>exampleId:</span> {lastPV?.exampleFull}</p>
            <p><span>exampleId:</span> {lastPV?.exampleFullUnderscore}</p>
            <p><span>exampleId:</span> {lastPV?.exampleParticle}</p>
            <p><span>exampleId:</span> {lastPV?.exampleVerb}</p>
            <p><span>exampleId:</span> {lastPV?.meaning}</p>
            <p><span>exampleId:</span> {lastPV?.verb}</p>
            <p><span>exampleId:</span> {lastPV?.verbAndParticle}</p>
        </div>
    }

    const fetchToSampleapis = async (url: string) => {
        await fetch(url)           // в ответ мы получаем Promise
            .then(res => res.json())            // переводим полученный ответ в формат JSON
            .then(data => {console.log(data)})  // получим наши данные
    }

    return (
        <div className={styles.quizWrapper}>

            <div className={styles.top}>
                <button className={styles.buttonOne} onClick={()=>{
                    fetchToSampleapis('https://api.sampleapis.com/beers/ale');
                    fetchToSampleapis('https://jsonplaceholder.typicode.com/posts/1');
                    fetchToSampleapis('https://api.sampleapis.com/coffee/hot');
                }}>
                    From Internet
                </button>
                <button className={styles.buttonOne} onClick={()=>{
                    //fetchToSampleapis('https://localhost:44321/swagger/v1/swagger.json');
                    //fetchToSampleapis('https://localhost:44321/api/Example/GetRandomExampleDetails');
                    //fetchToSampleapis('https://localhost:44321/api/Example/GetListOfExamples');
                    dispatch(fetchPVs());
                    dispatch(addReceivedPV(lastPV));    // срабатывает только после обновления страницы
                }}>
                    From Backend
                </button>
            </div>

            <div className={styles.mid}>
                <div className={styles.card}>
                    {phrasalVerbs[0].verbAndParticle}
                    <br/>
                </div>

                <pre className={styles.card}>
                    {isLoading && <h1>Идет загрузка...</h1>}
                    {error && <h1>{error}</h1>}
                    {JSON.stringify(lastPV, null, 2)}
                </pre>
            </div>

            { showDebugSection() }
        </div>
    )
}

export default FromBackend;