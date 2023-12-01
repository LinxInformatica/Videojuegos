import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useSelector } from "react-redux";

import './App.css'
import Landing from "./Views/Landing/Landing";
import Form from "./Views/Form/Form";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Views/Home/Home";
import Details from "./Views/Details/Details";
import AddFilters from "./Views/AddFilters/AddFilters"

import SITEROUTES from "./helpers/siteroutes.helper";

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
              <Route path={SITEROUTES.ADD_FILTERS} element={<AddFilters />} />


            </Routes>
          </>)}
      </BrowserRouter>
    </div >
  );
}
export default App
