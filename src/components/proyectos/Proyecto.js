import React, { useContext } from "react";
import proyectoContext from "../../context/proyectos/proyectoContext";
import tareaContext from "../../context/tareas/tareaContext";

const Proyecto = ({ proyecto }) => {
  //obtener el state de proyectos
  const proyectosContext = useContext(proyectoContext);
  const { proyectoAcual } = proyectosContext;

  // Obtener la funcion del contexto de tarea
  const tareasContext = useContext(tareaContext);
  const { obtenerTareas } = tareasContext;

  /// Funcion para agregar el proyecto actual
  const seleccionarProyecto = (id) => {
    proyectoAcual(id); // Fijar un proyecto actual
    obtenerTareas(id); // Filtrar las tareas cuando se de click
  };
  return (
    <>
      <button
        type="button"
        className="list-proyects-buttons"
        onClick={() => seleccionarProyecto(proyecto._id)}
      >
        {proyecto.nombre}
      </button>
    </>
  );
};

export default Proyecto;
