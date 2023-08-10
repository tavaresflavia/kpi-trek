import KpiPage from './pages/KpiPage/KpiPage';
import RequestPage from './pages/RequestPage/RequestPage';
import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      
      <BrowserRouter>
        <Routes>
          <Route path="/KPI" element = {<KpiPage/>} />
          <Route path="/Request" element = {<RequestPage/>}/>
          {/* <Route>
          <Route> */}
          </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;
