import React, { useEffect, useState, Fragment } from 'react';
import API from "../../../utils/API.js";
import './Statistics.css';
import Element from '../Element';

function Statistics() {

    return (     
        <Fragment>
            <div>
                <Element logo={'fas fa-users'} class={'userList'} title={'Utilisateurs'} active={true}/>
                <Element logo={'fas fa-wrench'} class={'userList'} title={'En cours ...'} active={false}/>
            </div>
            <div>
                <Element logo={'fas fa-wrench'} class={'userList'} title={'En cours ...'} active={false}/>
                <Element logo={'fas fa-wrench'} class={'userList'} title={'En cours ...'} active={false}/>
            </div>
        </Fragment>
    )
 
}

export default Statistics;

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