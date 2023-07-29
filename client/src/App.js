import Detail from "./views/Detail/Detail";
import Form from "./views/Form/Form";
import Home from "./views/Home/Home";
import Landing from "./views/Landing/Landing";
import { Route, Routes, useLocation } from "react-router-dom";

function App() {
  const { pathname } = useLocation();
  return (
    <div className="App">
      {pathname === "/" && <Landing />}
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/create" element={<Form />} />
      </Routes>
    </div>
  );
}

export default App;

