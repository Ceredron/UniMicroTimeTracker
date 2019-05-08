const getContactPersonsType = 'GET_CONTACT_PERSON';
const getDetailedContactPersonType = 'GET_DETAILED_CONTACT_PERSON';
const createNewContactPersonType = 'CREATE_NEW_CONTACT_PERSON';
const deleteContactPersonType = 'DELETE_CONTACT_PERSON';
const updateContactPersonType = 'UPDATE_CONTACT_PERSON';
const newContactPersonType = 'NEW_CONTACT_PERSON';

const initialState = { contactPersons: [], refresh: false, detailedContactPerson: {}, initialized: false, newContactPerson: false };

export const actionCreators = {

    getContactPersons: () => async (dispatch, getState) => {
        const token = getState().login.token;
        const companyKey = getState().login.chosenCompanyKey;
        const API_ENDPOINT = 'https://test-api.unieconomy.no:443/api/biz/contacts';

        const response = await fetch(API_ENDPOINT, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
                'CompanyKey': companyKey
            }
        });

        var contactPersons = await response.json();
        if (!Array.isArray(contactPersons))
            contactPersons = [];

        const successfulCall = response.ok;

        dispatch({ type: getContactPersonsType, contactPersons, successfulCall });

    },

    getDetailedContactPerson: id => async (dispatch, getState) => {
        const token = getState().login.token;
        const companyKey = getState().login.chosenCompanyKey;
        var API_ENDPOINT = 'https://test-api.unieconomy.no:443/api/biz/contacts/' + id;

        const response = await fetch(API_ENDPOINT + '?expand=Info,Info.CustomValues,ParentBusinessRelation,ParentBusinessRelation.Addresses', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
                'CompanyKey': companyKey
            }
        });

        const contactPerson = await response.json();

        dispatch({ type: getDetailedContactPersonType, contactPerson});
    },

    createNewContactPerson: contactPerson => async (dispatch, getState) => {
        // POST https://test-api.unieconomy.no:443/api/biz/contacts
        const token = getState().login.token;
        const companyKey = getState().login.chosenCompanyKey;
        const API_ENDPOINT = 'https://test-api.unieconomy.no:443/api/biz/contacts/';

        alert(JSON.stringify(contactPerson));

        const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
                'CompanyKey': companyKey
            },
            body: JSON.stringify(contactPerson)
        });

        const responseData = await response.json();


        dispatch({ type: createNewContactPersonType, });

    },

    deleteContactPerson: id => async (dispatch, getState) => {
        const token = getState().login.token;
        const companyKey = getState().login.chosenCompanyKey;
        const API_ENDPOINT = 'https://test-api.unieconomy.no:443/api/biz/contacts/' + id;

        const response = await fetch(API_ENDPOINT, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
                'CompanyKey': companyKey
            }
        });

        const responseData = await response.json();


        dispatch({ type: deleteContactPersonType, });

    },

    updateContactPerson: contactPerson => async (dispatch, getState) => {
        const token = getState().login.token;
        const companyKey = getState().login.chosenCompanyKey;
        const API_ENDPOINT = 'https://test-api.unieconomy.no:443/api/biz/contacts/';

        alert(
            JSON.stringify(contactPerson));
        const response = await fetch(API_ENDPOINT + contactPerson.ID, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
                'CompanyKey': companyKey
            },
            body: JSON.stringify(contactPerson)
        });

        const responseData = await response.json();


        dispatch({ type: updateContactPersonType, });

    },

    newContactPerson: () => dispatch => dispatch({type: newContactPersonType})
};

export const reducer = (state, action) => {
    state = state || initialState;

    if (action.type === getContactPersonsType) {
        return {
            ...state,
            refresh: false,
            contactPersons: action.contactPersons,
            initialized: action.successfulCall
        };
    }

    if (action.type === getDetailedContactPersonType) {
        return {
            ...state,
            detailedContactPerson: { ...action.contactPerson
            }
        };
    }

    if (action.type === createNewContactPersonType) {
        return {
            ...state,
            refresh: true,

        };
    }

    if (action.type === deleteContactPersonType) {
        return {
            ...state,
            refresh: true,

        };
    }

    if (action.type === updateContactPersonType) {
        return {
            ...state,
            refresh: true,

        };
    }

    if (action.type === newContactPersonType) {
        return {
            ...state,
            detailedContactPerson: {
                ID: -1,

            }
        }
    }
   
    return state;
};