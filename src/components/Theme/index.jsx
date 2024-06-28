import React, { useContext } from 'react'
import { ThemeContext } from  "../../contexts/ToggleTheme";
const Theme = () => {
const {theme, toggleTheme} = useContext(ThemeContext)
  return (
    <button onClick={toggleTheme}>{theme}</button>
  )
}

export default Theme