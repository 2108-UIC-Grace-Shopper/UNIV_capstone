import React from "react";
const LoginScreen = () => {
    return (
        <div>
            <div>
                <form action="action_page.php" method="post">
                    <div class="container">
                        <label class="username"><p>Username</p></label>
                        <input type="text" placeholder="Enter Username" name="uname" required/>
                        <label class="password"><p>Password</p></label>
                        <input type="password" placeholder="Enter Password" name="psw" required/>
                        <button type="submit">Login</button>
                        <button type="submit">Register</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default LoginScreen
