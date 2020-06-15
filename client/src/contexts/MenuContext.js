import React, {createContext,  useState} from 'react'
import API from "../utils/API.js";

export const MenuContext = createContext();

const MenuContextProvider = (props) => {

    const [menuItemSelected, setMenuItemSelected] = useState("");
  
    const handleSetMenuItemSelected = (event) => {
      setMenuItemSelected(event.target.getAttribute('data-tab'));
    }
  
    return (
        <MenuContext.Provider value={{menuItemSelected,handleSetMenuItemSelected}}>
            {props.children}
        </MenuContext.Provider>  
    )
}

export default MenuContextProvider;