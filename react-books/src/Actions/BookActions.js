import axios from "axios"

export const findBooks = (title) => {
    return ( dispatch ) => {
        return axios.get(`https://www.googleapis.com/books/v1/volumes?q=${title}`, {
            search: "Lord"
        })
        .then( (response) => {
            dispatch({type: "GET_BOOKS", payload: response.data.items } )
        } )
        .catch( (err) => {
            dispatch({type: "GET_BOOKS_FAILED"})
        } )
    }
};