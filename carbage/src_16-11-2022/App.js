import { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/login/Login";
import Masterlayout from "./components/Masterlayout";
import Dashboard from "./components/Dashboard";
import Tendertracker from "./components/tender/Tendertracker/Tendertracker";
import Tendercreation from "./components/tender/Tendercreation/Tendercreation";
import Legacystatement from "./components/tender/Legacystatement/Legacystatement";
import Bidmanagement from "./components/tender/Bidmanagement/Bidmanagement";
import Test from "./components/tender/test/test";
import { AuthContextProvider } from "./storeAuth/auth-context";
import AuthContext from "./storeAuth/auth-context";
import Master from "./components/master/Master";


function App() {
  const authCtx = useContext(AuthContext);
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/> } />
          {/* {authCtx.isLoggedIn && ( */}
          <Route path="/tender" element={<Masterlayout />}>
            <Route index element={<Dashboard />} />
            <Route path="tendertracker" element={<Tendertracker />} />
            <Route path="tendercreation" element={<Tendercreation />} />
            <Route path="legacystatement" element={<Legacystatement />} />
            <Route path="bidmanagement" element={<Bidmanagement />} />
            <Route path="test/:id" element={<Test />} />
            <Route path="master" element={<Master />} />
          </Route>
          {/* )} */}
        <Route path="*"  element={ <Navigate to="/" />}/>
        </Routes>
       
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;

