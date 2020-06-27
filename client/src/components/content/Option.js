import React from 'react'
import API from "../../utils/API.js";

const Option = (props) => {

    const deleteThis = async () => {     
        console.log('[delete]', props.itemType, props.itemName);   
        const name = props.itemName;
        try {
            if (props.itemType == "exercise") {const { data } = await API.deleteExercise({name});}
            props.remove(true);  
        } catch (error) {
            console.log(error);
        }
    };

    const editThis =  () => {        
        console.log('[edit]', props.itemType, props.itemName);
    };

    return (
        <div className="option">            
            <i className="fas fa-edit" onClick={editThis}></i>
            <i className="fas fa-trash-alt" onClick={deleteThis}></i>
        </div>
    )
}

export default Option;
