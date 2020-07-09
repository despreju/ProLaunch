import React from 'react'
import API from "../../utils/API.js";
import './Option.css';

const Option = (props) => {

    const deleteThis = async () => {     
        console.log('[delete]', props.itemType, props.itemName);           
        try {
            if (props.itemType === "exercise") {
                const name = props.itemName;
                const { data } = await API.deleteExercise({name});
            } 
            if (props.itemType === "user") {
                const email = props.itemName;
                const { data } = await API.deleteUser({email});
            }
            props.delete(true);  
        } catch (error) {
            console.log(error);
        }
    };

    const editThis =  () => {        
        console.log('[edit]', props.itemType, props.itemName);        
    };

    const validThis =  () => {        
        props.valid();
    };

    const backThis =  () => {        
        props.back();
    };

    return (
        <div className="option">            
            {props.edit && <i className="fas fa-edit" onClick={editThis}></i>}
            {props.delete && <i className="fas fa-trash-alt" onClick={deleteThis}></i>}
            {props.valid && <i className="far fa-check-circle" onClick={validThis}></i>}
            {props.back && <i className="far fa-times-circle" onClick={backThis}></i>}
        </div>
    )
}

export default Option;
