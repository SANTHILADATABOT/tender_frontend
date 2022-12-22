import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login/Login";
import Masterlayout from "./components/Masterlayout";
import Dashboard from "./components/Dashboard";
import Tendertracker from "./components/tender/Tendertracker/Tendertracker";
import Tendercreation from "./components/tender/Tendercreation/Tendercreation";
import Legacystatement from "./components/tender/Legacystatement/Legacystatement";
import Bidmanagement from "./components/tender/Bidmanagement/Bidmanagement";
import Test from "./components/tender/test/test";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/tender" element={<Masterlayout />}>
          <Route index element={<Dashboard />} />
          <Route path="tendertracker" element={<Tendertracker />} />
          <Route path="tendercreation" element={<Tendercreation />} />
          <Route path="legacystatement" element={<Legacystatement />} />
          <Route path="bidmanagement" element={<Bidmanagement />} />
          <Route path="test/:id" element={<Test />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
