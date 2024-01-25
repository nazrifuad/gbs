import React from "react";
import "./css/main.css";
import HeaderRoutes from "./components/Routes/HeaderRoutes";
import CustomCursor from "./components/Cursor/CustomCursor";

// main
function App({ children }) {
  return (
    <>
      <CustomCursor />
      <main className="main-content">
        <HeaderRoutes />
        {children}
      </main>
    </>
  );
}

export default App;
