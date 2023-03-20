import { Route, Routes } from "react-router-dom";
import Home from "./views/home";
import Undeads from "./views/undeads";
import MainLayout from "./layouts/main";

function App() {
  return (
    
      <MainLayout>
        <Routes>
          <Route path="/" exact element={<Home/>} />
          <Route path="/undeads" exact element={Undeads} />
        </Routes>
     </MainLayout>
  );
}

export default App;