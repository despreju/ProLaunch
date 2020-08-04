import React from 'react'
import '../css/Option.css';
import {Link} from 'react-router-dom';
const Option = (props) => {

    return (
        <div className="option">
            {props.back && <div onClick={props.back}><i className="fas fa-long-arrow-alt-left"></i><p>Retour</p></div>}            
            {props.edit && <div onClick={props.edit}><i className="fas fa-edit"></i><p>Modifier</p></div>}
            {props.remove && <div onClick={props.remove}><i className="fas fa-trash-alt"></i><p>Supprimer</p></div>}
            {props.valid && <div onClick={props.valid}><i className="far fa-check-circle"></i><p>Valider</p></div>}            
            {props.setAdmin && <div onClick={props.setAdmin}><i className="fas fa-chevron-circle-up"></i><p>Définir comme administrateur</p></div>}
            {props.setUser && <div onClick={props.setUser}><i className="fas fa-chevron-circle-down"></i><p>Définir comme utilisateur</p></div>}
            {props.start &&
                <Link to="/run"> 
                    <div onClick={props.start}><i className="fas fa-play"></i><p>Lancer l'entrainement</p></div>
                </Link>
            }
        </div>
    )
}

export default Option;