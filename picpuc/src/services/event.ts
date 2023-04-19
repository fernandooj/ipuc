import axios from 'axios';

const baseUrl = 'https://d338sdkj0j.execute-api.us-east-1.amazonaws.com/';

export const getEvents = async () => {
  try {
    const {data} = await axios.get(`${baseUrl}events/date/asc`);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
