import React , { Fragment} from 'react'
import './Gauge.css';

const Gauge = (props) => {

    return (
        <Fragment>
            {props.level === 1 && <div className="gauge one"/>}
            {props.level === 2 && <div className="gauge two"/>}
            {props.level === 3 && <div className="gauge three"/>}
            {props.level === 4 && <div className="gauge four"/>}
            {props.level === 5 && <div className="gauge five"/>}
        </Fragment>
    )
}

export default Gauge;