import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  REGISTER_REQUEST,
  REGISTER_SUCCEES,
  GET_TOKENPHONE,
  GET_PERFIL,
  GET_ACTIVIDAD,
  GET_NOVEDADES,
  GET_SEGUIDORES,
  GET_NOTIFICACION,
  GET_USUARIOS,
  GET_USUARIO,
  RECUPERAR_CONTRASENA,
  CAMBIAR_CONTRASENA
} from "./constants/actionsTypes";
import axios from "axios";

const loginSuccess = (status) => {
  return { type: LOGIN_SUCCESS, user: status };
};

const loginFailure = error => {
  return { type: LOGIN_FAILURE, error };
};

const recoverPassword = code =>{
  return{ type:RECUPERAR_CONTRASENA, code}
}
const cambiar_contrasena = code =>{
  return{ type:CAMBIAR_CONTRASENA, code}
}

const getPerfil = data => {
  return dispatch => {
    return axios
      .get(`user/perfil`)
      .then(res => {
        console.log("perfil")
        console.log(res.data)
        dispatch({
          type: GET_PERFIL,
          perfil: res.data.user
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
};

const loginRequest = (email, password) => {
  
  return dispatch => {
    dispatch({
      type: LOGIN_REQUEST,
      user: { email, password }
    });
    return axios
      .post("user/login", { username:email, password })
      .then(e => {
        console.log(e.data)
        if (e.data.status == "SUCCESS") {
          window.history.back()
          dispatch(loginSuccess(true));
        } else {
          dispatch(loginFailure(true));
        }
        dispatch({
          type: LOGIN_REQUEST,
          user: null
        });
      })
      .catch(err => {
        dispatch(loginFailure(err));
      });
  };
};

const getCerrarSesion = () => {
  return dispatch => {
    return axios
      .get(`user/logout`)
      .then(res => {
        dispatch({
          type: GET_PERFIL,
          usuario: res.data.status
        });
      })
      .catch(err => {
        loginFailure(err);
      });
  };
};

const recuperarContrasena = username =>{
  return dispatch =>{
    return axios.post("user/recover/", {username})
    .then(e=>{
      console.log(e.data)
      dispatch(recoverPassword(e.data.code));
    })
    .catch(err=>{
      console.log(err)
    })
  }
}

const cambiarContrasena = password =>{
  return dispatch =>{
    return axios.post("user/CambiarPassword/", {password})
    .then(e=>{
      dispatch(cambiar_contrasena(e.data.code));
    })
    .catch(err=>{
      console.log(err)
    })
  }
}
 
const getUsuario = userId => {
  return dispatch => {
    return axios
      .get(`/users/ById/${userId}/${null}`)
      .then(res => {
        dispatch({
          type: GET_USUARIO,
          usuario: res.data.info
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
};

const getUsuarios = data => {
  return dispatch => {
    return axios
      .get(`users/`)
      .then(res => {
        dispatch({
          type: GET_USUARIOS,
          usuarios: res.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
};


const getInfoToken = data => {
  return dispatch => {
    return axios
      .get(`tok/tokenPhone/byToken/${data}`)
      .then(res => {
        console.log(res.data)
        dispatch({
          type: GET_TOKENPHONE,
          tokenPhone: res.data.status
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
};
 
 

export {
  loginRequest,
  getPerfil,
  getCerrarSesion,
  getUsuarios,
  getUsuario,
  recuperarContrasena,
  cambiarContrasena,
  getInfoToken
};
