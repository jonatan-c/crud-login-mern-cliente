import React, { useContext } from "react";
import Tarea from "./Tarea";
import proyectoContext from "../../context/proyectos/proyectoContext";
import tareaContext from "../../context/tareas/tareaContext";

const ListadoTareas = () => {
  //Extraer proyectos de state inicial
  const proyectosContext = useContext(proyectoContext);
  const { proyecto, eliminarProyecto } = proyectosContext;

  // Obtener las tareas del proyecto
  const tareasContext = useContext(tareaContext);
  const { tareasproyecto } = tareasContext;

  // si no hay proyectos seleccionado , primera vez no hay nada .
  if (!proyecto) return <h2>Selecciona un proyecto</h2>;

  // array destructuring para extraer el proyecto actual, recordar que es por posicion, no importa el nombre
  const [proyectoAcual] = proyecto;

  // Eliminar un proyecto
  const onClickEliminar = () => {
    eliminarProyecto(proyectoAcual._id);
  };

  // console.log(tareasproyecto);
  return (
    <>
      <h2>Proyecto : {proyectoAcual.nombre}</h2>

      <ul>
        {tareasproyecto.length === 0 ? (
          <li>
            <p>No hay taraes</p>
          </li>
        ) : (
          tareasproyecto.map((tarea) => <Tarea key={tarea.id} tarea={tarea} />)
        )}
      </ul>

      <button
        type="button"
        className="button delete-proyect"
        onClick={onClickEliminar}
      >
        Eliminar Proyecto
      </button>
    </>
  );
};

export default ListadoTareas;
