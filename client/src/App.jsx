import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useSelector } from "react-redux";

import './App.css'

//!components
import Landing from "./Views/Landing/Landing";
import Form from "./Components/Form/Form";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Views/Home/Home";
import Details from "./Views/Details/Details";


import SITEROUTES from "./helpers/siteroutes.helper";

import SelectFilters from "./Views/SelectFilters/SelectFilters";

function App() {
  const loading = useSelector((state) => state.loading)

  return (

    <div className="App">
      < BrowserRouter >
        {loading ? (
          <Landing />
        ) : (
          <>
            <Navbar />

            <Routes>
              <Route path={SITEROUTES.LANDING} element={<Landing />} />
              <Route path={SITEROUTES.HOME} element={<Home />} />
              <Route path={SITEROUTES.FORM} element={<Form />} />
              <Route path={SITEROUTES.DETAILS} element={<Details />} />
              <Route path={SITEROUTES.SELECT_FILTERS} element={<SelectFilters />} />
            </Routes>
          </>)}
      </BrowserRouter>
    </div >
  );
}
export default App
