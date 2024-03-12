import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Expenses from './Expenses'
import ExpenseList from './ExpenseList'
import axios from 'axios';
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import RouteOne from './RouteOne'
import RouteTwo from './RouteTwo'

function App() {

  return(
    <>
      <Routes>
        < Route path='/' element={<RouteOne/>}></Route>
        <Route path='/routetwo' element={<RouteTwo/>}></Route>
      </Routes>
    </>
  );
}

export default App
