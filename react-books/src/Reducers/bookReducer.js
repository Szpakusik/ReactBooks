const initialState = {
    books: [],
    loading: false,
    toShowNumber: 40
};

export default function bookReducer(state = initialState, action) {
    switch (action.type) {
        case "GET_BOOKS":
            return {
                ...state,
                loading: false,
                books: action.payload
            }
        case "GET_MORE_BOOKS":
            console.log(state);
            return {
                ...state,
                loading: false,
                books: [...state.books, ...action.payload]
            }
        default:
            return state;
    }
}