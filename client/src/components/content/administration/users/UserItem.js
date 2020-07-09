import React, {Fragment, useState} from 'react'
import './UserItem.css';
import Option from  '../../Option.js';

const UserItem = (props) => {

    const [isRemoved, setIsRemoved] = useState(false);

    return ( 
        <Fragment>
            {!isRemoved &&       
            <li className="item" key={props.id}>
                <i className="fas fa-user"></i>
                <div className='infos'>
                    <p className='name'>{props.name}</p>
                    <p className='email'>{props.email}</p>
                </div>
                <Option itemType="user" itemId={props.id} itemName={props.email} delete={setIsRemoved} edit={true}/>
            </li>}
        </Fragment>
    )

}

export default UserItem;