


function main () {


    const BooksAPI = "https://books-api.dicoding.dev";

    const getBook = () => {
        // Fetch default method http request = GET
        fetch(`${BooksAPI}/list`)
        .then((response) => {
           return response.json();
        })
        .then(responseJson => {
       
            if(responseJson.error) {
                showResponseMessage(responseJson.message)
            } else {
                renderData(responseJson.books)
            }

            })
            .catch(error => {
                showResponseMessage(error);
            });
    }

   function insertBook(book) {
     
   
        fetch(`${BooksAPI}/add`,  {
            method: "POST",
            headers : {
                "Content-Type": "application/json",
                "X-Auth-Token": "12345"
            },
            body: JSON.stringify(book),
        
        })
        .then(response => {
            return response.json();
        })
        .then(responseJson => { 
            showResponseMessage(responseJson.message)
            getBook();
        }).catch(error => {
            showResponseMessage(error);
        })
     
    }

    const updateBook = (book) => {

        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Auth-Token': "12345"
            },
            body: JSON.stringify(book)
        }

        fetch(`${BooksAPI}/edit/${book.id}`, options)
        .then((response) => {
            return response.json();
        })
        .then(responseJson => {
            showResponseMessage(responseJson.message);
            getBook();
        })
        .catch(error => {
            showResponseMessage(error);
        })
    
    }

    const removeBook = (bookId) => {
        fetch(`${BooksAPI}/delete/${bookId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': "application/json",
                "X-Auth-Token": "12345"
            },
            body: JSON.stringify(bookId)
        })
        .then(response => {
            return response.json();
        })
        .then(responseJson => {
            showResponseMessage(responseJson.message);
            getBook();
        })
        .catch(error => {
            showResponseMessage(error);
        }) 
    }

  

    
    const renderData = (books) => {
        
        const containerDataResult = document.querySelector('.container-data-result');
        containerDataResult.innerHTML = "";
        
        books.forEach(book => {
      
            const containerData = document.createElement('section');
            containerData.setAttribute('class','container-data');
            const idBook = document.createElement('div');
            idBook.setAttribute('class','container-idbook');
            const dataIdBook = document.createElement('p');
            dataIdBook.setAttribute('class','id-book');
            dataIdBook.innerHTML = book.id;
            idBook.appendChild(dataIdBook);
            const titleBook = document.createElement('div');
            titleBook.setAttribute('class','title-book');
            const dataTitleBook = document.createElement('p');
            dataTitleBook.innerHTML = book.title;
            titleBook.appendChild(dataTitleBook)
            const authorBook = document.createElement('div');
            authorBook.setAttribute('class','author-book');
            const dataAuthorBook = document.createElement('p');
            dataAuthorBook.innerHTML = book.author;
            authorBook.appendChild(dataAuthorBook);
            
            const btnRemove = document.createElement('button');
            btnRemove.setAttribute('class','btnRemove');
            btnRemove.setAttribute('id',`${book.id}`)
            btnRemove.innerHTML = "remove";

            containerData.appendChild(authorBook)
            containerData.insertBefore(titleBook,authorBook);
            containerData.insertBefore(idBook,titleBook);
            containerData.appendChild(btnRemove);     
                 
            containerDataResult.appendChild(containerData);
       
          
        });

       
        const removeButtons = document.querySelectorAll('.btnRemove');
        
        removeButtons.forEach((removeButton) => {
                removeButton.addEventListener('click',(event) => {
                    const bookId = event.target.id;
                    removeBook(bookId);
                })
        })
    }
       
        const showResponseMessage = (message = "check your internet connection") => {
            alert(message);
        }
        
      
        window.addEventListener('DOMContentLoaded', () => {
            const idInput = document.querySelector('.book-id');
            const titleInput = document.querySelector('.book-title');
            const authorInput = document.querySelector('.book-author');
            const btnSave = document.querySelector('.btn-save');
         
            const btnUpdate = document.querySelector('.btn-update');
            
            btnSave.addEventListener('click', function() {
       
                const book = {
                    id: Number.parseInt(idInput.value),
                    title: titleInput.value,
                    author: authorInput.value,
                }
              

                insertBook(book);
            });

            btnUpdate.addEventListener('click',(event) => {
                const book = {
                    id: Number.parseInt(idInput.value),
                    title: titleInput.value,
                    author: authorInput.value
                }
                updateBook(book);

            })


            getBook();
        });

}



   






export {main}