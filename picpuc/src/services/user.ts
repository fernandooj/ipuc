import axios from 'axios';

const baseUrl = 'https://d338sdkj0j.execute-api.us-east-1.amazonaws.com/';

export const getUsers = async () => {
  try {
    const {data} = await axios.get(`${baseUrl}users/`);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    const {data} = await axios.get(`${baseUrl}users/${email}`);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const saveUser = async (info: any) => {
  const {email, photo, id: id_social, name} = info;
  try {
    const {data} = await axios.post(`${baseUrl}users`, {
      email,
      photo,
      id_social,
      name,
    });
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
