import React, {useEffect, useState} from 'react'
import API from "../../../../utils/API.js";
import Option from "../../Option.js";
import './UsersList.css';
import UserItem from './UserItem.js';

const UsersList = (props) => {

    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await API.getAllUsers();
            setData(result.data);
        };
        fetchData();
    }, []);

    return (     
        <div className='list usersList'>  
            <ul>    
                {data.map((user) =>                                     
                    <UserItem key={user.id} name={user.name} email={user.email}/>)          
                }
            </ul>
        </div>
    )
}

export default UsersList