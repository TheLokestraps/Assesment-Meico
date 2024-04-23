import { useState, useEffect } from "react";

const Register = (props) => {
  const [User, SetUser] = useState({});

  useEffect(() => {}, [User]);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (
        User.Name === undefined ||
        User.Email === undefined ||
        User.Phone === undefined
      ) {
        alert("Llene los campos obligatorios");
      } else {
        await fetch("https://localhost:7012/Users/addUser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(User),
        }).then((res) => {
          if (res.ok) {
            alert("Usuario Registrado");
            props.setRegister(false);
          } else {
            alert("Error al registrar");
          }
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="RegisterPage">
      <h1>Registrar</h1>
      <div className="Formulario">
        <span className="Username">
          <label htmlFor="username">Nombre</label>
          <input
            type="text"
            id="username"
            onChange={(e) => SetUser({ ...User, Name: e.target.value })}
            required
          />
        </span>
        <span className="Email">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            onChange={(e) => SetUser({ ...User, Email: e.target.value })}
            required
          />
        </span>
        <span className="Phone">
          <label htmlFor="Phone">Telefono</label>
          <input
            type="number"
            id="phone"
            onChange={(e) => SetUser({ ...User, Phone: e.target.value })}
            required
          />
        </span>
        <span className="Address">
          <label htmlFor="Address">Direccion</label>
          <input
            type="text"
            id="address"
            onChange={(e) => SetUser({ ...User, Address: e.target.value })}
          />
        </span>
        <span className="Company">
          <label htmlFor="Company">Compañia</label>
          <input
            type="text"
            id="company"
            onChange={(e) => SetUser({ ...User, Company: e.target.value })}
          />
        </span>
        <span className="Notes">
          <label htmlFor="Notes">Notas</label>
          <input
            type="text"
            id="notes"
            onChange={(e) => SetUser({ ...User, Notes: e.target.value })}
          />
        </span>
        <button onClick={handleSubmit}>Registrar</button>
      </div>
    </div>
  );
};

export default Register;
