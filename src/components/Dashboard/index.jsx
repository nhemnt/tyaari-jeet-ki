import React, { useState } from 'react'
import { FeatureFlags } from '../../contexts/FeatureFlags';
import { ThemeContext } from '../../contexts/ToggleTheme';

const Dashboard = ({ children }) => {
    const [toggle, setToggle] = useState(true);
    const { features, toggleFeature } = React.useContext(FeatureFlags);
    const { theme } = React.useContext(ThemeContext)

    return (
        <div className={`container-fluid height ${theme} my-app`}>
            <div className='row'>
                <nav className={`col-md-${toggle ? "1" : "2"} my-app__navbar d-md-block`} style={{
                    height: "100%"
                }}>
                    <button className='btn btn-secondary ms-auto mt-3' onClick={() => setToggle(prev => !prev)}>{toggle ? "+" : "-"}</button>
                    <ul className='nav flex-column'>
                        {Object.entries(features).map(([key, val]) => {
                            return (<li key={key} className='nav-item'>{key} <input type="checkbox" className='checkbox' value={val} onChange={() => toggleFeature(key, !val)} /></li>)
                        })}
                    </ul>
                </nav>
                <main role="main" className={`col-md-${toggle ? "11" : "10"} px-md-4`} >
                    <div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom'>
                        <h1 className="h2">Interview Practice</h1>
                    </div>
                    {children}
                </main>
            </div>
        </div>
    )
}

export default Dashboard