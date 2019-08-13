import {
  GET_EVENTOS,
  GET_EVENTO,
  GET_EVENTOS_CATEGORIA,
  GET_EVENTOS_GUARDADOS,
  GET_EVENTOS_MENSAJES,
  GET_MENSAJES
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

const getEventosGuardados = (state = [], action) => {
  switch (action.type) {
    case GET_EVENTOS_GUARDADOS:
      return action.eventosGuardados;
    default:
      return state;
  }
};

const getEventosMensajes = (state = [], action) => {
  switch (action.type) {
    case GET_EVENTOS_MENSAJES:
      return action.eventosMensajes;
    default:
      return state;
  }
};

const getMensajes = (state = [], action) => {
  switch (action.type) {
    case GET_MENSAJES:
      return action.mensajes;
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
    evento:           getEvento(state.evento, action),
    eventos:          getEventos(state.eventos, action),
    eventoCategoria:  getEventosCategoria(state.eventoCategoria, action),
    eventosGuardados: getEventosGuardados(state.eventosGuardados, action),
    eventosMensajes:  getEventosMensajes(state.eventosMensajes, action),
    mensajes:         getMensajes(state.mensajes, action)
  };
}
