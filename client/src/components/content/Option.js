import React from 'react'
import API from "../../utils/API.js";
import './Option.css';

const Option = (props) => {

    const remove = async () => {     
        console.log('[delete]', props.itemType, props.itemName);           
        try {
            if (props.itemType === "exercise") {
                const name = props.itemName;
                const { data } = await API.deleteExercise({name});
            } 
            props.remove(true);  
        } catch (error) {
            console.log(error);
        }
    };

    const edit = () => {        
        console.log('[edit]', props.itemType, props.itemName);   
    };

    const valid = () => {        
        props.valid();
    };

    const back = () => {        
        props.back();
    };

    return (
        <div className="option">            
            {props.edit && <div><i className="fas fa-edit" onClick={edit}></i></div>}
            {props.remove && <div><i className="fas fa-trash-alt" onClick={remove}></i></div>}
            {props.valid && <div><i className="far fa-check-circle" onClick={valid}></i></div>}
            {props.back && <div><i className="far fa-times-circle" onClick={back}></i></div>}
            {props.setAdmin && <div><i className="fas fa-chevron-circle-up" onClick={props.setAdmin}></i>Définir comme administrateur</div>}
            {props.setUser && <div><i className="fas fa-chevron-circle-down" onClick={props.setUser}></i>Définir comme utilisateur</div>}
        </div>
    )
}

export default Option;
