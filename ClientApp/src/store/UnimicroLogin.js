const getJwtTokenType = 'GET_JWT_TOKEN';
const getCompanies = 'GET_COMPANIES';
const initialState = { token: '', message: 'You need to log in', companies: [], refreshCompanies: false, chosenCompanyKey: '' };

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
        if (response.ok) {
            const responseData = await response.json();
            message = 'Successful';
            accessToken = responseData.access_token;
        }
        else
            message = 'Unsuccessful';

        dispatch({ type: getJwtTokenType, accessToken, message })

    },

    getCompanies: () => async (dispatch, getState) => {
        const API_ENDPOINT = 'https://test-api.unieconomy.no/api/init/companies';
        const token = getState().login.token;

        const response = await fetch(API_ENDPOINT, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });
        const companies = await response.json();
        
        dispatch({ type: getCompanies, companies})
    }
};

export const reducer = (state, action) => {
    state = state || initialState;

    if (action.type === getJwtTokenType) {
        return {
            ...state,
            token: action.accessToken,
            message: action.message,
            refreshCompanies: true
        };
    }
    if (action.type === getCompanies){
        return {
            ...state,
            refreshCompanies: false,
            companies: action.companies,
            chosenCompanyKey: Array.isArray(action.companies)?action.companies[0].Key:[]
        }
    }
    return state;
};
