import React, { useContext, useEffect } from "react";
import AuthContext from "../../context/autentificacion/authContext";

const Barra = () => {
  const authContext = useContext(AuthContext);
  const { usuario, usuarioAutenticado, cerrarSesion } = authContext;

  useEffect(() => {
    usuarioAutenticado();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="menu-closesesion">
        {usuario ? (
          <p>
            Hola <span className="name">{usuario.nombre}</span>
          </p>
        ) : null}

        <button className="button-close-sesion" onClick={() => cerrarSesion()}>
          Cerrar Sesion
        </button>
      </div>
    </>
  );
};

export default Barra;
