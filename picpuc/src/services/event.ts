import axios from 'axios';

const baseUrl = 'https://d338sdkj0j.execute-api.us-east-1.amazonaws.com/';

export const getEvents = async (
  type: string,
  coords: {latitude: string; longitude: string},
  query: { latitude: any; longitude: any; } | undefined,
) => {
  const {latitude, longitude} = coords;

  const url =
    type === 'near'
      ? `near/${latitude}, ${longitude}`
      : `date/${latitude}, ${longitude}/${query}`;
  try {
    const {data} = await axios.get(`${baseUrl}events/${url}`);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
