import React, {Fragment, useState} from "react";


const logIn = () => {

    const [userEmail, setEmail] = useState("");
    const [userUsername, setUsername] = useState("");
    const [userPassword, setPassword] = useState("");

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/users", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                email: JSON.stringify(userEmail),
                username: JSON.stringify(userUsername),
                password: JSON.stringify(userPassword)
            });

            window.location = "/";
        } catch (err) {
            console.error(err.message)
        }
    }

    
        return <Fragment>
            <div>
            <form onSubmit={handleSubmit}>
              <input
                type="text" 
                className="form-control" 
                value={userEmail} 
                onChange={e => setEmail(e.target.userEmail)}
              />

            <input
                type="text" 
                className="form-control" 
                value={userUsername} 
                onChange={e => setUsername(e.target.userUsername)}
              />
    
              <input
                type="text" 
                className="form-control" 
                value={userPassword} 
                onChange={e => setPassword(e.target.userPassword)}
              />
    
              <button type="submit">Login</button>
            </form>
            <h5>SignUp instead?</h5>

          </div>

        </Fragment>
          
}


export default logIn