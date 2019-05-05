const getJwtTokenType = 'UPDATE_JWT_TOKEN';
const initialState = { token: '', message: '' };

export const actionCreators = {
  getJwtToken: (username, password) => async dispatch => {    
    //const url = `api/SampleData/WeatherForecasts?startDateIndex=${startDateIndex}`;

    const API_ENDPOINT = 'https://test-api.unieconomy.no/api/init/sign-in';
    const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    });
    var accessToken;
    var message;
    if(response.ok){
        const responseData = await response.json();
        message = 'Successful';
        accessToken = responseData.access_token;
    }
    else
        message = 'Unsuccessful';

    dispatch({ type: getJwtTokenType, accessToken, message})

  }
};

export const reducer = (state, action) => {
  state = state || initialState;

  if (action.type === getJwtTokenType) {
    return {
      ...state,
      JwtToken: action.JwtToken,
      message: action.message
    };
  }
  return state;
};
