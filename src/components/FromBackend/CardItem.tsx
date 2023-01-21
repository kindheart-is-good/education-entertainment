import React from 'react';
import styles from "../FromBackend/FromBackend.module.css";
import {IExamplePV} from "../../models/IExamplePV";

interface CardItemProps {
    phrasalVerb: IExamplePV;
}

const CardItem: React.FC<CardItemProps> = ({ phrasalVerb }) => {
    return (
        <div className={styles.card}>
            <p><span>exampleId:</span> {phrasalVerb.exampleId}</p>
            <p><span>exampleFull:</span> {phrasalVerb.exampleFull}</p>
            <p><span>exampleFullUnderscore:</span> {phrasalVerb.exampleFullUnderscore}</p>
            <p><span>exampleParticle:</span> {phrasalVerb.exampleParticle}</p>
            <p><span>exampleVerb:</span> {phrasalVerb.exampleVerb}</p>
            <p><span>meaning:</span> {phrasalVerb.meaning}</p>
            <p><span>verb:</span> {phrasalVerb.verb}</p>
            <p><span>verbAndParticle:</span> {phrasalVerb.verbAndParticle}</p>
        </div>
    );
};

export default CardItem;