import React, {createContext,  useState} from 'react'

export const MenuContext = createContext();

const MenuContextProvider = (props) => {

    const [menuItemSelected, setMenuItemSelected] = useState("");
  
    const handleSetMenuItemSelected = (event) => {
        console.log('click');
      setMenuItemSelected(event.target.getAttribute('data-tab'));
    }
  
    return (
        <MenuContext.Provider value={{menuItemSelected,handleSetMenuItemSelected}}>
            {props.children}
        </MenuContext.Provider>  
    )
}

export default MenuContextProvider;