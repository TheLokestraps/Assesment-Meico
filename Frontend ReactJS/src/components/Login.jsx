import { useState } from "react";
import Register from "./Register";

const Login = (props) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://localhost:7012/Users/getMyUser/" + username,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        alert("Usuario encontrado");
        props.setId(username);
        props.setLoggedIn(true);
      } else {
        alert("Usuario no encontrado");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const [username, setUsername] = useState("");
  const [register, setRegister] = useState(false);

  return (
    <div className="AuthPage">
      {register ? (
        <Register setRegister={setRegister} />
      ) : (
        <div>
          <h1>Login</h1>
          <form>
            <div className="Username">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <button type="submit" onClick={handleSubmit}>
              Ingresar
            </button>
          </form>
          <button onClick={() => setRegister(true)}>Registrarse</button>
        </div>
      )}
    </div>
  );
};

export default Login;
