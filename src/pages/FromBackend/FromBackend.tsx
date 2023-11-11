import React, {useState, useEffect, useRef} from "react";
import styles from "./FromBackend.module.css";
import {useAppDispatch, useAppSelector} from "../../hooks/reduxHooks";
import extApiSlice, {addReceivedPV, fetchPVfromJsonServer} from "../../store/extApiSlice";
import {fetchPVs} from "../../store/actions/extApiActions";
import CardItem from "../../components/Cards/CardItem";

const FromBackend: React.FC = () => {
    const dispatch = useAppDispatch();
    //const {addReceivedPV} = extApiSlice.actions;

    const {phrasalVerbs} = useAppSelector(state => state.extApiPage);
    //const {lastPV, isLoading, error} = useAppSelector(state => state.extApiPage);
    const {lastPV} = useAppSelector(state => state.extApiPage);
    const {pvFromJsonServer, isLoading, error} = useAppSelector(state => state.extApiPage);

    const [isFromState, setFromState] = useState(false);
    const [isFromBackend, setFromBackend] = useState(false);

    let renderCount = useRef(1);
    useEffect(() => {
        renderCount.current++;
        console.log(" ######## THIS IS NEW RENDER: " + renderCount.current);
    })

    useEffect(() => {
        setFromBackend(true);
    }, [])

    const showDebugSection = () => {
        return <div className={styles.debugSection}>
            <p><span>exampleId:</span> {lastPV?.exampleId}</p>
            <p><span>exampleFull:</span> {lastPV?.exampleFull}</p>
            <p><span>exampleFullUnderscore:</span> {lastPV?.exampleFullUnderscore}</p>
            <p><span>exampleParticle:</span> {lastPV?.exampleParticle}</p>
            <p><span>exampleVerb:</span> {lastPV?.exampleVerb}</p>
            <p><span>meaning:</span> {lastPV?.meaning}</p>
            <p><span>verb:</span> {lastPV?.verb}</p>
            <p><span>verbAndParticle:</span> {lastPV?.verbAndParticle}</p>
        </div>
    }

    const fetchToSampleapis = async (url: string) => {
        await fetch(url)           // в ответ мы получаем Promise
            .then(res => res.json())            // переводим полученный ответ в формат JSON
            .then(data => {console.log(data)})  // получим наши данные
    }

    return (
        <div className={styles.serverAnswer}>

            <div className={styles.top}>
                <button className={styles.buttonOne} onClick={()=>{
                    fetchToSampleapis('https://api.sampleapis.com/beers/ale');
                    fetchToSampleapis('https://jsonplaceholder.typicode.com/posts/1');
                    fetchToSampleapis('https://api.sampleapis.com/coffee/hot');
                }}>
                    From Internet
                    (to console)
                </button>

                <button className={styles.buttonOne} onClick={()=>{
                    setFromState(prev => !prev);
                    dispatch(addReceivedPV(lastPV));    // срабатывает только после обновления страницы
                }}>
                    From State
                </button>

                <button className={styles.buttonOne} onClick={()=>{
                    dispatch(fetchPVfromJsonServer());
                }}>
                    From JSON server
                </button>

                <button className={styles.buttonOne} onClick={()=>{
                    //setFromBackend(prev => !prev);
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
                <pre className={styles.card}>
                    {isLoading && <h1>Идет загрузка...</h1>}
                    {error && <h1>{error}</h1>}
                    {JSON.stringify(lastPV, null, 2)}
                </pre>

                <div style={{ display: 'flex', margin: '50px' }}>
                    {isFromState && <CardItem phrasalVerb={phrasalVerbs[3]} />}

                    <pre style={{ outline: 'solid 6px #fff53d', margin: '50px' }}>
                        {isLoading && <h1>Идёт загрузка...</h1>}
                        {error && <h1>{error}</h1>}
                        {JSON.stringify(pvFromJsonServer, null, 2)}
                    </pre>

                    {(isFromBackend && lastPV) && <CardItem phrasalVerb={lastPV} />}
                </div>
            </div>

            {/*{ showDebugSection() }*/}
        </div>
    )
}

export default FromBackend;