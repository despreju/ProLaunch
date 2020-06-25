import React, {useEffect, useState} from 'react'
import API from "../../../../utils/API.js";
import './UsersList.css';

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
                    <li key={user.id}>
                        <i className="fas fa-user"></i>
                        <div className='infos'>
                            <p className='name'>{user.name}</p>
                            <p className='email'>{user.email}</p>
                        </div>
                    </li>)}
            </ul>
        </div>
    )
}

export default UsersList