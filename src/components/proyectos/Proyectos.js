import React, { useEffect, useContext } from "react";
import Barra from "../layout/Barra";
import SideBar from "../layout/SideBar";
import FormTarea from "../tareas/FormTarea";
import ListadoTareas from "../tareas/ListadoTareas";
import AuthContext from "../../context/autentificacion/authContext";

const Proyectos = () => {
  // Extrear la informacion de autentificacion
  const authContext = useContext(AuthContext);
  const { usuarioAutenticado } = authContext;

  useEffect(() => {
    usuarioAutenticado();
    //eslint-disable-next-line
  }, []);

  return (
    <>
      <Barra />

      <div>
        <div className="row-50">
          <SideBar />
        </div>
        <div className="row-50">
          <FormTarea />

          <ListadoTareas />
        </div>
      </div>
    </>
  );
};

export default Proyectos;
