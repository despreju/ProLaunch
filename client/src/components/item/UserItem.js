import React, {Fragment, useState} from 'react'
import '../css/UserItem.css';
import Option from  '../tool/Option.js';
import API from "../../utils/API.js";

const UserItem = (props) => {

    const [user, setUser] = useState(props.data);

    const remove = async () => {                
        try {
            const { data } = await API.deleteUser(user.email);            
        } catch (error) {
            console.log(error);
        }
    };

    const setAdmin = async () => {
        try {
            console.log(user.level);
            const email = user.email;
            var level = "admin";
            if (user.level === "admin") level = "user";            
            const { data } = await API.setAdmin({email, level});   
            setUser({...user ,level:level});
        } catch (error) {
            console.log(error);
        }
    }

    const back = () => {
        props.back();
    }

    return ( 
        <div className="backgroundItem">
            <div className="userItem" key={user.id}>
                {user.level === "admin" ?
                    <Option back={back} remove={remove} setUser={setAdmin}></Option> :
                    <Option back={back} remove={remove} setAdmin={setAdmin}></Option> 
                }
                <i className="fas fa-user"></i>
                <div className='infos'>
                    <p className='name'>Nom : {user.name}</p>
                    <p className='email'>Email : {user.email}</p>
                    <p className='level'>Niveau : {user.level}</p>
                </div>
            </div>
        </div>
    )

}

export default UserItem;