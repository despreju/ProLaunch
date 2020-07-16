import React, {createContext,  useState} from 'react'
import API from "../utils/API.js";

export const MenuContext = createContext();

const MenuContextProvider = (props) => {

    const [menuSelected, setMenuSelected] = useState(JSON.parse(localStorage.getItem("run")));

    return (
        <MenuContext.Provider value={[menuSelected, setMenuSelected]}>
            {props.children}
        </MenuContext.Provider>  
    )
}

export default MenuContextProvider;