import React from 'react';
import clasees from './BuildControl.css'
const buildControl = (props) => (
    <div className={clasees.BuildControl}>
        <div className={clasees.Label}>{props.label}</div>
        <button 
        className={clasees.Less} 
        onClick={props.removed} 
        disabled={props.disabled}>Less
        </button>
        <button className={clasees.More} onClick={props.added}>More</button>
    </div>
)


export default buildControl;    