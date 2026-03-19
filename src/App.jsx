
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import AddEmployee from './components/AddEmployee'
import EditEmployee from './components/EditEmployee'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/addemployee' element={<AddEmployee />} />
          <Route path='/editemployee/:id' element={<EditEmployee />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
