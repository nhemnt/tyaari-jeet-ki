import React from 'react'

import Button from './components/Button'
import Dashboard from './components/Dashboard'
import Pokemon from './components/Pokemon'
import Todo from './components/Todo'
import { FeatureFlags } from './contexts/FeatureFlags'
import Splitwise from './components/SplitWise'
import Kanban from './components/Kanban'
import Calculator from './components/Calculator'



function App() {
  const { features } = React.useContext(FeatureFlags);
  return (
    <Dashboard>
      {features.testingButton && <Button text="click me (unit tested)" className="mb-2" />}
      {features.pokemon && <Pokemon />}
      {features.todo && <Todo />}
      {features.splitWise && <Splitwise />}
      {features.kanban && <Kanban />}
      {features.calculator && <Calculator />}
    </Dashboard>
  )
}

export default App
