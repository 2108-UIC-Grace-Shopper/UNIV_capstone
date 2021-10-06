import React from "react";
import ReactDom from "react-dom";

const header = () => {
    
    return (
        <div class="dropdown">
            <button class="dropbtn">Dropdown</button>
            <div class="dropdown-content">
                <ul id="navigation">
                    <li>
                      <a href="https://www.google.com" class="material-icons md-48 md-dark">home</a>
                    </li>
                    <li>
                      <a href="https://www.google.com" target="_blank" class="material-icons md-48 md-dark">account_circle</a>
                    </li>
                    <li>
                      <a href="https://www.google.com" target="_blank" class="material-icons md-48 md-dark">shopping_cart</a>
                    </li>
                    <li>
                        <a href="https://www.google.com" target="_blank" class="material-icons md-48 md-dark">store</a>
                    </li>
                  </ul>
            </div>
          </div>
    );
}
ReactDOM.render(<header/>, document.getElementById("navBar"));