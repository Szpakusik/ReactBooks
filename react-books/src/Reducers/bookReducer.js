const initialState = {
    books: []
};

export default function bookReducer(state = initialState, action) {
    switch (action.type) {
        case "GET_BOOKS":
            return {
                ...state,
                loading: false,
                books: action.payload
            }
        default:
            return state;
    }
}