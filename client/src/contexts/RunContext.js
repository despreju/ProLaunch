import React, {createContext,  useState} from 'react'
import API from "../utils/API.js";

export const RunContext = createContext();

const RunContextProvider = (props) => {

    const [run, setRun] = useState(JSON.parse(localStorage.getItem("run")));

    return (
        <RunContext.Provider value={[run, setRun]}>
            {props.children}
        </RunContext.Provider>  
    )
}

export default RunContextProvider;