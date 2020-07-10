import React, {useEffect, useState} from 'react'
import API from "../../../../utils/API.js";
import Option from "../../Option.js";
import './UsersList.css';
import UserItem from './UserItem.js';

const UsersList = (props) => {

    const [data, setData] = useState([]);
    const [displayUser, setDisplayUser] = useState(false);
    const [userData, setDataToLoad] = useState([]);

    //Handle
    const handleSetDisplayUser = (user) => {
        setDataToLoad(user);
        setDisplayUser(!displayUser);
    }  

    useEffect(() => {
        const fetchData = async () => {
            const result = await API.getAllUsers();
            setData(result.data);
        };
        fetchData();
    }, []);

    return (     
        <div className='list usersList'>  
        {displayUser && <UserItem back={setDisplayUser} data={userData}/>}                              
            <ul>    
                {data.map((user) =>
                    <li className="item" key={user.id} onClick={() => handleSetDisplayUser(user)}>
                    <i className="fas fa-user"></i>
                    <div className='infos'>
                        <p className='name'>{user.name}</p>
                        <p className='email'>{user.email}</p>
                    </div>
                </li>
                )}
            </ul>
        </div>
    )
}

export default UsersList