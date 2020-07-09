import React, {createContext,  useState} from 'react'
import API from "../utils/API.js";

export const CredentialContext = createContext();

const CredentialContextProvider = (props) => {

    const [isLogged, {}] = useState(API.isAuth());
    const [profile, {}] = useState({
        name: API.getProfile().name,
        email : API.getProfile().email,
        level : API.getProfile().level       
    });

    return (
        <CredentialContext.Provider value={{isLogged,profile}}>
            {props.children}
        </CredentialContext.Provider>  
    )
}

export default CredentialContextProvider;