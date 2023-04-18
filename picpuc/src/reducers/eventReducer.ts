export const getEventReducer = (event: object) => {
  return {
    type: 'GET_EVENT',
    payload: event,
  };
};
