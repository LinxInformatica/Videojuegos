import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useSelector } from "react-redux";

import './App.css'
import Landing from "./Views/Landing/Landing";
import Form from "./Views/Form/Form";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Views/Home/Home";
import Details from "./Views/Details/Details";
import Loader from "../src/Components/Loader/Loader"
import SITEROUTES from "./helpers/siteroutes.helper";

function App() {
  const loading = useSelector((state) => state.loading)
  return (

    <div className="App">

      <BrowserRouter>
        {loading
          ? <Loader />
          : (<>
            <Navbar />
            <Routes>
              <Route path={SITEROUTES.LANDING} Component={Landing} />
              <Route path={SITEROUTES.HOME} Component={Home} />
              <Route path={SITEROUTES.FORM} Component={Form} />
              <Route path={SITEROUTES.DETAILS} Component={Details} />

            </Routes>
          </>)
        }
      </BrowserRouter>
    </div>
  );
}
export default App
