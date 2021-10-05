import React from "react";
import ReactDOM from "react-dom";

const login = () => {
    return (
        <div id="login_screen">
            <div id='containter'>

            </div>
            <div id="login">
                <h1>Login</h1>
                <button>LOGIN</button>
            </div>
        </div>
    )
}
ReactDOM.render(<login/>, document.getElementById("app"))

