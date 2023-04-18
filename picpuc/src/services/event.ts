import axios from 'axios';

const baseUrl = ' https://it54em6qp0.execute-api.us-east-1.amazonaws.com/dev/';

export const getEvents = async () => {
  try {
    const {data} = await axios.get(`${baseUrl}events/date`);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
