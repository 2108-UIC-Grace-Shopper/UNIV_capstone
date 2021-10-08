import React from "react";


const Header = () => {
    return (
    <div class="dropdown">
    <button class="dropbtn">Dropdown</button>
    <div class="dropdown-content">
    <ul id="navigation">
        <li>
          <a href="" class="material-icons md-48 md-dark">home</a>
        </li>
        <li>
          <a href="" target="_blank" class="material-icons md-48 md-dark">account_circle</a>
        </li>
        <li>
          <a href="" target="_blank" class="material-icons md-48 md-dark">login</a>
        </li>
        <li>
            <a href="" target="_blank" class="material-icons md-48 md-dark">store</a>
        </li>
      </ul>
</div>
</div>
    );
}
export default Header
