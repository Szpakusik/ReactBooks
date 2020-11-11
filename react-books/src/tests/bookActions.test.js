import * as BookActions from "../Actions/BookActions"

const fakeDateBooks = [];

for (let index = 0; index < 10; index++) {
    const book = {
        volumeInfo: {
            title: "Book"+index, 
            publishedDate: `19${index}0`
        }
    }
    fakeDateBooks.push(book);
}

it("Should filter with given fromDate", () => {
    const result = BookActions.checkDateMatch("1950", "", fakeDateBooks)
    
    expect( result.length ).toBe(5);
})
it("Should filter with given toDate", () => {
    const result = BookActions.checkDateMatch("", "1950", fakeDateBooks)
    
    expect( result.length ).toBe(6);
})
it("Should filter with given both fromDate and toDate", () => {
    const result = BookActions.checkDateMatch("1910", "1980", fakeDateBooks)
    
    expect( result.length ).toBe(8);
})

const fakeAuthorBooks = [
    {
        volumeInfo: {
            authors:["Ronald Carrey", "Andrzej Sapkowski"]
        }
    },
    {
        volumeInfo: {
            authors:["J. R. R. Tolkien"]
        }
    },
    {
        volumeInfo: {
            authors:["John Ronald Reuer Tolkien"]
        }
    }
]

it("Shouldn't filter if one word match", () => {
   const result = BookActions.checkAuthorMatch( "Ronald Tolkien", fakeAuthorBooks )

   expect( result.length ).toBe(3)
} )

it("Should filter if there is no match", () => {
   const result = BookActions.checkAuthorMatch( "Tolkien", fakeAuthorBooks )

   expect( result.length ).toBe(2)
} )

it("Should be case insensitive", () => {
   const result = BookActions.checkAuthorMatch( "tolkieN", fakeAuthorBooks )

   expect( result.length ).toBe(2)
} )

it("Should return empty array if there is no match in any book", () => {
   const result = BookActions.checkAuthorMatch( "NotMatchingSubstring", fakeAuthorBooks )

   expect( result.length ).toBe(0)
} )

it("Should find a match even for one letter", () => {
   const result = BookActions.checkAuthorMatch( "o", fakeAuthorBooks )

   expect( result.length ).toBe(3)
} )