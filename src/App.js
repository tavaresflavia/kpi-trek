import KpiPage from './pages/KpiPage/KpiPage';
import RequestPage from './pages/RequestPage/RequestPage';
import NotFound from './pages/NotFound/NotFound';
import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/Header/Header';
import HomePage from './pages/HomePage/HomePage';

function App() {
  return (
    <>
      
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/" element = {<HomePage/>}/>
          <Route path="/KPI" element = {<KpiPage/>} />
          <Route path="/Request" element = {<RequestPage/>}/>
          <Route path="*" element = {<NotFound/>} />
          </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;
