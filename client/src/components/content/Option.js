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
            {props.back && <div onClick={back}><i className="fas fa-long-arrow-alt-left"></i><p>Retour</p></div>}            
            {props.edit && <div onClick={edit}><i className="fas fa-edit"></i></div>}
            {props.remove && <div onClick={remove}><i className="fas fa-trash-alt"></i><p>Supprimer</p></div>}
            {props.valid && <div onClick={valid}><i className="far fa-check-circle"></i><p>Valider</p></div>}            
            {props.setAdmin && <div onClick={props.setAdmin}><i className="fas fa-chevron-circle-up"></i><p>Définir comme administrateur</p></div>}
            {props.setUser && <div onClick={props.setUser}><i className="fas fa-chevron-circle-down"></i><p>Définir comme utilisateur</p></div>}
        </div>
    )
}

export default Option;
