export const initialState = {
    bucket: [],
}

export const actionTypes = {
    ADD_TO_CART: "ADD_TO_CART",
}

function reducer(state, action) {
    console.log(action);
    
    switch(action.type) {
        case actionTypes.ADD_TO_CART:
            return {
                ...state,
                bucket: action.bucket
            };
        default:
            return state;
    }
}

export default reducer;