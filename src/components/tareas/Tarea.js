import React, { useContext } from "react";
import proyectoContext from "../../context/proyectos/proyectoContext";
import tareaContext from "../../context/tareas/tareaContext";

const Tarea = ({ tarea }) => {
  //Extraer si un proyecto esta activo
  const proyectosContext = useContext(proyectoContext);
  const { proyecto } = proyectosContext;

  // Obtener la funcion del contexto de tarea
  const tareasContext = useContext(tareaContext);
  const { eliminarTarea, obtenerTareas, actualizarTarea, guardarTareaActual } =
    tareasContext;

  // Extraer el proyecto, es destructuring array, es por posicion no por nombre.
  const [proyectoAcual] = proyecto;

  // Funcion que se ejecuta cuando el usuario presiona el boton de eliminar tarea
  const tareaEliminar = (id) => {
    eliminarTarea(id, proyectoAcual._id);
    obtenerTareas(proyectoAcual.id);
  };

  // Funcion que modifica el estado de las tareas
  const cambiarEstado = (tarea) => {
    if (tarea.estado) {
      tarea.estado = false;
    } else {
      tarea.estado = true;
    }
    actualizarTarea(tarea);
  };

  // Agrega una tarea actual cuando el usuario desea editarla
  const seleccionarTarea = (tarea) => {
    guardarTareaActual(tarea);
  };

  return (
    <>
      <li>
        <div className="task-container">
          <div className="task-title">
            <p>{tarea.nombre}</p>
          </div>
          <div className="task-buttons">
            {tarea.estado ? (
              <button
                type="button"
                className="button"
                onClick={() => cambiarEstado(tarea)}
              >
                Completo
              </button>
            ) : (
              <button
                type="button"
                className="button"
                onClick={() => cambiarEstado(tarea)}
              >
                Incompleto
              </button>
            )}

            <button
              type="button"
              className="button edit"
              onClick={() => seleccionarTarea(tarea)}
            >
              Editar
            </button>
            <button
              type="button"
              className="button delete"
              onClick={() => tareaEliminar(tarea._id)}
            >
              Eliminar
            </button>
          </div>
        </div>
      </li>
    </>
  );
};

export default Tarea;
