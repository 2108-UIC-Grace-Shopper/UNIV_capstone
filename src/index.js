import React from "react";
import ReactDOM from "react-dom";
import Header from "./header";
import HomePage from "./homePage";
import loginScreen from "./login";



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