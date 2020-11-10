const initialState = {
    books: [],
    loading: false,
    toShowNumber: 0,
    queryInfo: {}
};

export default function bookReducer(state = initialState, action) {
    switch (action.type) {
        case "SET_BUSY":
            return {
                ...state,
                loading: action.payload,
            }
        case "SEARCH_FAILED":
            return {
                ...state,
                loading: false,
            }
        case "GET_BOOKS":
            return {
                ...state,
                books: action.payload.filteredBooks
            }
        case "GET_MORE_BOOKS":
            return {
                ...state,
                books: [...state.books, ...action.payload.filteredBooks]
            }
        case "SET_BOOK_LIMIT":
            return {
                ...state,
                toShowNumber: state.toShowNumber + 8
            }
        case "RESET_BOOK_LIMIT":
            return {
                ...state,
                toShowNumber: 12
            }
        case "SET_QUERY_INFO":
            return {
                ...state,
                queryInfo: {
                    ...action.payload,
                }
            }
        default:
            return state;
    }
}