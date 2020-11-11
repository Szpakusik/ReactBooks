import reducer from '../Reducers/bookReducer'

describe('todos reducer', () => {

    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(
            {
                books: [],
                loading: false,
                toShowNumber: 0,
                queryInfo: {}
            }
        )
    })

    it('should handle GET_BOOKS', () => {
    expect(
        reducer(undefined, {
            type: "GET_BOOKS",
            payload: { filteredBooks: [{ title: "book1", author: "Martin Luther" }, { title: "book2", author: "George R. R. Martin" }]}
        })
    ).toEqual(
        {
            books: [{ title: "book1", author: "Martin Luther" }, { title: "book2", author: "George R. R. Martin" }],
            toShowNumber: 0,
            loading: false,
            queryInfo: {}
        }
    ) } )

    it('should handle GET_MORE_BOOKS', () => {
    expect(
        reducer({
            books: [{ title: "book1", author: "Martin Luther" }, { title: "book2", author: "George R. R. Martin" }],
        }, {
            type: "GET_MORE_BOOKS",
            payload: { filteredBooks: [{ title: "book1", author: "Martin Luther" }, { title: "book2", author: "George R. R. Martin" }]}
        })
    ).toEqual(
        {
            books: [{ title: "book1", author: "Martin Luther" }, { title: "book2", author: "George R. R. Martin" }, { title: "book1", author: "Martin Luther" }, { title: "book2", author: "George R. R. Martin" }],
        }
    ) } )
    
})