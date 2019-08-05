import {
  GET_EVENTOS,
  GET_EVENTO,
  INSERTAR_EVENTO,
  MODIFICAR_EVENTO,
  ELIMINAR_EVENTO,
  ACTIVAR_EVENTO,
  DESACTIVAR_EVENTO,
  GET_EVENTOS_CATEGORIA
} from "../actions/constants/actionsTypes";


const getEvento = (state =null, action) => {
  switch (action.type) {
    case GET_EVENTO:
      return action.evento;
    default:
      return state;
  }
};

const getEventos = (state = [], action) => {
  switch (action.type) {
    case GET_EVENTOS:
      return action.eventos;
    default:
      return state;
  }
};

// const insertarCategoria = (state = null, action) => {
//   switch (action.type) {
//     case INSERTAR_CATEGORIA:
//       return action.categoria;
//     default:
//       return state;
//   }
// };

// const modificarCategoria = (state = null, action) => {
//   switch (action.type) {
//     case MODIFICAR_CATEGORIA:
//       return action.categoria;
//     default:
//       return state;
//   }
// };

// const eliminarCategoria = (state = null, action) => {
//   switch (action.type) {
//     case ELIMINAR_CATEGORIA:
//       return action.categoria;
//     default:
//       return state;
//   }
// };

// const activarCategoria = (state = [], action) => {
//   switch (action.type) {
//     case ACTIVAR_CATEGORIA:
//       return action.categoria;
//     default:
//       return state;
//   }
// };

// const desactivarCategoria = (state = [], action) => {
//   switch (action.type) {
//     case DESACTIVAR_CATEGORIA:
//       return action.categoria;
//     default:
//       return state;
//   }
// };
const getEventosCategoria = (state = [], action) => {
  switch (action.type) {
    case GET_EVENTOS_CATEGORIA:
      return action.eventoCategoria;
    default:
      return state;
  }
};


export default function reducer(state = {}, action) {
  return {
    evento:           getEvento(state.evento, action),
    eventos:          getEventos(state.eventos, action),
    eventoCategoria:     getEventosCategoria(state.eventoCategoria, action)
  };
}
