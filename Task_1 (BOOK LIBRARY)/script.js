// References to DOM elements
const bookTitleInput = document.getElementById("bookTitle");
const bookAuthorInput = document.getElementById("bookAuthor");
const bookCategoryInput = document.getElementById("bookCategory");
const addBookBtn = document.getElementById("addBookBtn");
const searchBar = document.getElementById("searchBar");
const bookList = document.getElementById("bookList");
const borrowHistory = document.getElementById("borrowHistory");

// Book collection and history
let books = [];
let history = [];

// Add a new book
addBookBtn.addEventListener("click", () => {
    const title = bookTitleInput.value.trim();
    const author = bookAuthorInput.value.trim();
    const category = bookCategoryInput.value;

    if (!title || !author) {
        alert("Please fill in all fields!");
        return;
    }

    const book = { title, author, category, borrowed: false };
    books.push(book);
    displayBooks();
    clearInputs();
});

// Display the list of books
function displayBooks(filter = "") {
    bookList.innerHTML = "";

    books
        .filter(book => book.title.toLowerCase().includes(filter.toLowerCase()) || book.author.toLowerCase().includes(filter.toLowerCase()))
        .forEach((book, index) => {
            const li = document.createElement("li");
            li.className = book.borrowed ? "borrowed" : "";
            li.innerHTML = `
                <strong>${book.title}</strong> by ${book.author} (${book.category})
                <button onclick="borrowBook(${index})">${book.borrowed ? "Return" : "Borrow"}</button>
                <button onclick="removeBook(${index})">Remove</button>
            `;
            bookList.appendChild(li);
        });
}

// Borrow or return a book
function borrowBook(index) {
    books[index].borrowed = !books[index].borrowed;

    if (books[index].borrowed) {
        history.push(`Borrowed: ${books[index].title}`);
    } else {
        history.push(`Returned: ${books[index].title}`);
    }

    displayBooks();
    displayHistory();
}

// Remove a book
function removeBook(index) {
    books.splice(index, 1);
    displayBooks();
}

// Display borrowing history
function displayHistory() {
    borrowHistory.innerHTML = "";
    history.forEach(record => {
        const li = document.createElement("li");
        li.textContent = record;
        borrowHistory.appendChild(li);
    });
}

// Search books
searchBar.addEventListener("input", (e) => {
    displayBooks(e.target.value);
});

// Clear input fields
function clearInputs() {
    bookTitleInput.value = "";
    bookAuthorInput.value = "";
    bookCategoryInput.value = "Fiction";
}
