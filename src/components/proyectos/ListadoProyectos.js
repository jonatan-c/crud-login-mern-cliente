import React, { useContext, useEffect } from "react";
import AlertaContext from "../../context/alertas/alertaContext";
import proyectoContext from "../../context/proyectos/proyectoContext";
import Proyecto from "./Proyecto";

const ListadoProyectos = () => {
  //extrear proyectos de state inicial
  const proyectosContext = useContext(proyectoContext);
  const { mensaje, proyectos, obtenerProyectos } = proyectosContext;

  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertaContext;

  //obtener proyectos cuando carga el componente
  useEffect(() => {
    if (mensaje) {
      //si hay un error
      mostrarAlerta(mensaje.msg, mensaje.categoria);
    }
    obtenerProyectos();
    //eslint-disable-next-line
  }, [mensaje]);

  //revisar si proyectos tiene contenido
  if (proyectos.length === 0)
    return <p>No hay proyectos, comienza creando uno</p>;

  return (
    <>
      <div>
        {alerta ? <div className="alerta-msg-server">{alerta.msg}</div> : null}

        {proyectos.map((proyecto) => (
          <Proyecto key={proyecto._id} proyecto={proyecto} />
        ))}
      </div>
    </>
  );
};

export default ListadoProyectos;
