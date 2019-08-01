import {
  GET_CATEGORIAS,
  GET_CATEGORIA,
  INSERTAR_CATEGORIA,
  MODIFICAR_CATEGORIA,
  ELIMINAR_CATEGORIA,
  ACTIVAR_CATEGORIA,
  DESACTIVAR_CATEGORIA,
  GET_EVENTOS_CATEGORIA
} from "../actions/constants/actionsTypes";

const getCategorias = (state = [], action) => {
  switch (action.type) {
    case GET_CATEGORIAS:
      return action.categorias;
    default:
      return state;
  }
};

const getCategoria = (state = [], action) => {
  switch (action.type) {
    case GET_CATEGORIA:
      return action.categoria;
    default:
      return state;
  }
};

const insertarCategoria = (state = null, action) => {
  switch (action.type) {
    case INSERTAR_CATEGORIA:
      return action.categoria;
    default:
      return state;
  }
};

const modificarCategoria = (state = null, action) => {
  switch (action.type) {
    case MODIFICAR_CATEGORIA:
      return action.categoria;
    default:
      return state;
  }
};

const eliminarCategoria = (state = null, action) => {
  switch (action.type) {
    case ELIMINAR_CATEGORIA:
      return action.categoria;
    default:
      return state;
  }
};

const activarCategoria = (state = [], action) => {
  switch (action.type) {
    case ACTIVAR_CATEGORIA:
      return action.categoria;
    default:
      return state;
  }
};

const desactivarCategoria = (state = [], action) => {
  switch (action.type) {
    case DESACTIVAR_CATEGORIA:
      return action.categoria;
    default:
      return state;
  }
};
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
    categoria:           getCategoria(state.categoria, action),
    categorias:          getCategorias(state.categorias, action),
    categoriaActivda:    activarCategoria(state.categoriaActivada, action),
    categoriaEliminada:  eliminarCategoria(state.categoriaEliminada, action),
    categoriaInsertada:  insertarCategoria(state.categoriaInsertada, action),
    categoriaModificada: modificarCategoria(state.categoriaModificada, action),
    categoriaDesactivda: desactivarCategoria(state.categoriaDesctivada, action),
    eventoCategoria:     getEventosCategoria(state.eventoCategoria, action)
  };
}
