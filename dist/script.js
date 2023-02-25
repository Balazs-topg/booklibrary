//! some Logical Errors (with the "remove book" btn not always shown when it's supposed to)
//! also "remove book" does not work
//! needs **some** refactoring
let myLibrary = [];

//creates book object
function book(image, title, author, year, linkName, linkUrl) {
  this.image = image;
  this.title = title;
  this.author = author;
  this.year = year;
  this.linkName = linkName;
  this.linkUrl = linkUrl;
}

//~add default books and then update the bookshelf
myLibrary.push(
  new book(
    "https://media.shortform.com/covers/png/the-magic-of-thinking-big-cover@8x.png",
    "The Magic of Thinking Big",
    "David J. Schwartz",
    "1959",
    "Amazon",
    "https://www.amazon.com/Magic-Thinking-Big-David-Schwartz/dp/0671646788"
  )
);
myLibrary.push(
  new book(
    "https://kbimages1-a.akamaihd.net/67f957b7-2233-474d-8834-b0d8def833db/353/569/90/False/the-millionaire-fastlane-crack-the-code-to-wealth-and-live-rich-for-a-lifetime.jpg",
    "The Millionaire Fastlane",
    "M. J. DeMarco",
    "2011",
    "Amazon",
    "https://www.amazon.com/Millionaire-Fastlane-Crack-Wealth-Lifetime/dp/0984358102"
  )
);
updateBookshelf();

//querys form inputs and stores them in a variable
let title = document.querySelector("input[name='title']");
let author = document.querySelector("input[name='author']");
let year = document.querySelector("input[name='year']");
let image = document.querySelector("input[name='image']");
let linkName = document.querySelector("input[name='linkName']");
let linkUrl = document.querySelector("input[name='linkUrl']");

//updates html to display (book) objects as cards
function updateBookshelf() {
  const bookShelf = document.querySelector("#container");
  bookShelf.innerHTML = "";
  for (let i = 0; i < myLibrary.length; i++) {
    bookShelf.innerHTML += `
      <!-- card -->
      <div
        class="relative z-10 flex flex-col gap-4 bg-slate-100 py-4 px-4 rounded-lg shadow-lg border-t-2 border-white w-96"
      >
        <div class="flex gap-5">
          <img
            src="${myLibrary[i].image}"
            alt="book cover"
            class="rounded-lg h-36 w-28"
          />
          <div class="flex flex-col gap-4 justify-between grow">
            <!-- text -->
            <div class="grow">
              <p class="font-semibold">${myLibrary[i].title}</p>
              <p>${myLibrary[i].author}</p>
              <p>${myLibrary[i].year}</p>
            </div>
            <div>
              <a
                class="underline"
                target="_blank"
                href="${myLibrary[i].linkUrl}"
                >${myLibrary[i].linkName}</a
              >
            </div>
          </div>
          <div class="flex flex-col gap-4">
            <span
              class="edit cursor-pointer material-symbols-outlined select-none bg-slate-200 rounded-lg px-1 py-1 text-slate-600"
              onclick="openEditWindow(${i})"
              >edit</span
            >
          </div>
        </div>
      </div>
`;
  }
}

//clears the form
function clearForm() {
  title.value = "";
  author.value = "";
  year.value = "";
  image.value = "";
  linkName.value = "";
  linkUrl.value = "";
}

///querys btn interaction and stores them in a variable
const closeBtn = document.querySelector(".close-window");          //close btn (red circle)
const addBookMenue = document.querySelector("#addbookmenue");      //referes to the actuall dom element that contains all the menue items
const addBookBtn = document.querySelector("#addbookbtn");          //"Add Book" btn
const submitBtn = document.querySelector("button[type='submit']"); //submit btn (it's actuall name is Add Book , or other times edit) (green)
const removeBookBtn = document.querySelector("#removeBookBtn");    //"remove book" btn (red)

let editWindowIsOpen = false;             //the editing window open bool
let addBookWindowIsOpen = false;          //the Add Book window open bool
let editingTheBookNumber = undefined;     //the number of position the book that is currently being edited has in myLibrary
let TempBook = new book();                //temporary book that is not yet in myLibrary

//event listener for X btn
closeBtn.addEventListener("click", () => {
  addBookMenue.classList.toggle("hidden");
  if (editWindowIsOpen) {
    removeBookBtn.classList.toggle("hidden");
  }
});
//event listener for "Add Book" btn
addBookBtn.addEventListener("click", () => {
  clearForm();
  addBookMenue.classList.toggle("hidden");
  submitBtn.textContent = "Add Book";
});

//event listener for "Add Book" OR "Edit Book" btn (Submit)
submitBtn.addEventListener("click", () => {
  if (editWindowIsOpen) {
    myLibrary[editingTheBookNumber].title = title.value;
    myLibrary[editingTheBookNumber].author = author.value;
    myLibrary[editingTheBookNumber].year = year.value;
    myLibrary[editingTheBookNumber].image = image.value;
    myLibrary[editingTheBookNumber].linkName = linkName.value;
    myLibrary[editingTheBookNumber].linkUrl = linkUrl.value;
    removeBookBtn.classList.toggle("hidden");
    updateBookshelf();
  }
  if (!editWindowIsOpen) {
    let newBook = Object.create(book);
    newBook.title = title.value;
    newBook.author = author.value;
    newBook.year = year.value;
    newBook.image = image.value;
    newBook.linkName = linkName.value;
    newBook.linkUrl = linkUrl.value;

    myLibrary.push(newBook);
    updateBookshelf();
  }
  editWindowIsOpen = false;
  addBookMenue.classList.toggle("hidden");
});

//opens book editing menue (This function is called from an inline script in the dom, NOT from an event listener =) )
function openEditWindow(bookNumber) {
  editWindowIsOpen = true;
  editingTheBookNumber = bookNumber;
  clearForm();
  console.log(bookNumber);

  removeBookBtn.classList.toggle("hidden"); //shows remove book btn
  addBookMenue.classList.toggle("hidden");

  title.value = myLibrary[bookNumber].title;
  author.value = myLibrary[bookNumber].author;
  year.value = myLibrary[bookNumber].year;
  image.value = myLibrary[bookNumber].image;
  linkName.value = myLibrary[bookNumber].linkName;
  linkUrl.value = myLibrary[bookNumber].linkUrl;

  submitBtn.textContent = "edit";

  TempBook.bookNumber = bookNumber;
  TempBook.title = title.value;
  TempBook.author = author.value;
  TempBook.year = year.value;
  TempBook.image = image.value;
  TempBook.linkName = linkName.value;
  TempBook.linkUrl = linkUrl.value;
}
