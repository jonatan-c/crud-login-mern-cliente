import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AlertaContext from "../../context/alertas/alertaContext";
import AuthContext from "../../context/autentificacion/authContext";

const Login = (props) => {
  // ALERTAS
  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertaContext;
  // LOGIN
  const authContext = useContext(AuthContext);
  const { mensaje, autenticado, iniciarSesion } = authContext;

  // En caso de que el password o usuario no exista
  useEffect(() => {
    if (autenticado) {
      props.history.push("/proyectos");
    }

    if (mensaje) {
      mostrarAlerta(mensaje.msg, mensaje.categoria);
    }
    //eslint-disable-next-line
  }, [mensaje, autenticado, props.history]);

  //state para iniciar sesion
  const [usuario, setUsuario] = useState({
    email: "",
    password: "",
  });

  //extraer un Usuario
  const { email, password } = usuario;

  const onChange = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };

  //Cuando el usuario quiere iniciar sesion.
  const onSubmit = (e) => {
    e.preventDefault();

    // validar campos vacios
    if (email.trim() === "" || password.trim() === "") {
      mostrarAlerta("Todos los campos son obligatorios", "alerta-error");
    }

    //pasarlo al action
    iniciarSesion({ email, password });
    console.log("enviados");
  };

  return (
    <>
      {alerta ? <div>{alerta.msg}</div> : null}
      <h2>Login</h2>
      <div className="container-login">
        <form className="container-login" onSubmit={onSubmit}>
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            className="input-email-login"
            id="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={onChange}
          />

          <label htmlFor="password">Password: </label>
          <input
            type="password"
            className="input-email-password"
            id="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChange}
          />

          <input
            className="button-login"
            type="submit"
            value="Iniciar Sesion"
          />
        </form>
      </div>

      <Link to={"/nueva-cuenta"}>Registrarse</Link>
    </>
  );
};

export default Login;
