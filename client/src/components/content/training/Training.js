import React, { useEffect, useState, Fragment } from 'react';
import API from "../../../utils/API.js";
import './Training.css';
import Tuile from '../Tuile';

function Training() {

    return (     
        <Fragment>
            <div>
                <Tuile logo={'fas fa-wrench'} class={'userList'} title={'En cours ...'} active={false}/>
                <Tuile logo={'fas fa-wrench'} class={'userList'} title={'En cours ...'} active={false}/>
            </div>
            <div>
                <Tuile logo={'fas fa-wrench'} class={'userList'} title={'En cours ...'} active={false}/>
                <Tuile logo={'fas fa-wrench'} class={'userList'} title={'En cours ...'} active={false}/>
            </div>
        </Fragment>
    )
 
}

export default Training;

/* const [data, setData] = useState([]);

useEffect(() => {
    const fetchData = async () => {
        const result = await API.getAllUsers();
        setData(result.data);
    };
    fetchData();
});

return (     
    <div className='admin'>      
    {data.map((user) => <p key={user.id}>{user.name} {user.email}</p>)}     
    </div>
) */