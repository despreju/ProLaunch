import React from 'react'
import API from "../../utils/API.js";

const Option = (props) => {

    const deleteThis = async () => {     
        console.log('[delete]', props.itemType, props.itemName);   
        const name = props.itemName;
        try {
            if (props.itemType === "exercise") {const { data } = await API.deleteExercise({name});}
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
