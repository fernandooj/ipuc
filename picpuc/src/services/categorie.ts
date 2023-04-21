import axios from 'axios';

const baseUrl = 'https://d338sdkj0j.execute-api.us-east-1.amazonaws.com/';

export const getCategories = async () => {
  try {
    const {data} = await axios.get(`${baseUrl}categories`);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
