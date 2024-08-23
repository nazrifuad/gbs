// import React from "react";
import PropTypes from "prop-types"; // Add this line to import PropTypes
import "./css/main.css";
import HeaderRoutes from "./components/Routes/HeaderRoutes";
import CustomCursor from "./components/Cursor/CustomCursor";

// main
function App({ children }) {
    // Add prop validation for 'children'
    App.propTypes = {
        children: PropTypes.node,
    };

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
