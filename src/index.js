import React from "react";
import ReactDOM from "react-dom";
import Header from "./header";
import HomePage from "./homePage";
import loginScreen from "./login";
import products from "./products";



const App = () => {
    return (
        <div>
        <header>
            <Header/>
        </header>
        <div>
            
        </div>
        </div>
    );
}

ReactDOM.render(<App/>, document.getElementById("app"));