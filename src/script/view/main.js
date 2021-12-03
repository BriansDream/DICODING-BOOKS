


function main () {


    const BooksAPI = "https://books-api.dicoding.dev";

    const getBook = () => {
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

    const insertBook = () => {

    }

    const updateBook = () => {

    }

    const removeBook = () => {

    }

  

    
    const renderData = (books) => {
        
        const containerDataResult = document.querySelector('.container-data-result');
        containerDataResult.innerHTML = "";
        
        books.forEach(book => {
      
            const containerData = document.createElement('section');
            containerData.setAttribute('class','container-data');
            const idBook = document.createElement('div');
            idBook.setAttribute('class','id-book');
            const dataIdBook = document.createElement('p');
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
            btnRemove.innerHTML = "remove"

            containerData.appendChild(authorBook)
            containerData.insertBefore(titleBook,authorBook);
            containerData.insertBefore(idBook,titleBook);
            containerData.appendChild(btnRemove);

            containerDataResult.appendChild(containerData);
        });
        }

        const showResponseMessage = (message = "check your internet connection") => {
            alert(message);
        }
        
      
        document.addEventListener('DOMContentLoaded', () => {



            getBook();
        });
        



        getBook();


}



   






export {main}