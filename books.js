const MyLibrary = [];

//DOM Objects
let InTitle = document.querySelector('#InTitle');
let InAuthor = document.querySelector('#InAuthor');
let InPages = document.querySelector('#InPages');
let InReadYes = document.getElementById('readYes')

const bookForm = document.querySelector('form'); 
const BtSubmit = document.querySelector('#submit');
const readStatus = document.querySelector('input[name="haveRead"]')
const library = document.querySelector('pre');
const bookTable = document.getElementById('booktable');

BtSubmit.addEventListener('click', addBookToLibrary);

//Book constructor
function Book (title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function () {
        const infos = `${title} by ${author}, ${pages} pages, ${read}`
        return infos
}}

function addBookToLibrary () {
    let title = InTitle.value;
    let author = InAuthor.value;
    let pages = Number(InPages.value);
    let read = InReadYes.checked;
    let newBook = new Book (title, author, pages, read)
    MyLibrary.push(newBook)
    showLibrary()

}

function showLibrary () {
        const jsTable = document.getElementById('js-table');
        jsTable.innerHTML = "";
      
        for (let i = 0; i < MyLibrary.length; i++) {
          let newRow = jsTable.insertRow(-1);
      
          let titleCell = newRow.insertCell(-1);
          let titleText = document.createTextNode(MyLibrary[i].title);
          titleCell.appendChild(titleText);
      
          let authorCell = newRow.insertCell(-1);
          let authorText = document.createTextNode(MyLibrary[i].author);
          authorCell.appendChild(authorText);
      
          let pagesCell = newRow.insertCell(-1);
          let pagesText = document.createTextNode(MyLibrary[i].pages);
          pagesCell.appendChild(pagesText);
      
          let readCell = newRow.insertCell(-1);
          if (MyLibrary[i].read == false) {
              readCell.innerHTML = '<button type="button" class="read-unread-button">❌</button>'
          } else {
              readCell.innerHTML = '<button type="button" class="read-unread-button">✔️</button>'
          }
          
          let deleteCell = newRow.insertCell(-1);
          deleteCell.innerHTML = '<button type="button" class="delete-button">🗑️</button>'
        }  

        clearInputs()
      }

function clearInputs () {
    InTitle.value = "" 
    InAuthor.value = '';
    InPages.value = "";
    readStatus.checked = false; 
}


bookTable.addEventListener("click", respondToClick);

function respondToClick(e) {
    console.log(e);
    const targetBook = e.target.parentNode.parentNode.childNodes[0].innerText;

    if (e.target.innerHTML == '🗑️') {
        deleteBook(findBookInArray(targetBook));
        showLibrary();
    }
    if (e.target.classList.contains("read-unread-button")) {
        markReadUnread(findBookInArray(targetBook));
        showLibrary();
    }
}

function findBookInArray(title) {
    if (MyLibrary.length === 0 || MyLibrary === null) {
        return;
    }
    for (let book of MyLibrary) {
        if (book.title === title) {
          return MyLibrary.indexOf(book);
        }
    }
  }

function deleteBook(arrayIndexToBeDeleted) {
    MyLibrary.splice(arrayIndexToBeDeleted, 1);
}

function markReadUnread(arrayIndex) {
    if (MyLibrary[arrayIndex].read == false) {
        MyLibrary[arrayIndex].read = true;
        return;
    } else {
        MyLibrary[arrayIndex].read = false;
    }
}


