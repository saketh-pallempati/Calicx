import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Marks from './Marks';
import Branch from './Branch'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route exact path='/' element={<App />} />
        <Route exact path='/marks/:id' element={<Marks />} />
        <Route exact path='/Branch' element={<Branch />} />
      </Routes>
    </Router>
  </React.StrictMode >,
)
