import {
  GET_CATEGORIAS,
  GET_CATEGORIA,
  INSERTAR_CATEGORIA,
  MODIFICAR_CATEGORIA,
  ELIMINAR_CATEGORIA,
  CAMBIAR_ESTADO_CATEGORIA
} from "./constants/actionsTypes";
import axios from "axios";

const getCategoria = id => {
  return dispatch => {
    return axios
      .get(`cat/categoria/${id}`)
      .then(res => {
        dispatch({
          type: GET_CATEGORIA,
          categoria: res.data.categoria
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
};

const getCategorias = data => {
  console.log(data)
  return dispatch => {
    return axios
      .get(`cat/categoria/`)
      .then(res => {
        console.log(res.data)
         
        dispatch({
          type: GET_CATEGORIAS,
          categorias:res.data.categoria 
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
};

const insertarCategoria = categoria => {
  return dispatch => {
    return axios
      .post(`cat/categoria`, { ...categoria })
      .then(res => {
        dispatch({
          type: INSERTAR_CATEGORIA,
          categoria: res.data.categoria
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
};

const modificarCategoria = categoria => {
  return dispatch => {
    return axios
      .put(`cat/categoria`, { ...categoria })
      .then(res => {
        dispatch({
          type: MODIFICAR_CATEGORIA,
          categoria: res.data.categoria
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
};
const eliminarCategoria = id => {
  return dispatch => {
    return axios
      .del(`cat/categoria`, { id })
      .then(res => {
        dispatch({
          type: ELIMINAR_CATEGORIA,
          categoria: res.data.categoria
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
};
 
const cambiarEstadoCategoria = id => {
  return dispatch => {
    return axios
      .del(`cat/categoria`, { id })
      .then(res => {
        dispatch({
          type: CAMBIAR_ESTADO_CATEGORIA,
          categoria: res.data.categoria
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export {
  getCategoria,
  getCategorias,
  insertarCategoria,
  modificarCategoria,
  eliminarCategoria,
  cambiarEstadoCategoria
};
