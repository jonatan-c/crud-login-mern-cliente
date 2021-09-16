import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AlertaContext from "../../context/alertas/alertaContext";
import AuthContext from "../../context/autentificacion/authContext";

const NuevaCuenta = (props) => {
  // context alertas
  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertaContext;
  //coontext auth
  const authContext = useContext(AuthContext);
  const { mensaje, autenticado, registrarUsuario } = authContext;

  // En caso de que el usuario se haya autenticado o registrado o sea un registro duplicado
  useEffect(() => {
    if (autenticado) {
      props.history.push("/proyectos");
    }

    if (mensaje) {
      mostrarAlerta(mensaje.msg, mensaje.categoria);
    }
    //eslint-disable-next-line
  }, [mensaje, autenticado, props.history]);

  const [usuario, setUsuario] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmar: "",
  });
  const { nombre, email, password, confirmar } = usuario;

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
    if (
      nombre.trim() === "" ||
      email.trim() === "" ||
      password.trim() === "" ||
      confirmar.trim() === ""
    ) {
      mostrarAlerta("Todos los campos son obligatorios", "alerta-error");
      return;
    }
    // password minimo de 6 caracteres
    if (password.length < 6) {
      mostrarAlerta(
        "El password debe ser de al menos 6 caracteres",
        "alerta-error"
      );
      return;
    }
    // los 2 passwords deben ser iguales
    if (password !== confirmar) {
      mostrarAlerta("Los passwords no son iguales", "alerta-error");
      return;
    }

    registrarUsuario({ nombre, email, password });
  };

  return (
    <>
      {alerta ? <div>{alerta.msg}</div> : null}
      <h2>NuevaCuenta</h2>

      <form className="container-login" onSubmit={onSubmit}>
        <label htmlFor="nombre">Nombre de usuario</label>
        <input
          type="text"
          className="input-new-user"
          placeholder="Escribe tu nombre"
          id="nombre"
          name="nombre"
          value={nombre}
          onChange={onChange}
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          placeholder="Escribe tu email"
          className="input-new-user"
          id="email"
          name="email"
          value={email}
          onChange={onChange}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="Escribe tu password"
          className="input-new-user"
          id="password"
          name="password"
          value={password}
          onChange={onChange}
        />

        <label htmlFor="confirmar">Confirmar Password</label>
        <input
          type="password"
          placeholder="Escribe tu password"
          className="input-new-user"
          id="confirmar"
          name="confirmar"
          value={confirmar}
          onChange={onChange}
        />

        <input className="button-login" type="submit" value="Registrarse" />
      </form>

      <Link to={"/"}>Volver a Iniciar Sesion</Link>
    </>
  );
};

export default NuevaCuenta;
