const getWorkItemListType = 'GET_WORK_ITEM_LIST';
const postNewWorkItemType = 'POST_NEW_WORK_ITEM';
const startTimerType = 'START_TIMER';
const stopTimerType = 'STOP_TIMER';

const initialState = { workItems: [], startTime: "", endTime: "", currentlyTracking: false, addNew: false, needUpdate: false };

export const actionCreators = {

    getWorkItemList: () => async (dispatch, getState) => {
        const token = getState().login.token;

        // GET https://test.unieconomy.no/api/biz/workitems
        // evt med &filter=WorkRelationID eq 1 and ( date eq '2019-05-05' )&orderBy=StartTime&hateoas=false
        const API_ENDPOINT = 'https://test.unieconomy.no/api/biz/workitems';

        const response = await fetch(API_ENDPOINT, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
                'CompanyKey': '811678b7-ac22-4f97-9c21-3ed0b2ec064b'
            }
        });

        const responseData = await response.json();
        if (Array.isArray(responseData))
            dispatch({ type: getWorkItemListType, responseData });

    },
    postNewWorkItem: description => async (dispatch, getState) => {
        // POST https://test.unieconomy.no/api/biz/workitems
        const API_ENDPOINT = 'https://test.unieconomy.no/api/biz/workitems';
        const token = getState().login.token;
        const state = getState().timeTracker;
        const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
                'CompanyKey': '811678b7-ac22-4f97-9c21-3ed0b2ec064b'
            },
            body: JSON.stringify({
                Description: description,
                StartTime: new Date(state.startTime),
                EndTime: new Date(state.endTime),
                WorkRelationID: 1, // Currently no function for retrieving these options
                WorkTypeID: 1 // Currently no function for retrieving these options
            })
        });

        dispatch({ type: postNewWorkItemType })

        if (response.ok)
            this.getWorkItemList();
    },
    startTimer: () => dispatch => {
        dispatch({ type: startTimerType });
    },
    stopTimer: () => dispatch => {
        dispatch({ type: stopTimerType })

    }
};

export const reducer = (state, action) => {
    state = state || initialState;

    if (action.type === getWorkItemListType) {
        return {
            ...state,
            workItems: action.responseData,
            needUpdate: false
        };
    }
    if (action.type === postNewWorkItemType) {
        return {
            ...state,
            addNew: false,
            needUpdate: true
        }
    }
    if (action.type === startTimerType) {
        return {
            ...state,
            currentlyTracking: true,
            startTime: Date.now()
        }
    }
    if (action.type === stopTimerType) {
        return {
            ...state,
            currentlyTracking: false,
            addNew: true,
            endTime: Date.now()
        }
    }
    return state;
};
