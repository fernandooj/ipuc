import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  REGISTER_REQUEST,
  REGISTER_SUCCEES,
  REGISTER_FAILURE,
  GET_PERFIL,
  GET_USUARIO,
  GET_ACTIVIDAD,
  GET_NOVEDADES,
  GET_SEGUIDORES,
  GET_NOTIFICACION,
  GET_LIBROS_DESEADOS,
  GET_TOKENPHONE,
  GET_RESUMEN,
  RECUPERAR_CONTRASENA,
  CAMBIAR_CONTRASENA
} from "../actions/constants/actionsTypes";

const loginFailure = (state = false, action) => {
  switch (action.type) {
    case LOGIN_FAILURE:
      return action.error;
    default:
      return state;
  }
};

const getCerrarSesion = (state = false, action) => {
  switch (action.type) {
    case GET_PERFIL:
      return action.usuario;
    default:
      return state;
  }
};

const loginRequest = (state = null, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return action.user;
    default:
      return state;
  }
};

 

const loginSuccess = (state = false, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return action.user;
    default:
      return state;
  }
};

const getLibrosDeseados = (state = [], action) => {
  switch (action.type) {
    case GET_LIBROS_DESEADOS:
      return action.libros;
    default:
      return state;
  }
};

const recuperarContrasena = (state = null, action) => {
  switch (action.type) {
    case RECUPERAR_CONTRASENA:
      return action.code;
    default:
      return state;
  }
};

const cambiarContrasena = (state = null, action) => {
  switch (action.type) {
    case CAMBIAR_CONTRASENA:
      return action.code;
    default:
      return state;
  }
};

const getPerfil = (state = {}, action) => {
  switch (action.type) {
    case GET_PERFIL:
      return action.perfil;
    default:
      return state;
  }
};
const getUsuario = (state = [], action) => {
  switch (action.type) {
    case GET_USUARIO:
      return action.usuario;
    default:
      return state;
  }
};
const getResumen = (state = {puntaje: 0, totalLibros: 0, librosActivos: 0, vendidos: 0, comprados: 0}, action) => {
  switch (action.type) {
    case GET_RESUMEN:
      return action.resumen;
    default:
      return state;
  }
};

const getNotificacion = (state = [], action) => {
  switch (action.type) {
    case GET_NOTIFICACION:
      return action.notificacion;
    default:
      return state;
  }
};

const getInfoToken = (state = [], action) => {
  switch (action.type) {
    case GET_TOKENPHONE:
      return action.tokenPhone;
    default:
      return state;
  }
};

export default function authServiceReducer(state = {}, action) {
  return {
    loginFailure:       loginFailure(state.loginFailure, action),
    loginRequest:       loginRequest(state.loginRequest, action),
    loginSuccess:       loginSuccess(state.loginSuccess, action),
    getCerrarSesion:    getCerrarSesion(state.cerrarSesion, action),
    recuperarContrasena:recuperarContrasena(state.recuperarContrasena, action),
    cambiarContrasena:  cambiarContrasena(state.cambiarContrasena, action),
    usuario:            getUsuario(state.usuario, action),
    perfil:             getPerfil(state.perfil, action),
    resumen:            getResumen(state.resumen, action),
    notificacion:       getNotificacion(state.notificacion, action),
    getLibrosDeseados:  getLibrosDeseados(state.getLibrosDeseados, action),
    getInfoToken:       getInfoToken(state.tokenPhone, action)
  };
}
