import React from "react";
import { BrowserRouter } from "react-router-dom";
// import Routing from "./routing";
import DashboardLayout from "./layout/Layout";

function App() {
  return (
    <div>
      <BrowserRouter>
        {/* <Routing /> */}
        <DashboardLayout />
      </BrowserRouter>
    </div>
  );
}

export default App;
