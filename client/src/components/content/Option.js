import React from 'react'

const Option = (props) => {

    const deleteThis = () => {
        console.log(props);
    };

    return (
        <div className="option">            
            <i class="fas fa-edit"></i>
            <i class="fas fa-trash-alt" onClick={deleteThis}></i>
        </div>
    )
}

export default Option;
