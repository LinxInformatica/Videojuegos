import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";

import './App.css'

//!components
import Landing from "./Views/Landing/Landing";
import Form from "./Components/Form/Form";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Views/Home/Home";
import Details from "./Views/Details/Details";
import SelectFilters from "./Views/SelectFilters/SelectFilters";
import SelectOrders from "./Views/SelectOrders/SelectOrders";


import SITEROUTES from "./helpers/siteroutes.helper";
import FormSetup from "./Components/FormSetup/FormSetup";
import Image from "./Components/Image/Image";
import { useEffect } from "react";
import { setLanding } from "./Redux/actions";


function App() {
  const landing = useSelector((state) => state.landing)
  const dispatch=useDispatch()

  useEffect(()=>{
    dispatch(setLanding(true))
  },[dispatch])

  return (

    <div className="App">
      < BrowserRouter >
        {landing ? (
          <Landing />
        ) : (
          <>
            <Navbar />

            <Routes>
              <Route path={SITEROUTES.LANDING} element={<Landing />} />
              <Route path={SITEROUTES.HOME} element={<Home />} />
              <Route path={SITEROUTES.FORM} element={<Form />} />
              <Route path={SITEROUTES.FORM_EDIT} element={<Form />} />
              <Route path={SITEROUTES.DETAILS} element={<Details />} />
              <Route path={SITEROUTES.SELECT_FILTERS} element={<SelectFilters />} />
              <Route path={SITEROUTES.SELECT_ORDERS} element={<SelectOrders />} />
              <Route path={SITEROUTES.FORMSETUP} element={<FormSetup />} />
            </Routes>
          </>)}
      </BrowserRouter>
    </div >
  );
}
export default App
