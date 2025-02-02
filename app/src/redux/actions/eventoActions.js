import {
    GET_EVENTOS,
    GET_EVENTO,
    GET_MIS_EVENTOS,
    INSERTAR_EVENTO,
    MODIFICAR_EVENTO,
    ELIMINAR_EVENTO,
    CAMBIAR_ESTADO_EVENTO,
    GET_EVENTOS_CATEGORIA,
    GET_EVENTOS_GUARDADOS,
    GET_EVENTOS_MENSAJES,
    GET_MENSAJES,
    GET_EVENTOS_PROXIMOS
  } from "./constants/actionsTypes";
  import axios from "axios";
  
  const getEvento = id => {
    return dispatch => {
      return axios
        .get(`eve/evento/byId/${id}`)
        .then(res => {
          console.log(res.data)
          dispatch({
            type: GET_EVENTO,
            evento: res.data.evento
          });
        })
        .catch(err => {
          console.log(err);
        });
    };
  };
  
  const getEventos = data => {
    return dispatch => {
      return axios
        .get(`eve/evento/${data}`)
        .then(res => {
          dispatch({
            type: GET_EVENTOS,
            eventos 
          });
        })
        .catch(err => {
          console.log(err);
        });
    };
  };
  const getMisEventos = () => {
    return dispatch => {
      return axios
        .get(`eve/evento/byUser`)
        .then(res => {
          dispatch({
            type: GET_MIS_EVENTOS,
            misEventos:res.data.eventos
          });
        })
        .catch(err => {
          console.log(err);
        });
    };
  };

  const getEventosProximos = data => {
    console.log(data)
    return dispatch => {
      return axios
        .get(`eve/evento/proximos`)
        .then(res => {
          dispatch({
            type: GET_EVENTOS_PROXIMOS,
            eventosProximos:res.data.eventos 
          });
        })
        .catch(err => {
          console.log(err);
        });
    };
  };

  const getEventosGuardados = () => {
    return dispatch => {
      return axios
        .get(`user/eventosGuardados`)
        .then(res => {
          console.log(res.data)
          dispatch({
            type: GET_EVENTOS_GUARDADOS,
            eventosGuardados:res.data.eventos
          });
        })
        .catch(err => {
          console.log(err);
        });
    };
  };


const getEventosCategoria = (idCategoria, x) => {
  console.log(idCategoria, x)
  return dispatch => {
    return axios
      .get(`eve/evento/byCategoria/${idCategoria}/${x.latitude}/${x.longitude}`)
      .then(res => {
        console.log(res.data)
        dispatch({
          type: GET_EVENTOS_CATEGORIA,
          eventoCategoria :res.data.evento
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
};
  
const getEventosMensajes = () => {
  return dispatch => {
    return axios
      .get(`eve/evento/getEventosMensajes/`)
      .then(res => {
        console.log(res.data)
        dispatch({
          type: GET_EVENTOS_MENSAJES,
          eventosMensajes :res.data.evento
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
};

const getMensajes = (idEvento) => {
  return dispatch => {
    return axios
      .get(`men/mensaje/evento/${idEvento}`)
      .then(res => {
        console.log(res.data)
        dispatch({
          type: GET_MENSAJES,
          mensajes :{mensajes:res.data.mensaje, evento:res.data.evento}
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
};


const insertarEvento = evento => {
  return dispatch => {
    return axios
      .post(`eve/evento`, { ...evento })
      .then(res => {
        dispatch({
          type: INSERTAR_EVENTO,
          evento: res.data.evento
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
};
  
const modificarEvento = evento => {
  return dispatch => {
    return axios
      .put(`eve/evento`, { ...evento })
      .then(res => {
        dispatch({
          type: MODIFICAR_EVENTO,
          evento: res.data.evento
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
};
const eliminarEvento = id => {
  return dispatch => {
    return axios
      .del(`eve/evento`, { id })
      .then(res => {
        dispatch({
          type: ELIMINAR_EVENTO,
          evento: res.data.evento
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
};
const cambiarEstadoEvento = id => {
  return dispatch => {
    return axios
      .del(`eve/evento`, { id })
      .then(res => {
        dispatch({
          type: CAMBIAR_ESTADO_EVENTO,
          evento: res.data.evento
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
};
  
  
  export {
    getEvento,
    getEventos,
    getMisEventos,
    getEventosProximos,
    insertarEvento,
    modificarEvento,
    eliminarEvento,
    cambiarEstadoEvento,
    getEventosCategoria,
    getEventosGuardados,
    getEventosMensajes,
    getMensajes
  };
  