import { createContext, useReducer } from "react";

export const ThemeContext = createContext();

import React from 'react'

const intialState = {
    theme: "light"
}
const reducer = (state = intialState, action) => {
    switch(action.type){
        case "TOGGLE_THEME": {
            return {
                ...state,
                theme: state.theme === "light" ? "dark" : "light"
            }
        }
    }
}
const ToggleProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, intialState);
    const toggleTheme = () => {
        dispatch({
            type: "TOGGLE_THEME",
        })
    }

  return (
    <ThemeContext.Provider value={{theme: state.theme, toggleTheme}}>{children}</ThemeContext.Provider>
  )
}

export default ToggleProvider