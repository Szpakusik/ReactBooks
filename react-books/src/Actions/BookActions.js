import axios from "axios"

export const findBooks = ({ search, author, language, fromDate, toDate }) => {

    return ( dispatch ) => {
        return axios.get(`https://www.googleapis.com/books/v1/volumes?q=${search+" "+author}&maxResults=40`)
        .then( (response) => {
            let books = response.data.items;
            let filteredBooks = checkAuthorMatch( author, books )
            dispatch( { type: "GET_BOOKS", payload: filteredBooks } )
        } )
        .catch( (err) => {
            throw err;
            // dispatch( { type: "GET_BOOKS_FAILED" } )
        } )
    }
};

const checkAuthorMatch = ( authorSearch, books ) => {
    
    let filtered = books
    
    if ( authorSearch ) {

        filtered = books.filter( ( book ) => {

            let filterResult = false
            let authorSearchParts = authorSearch.split(" ")
            let authorArray = book.volumeInfo.authors;
            if ( !authorArray ) return false;

            outer: for (let j = 0; j < authorArray.length; j++) {
                let author = authorArray[j];
                for (let i = 0; i < authorSearchParts.length; i++) {
                    let searchPart = authorSearchParts[i].toLowerCase();
                    filterResult = author.toLowerCase().includes( searchPart )

                    if( filterResult ) break outer;
                }
            }
            return filterResult
        } )

    }

    return filtered
}