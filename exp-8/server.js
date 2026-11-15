const express = require('express');
const app = express();

// Middleware to parse JSON data sent by the client
app.use(express.json());

// Our temporary "database" (an array of books)
let books = [
    { id: 1, title: "The Hobbit", author: "J.R.R. Tolkien" },
    { id: 2, title: "Atomic Habits", author: "James Clear" }
];

// 1. READ: Get all books
app.get('/books', (req, res) => {
    res.json(books);
});

// 2. CREATE: Add a new book
app.post('/books', (req, res) => {
    const newBook = {
        id: books.length + 1, // Simple ID generator
        title: req.body.title,
        author: req.body.author
    };
    books.push(newBook);
    res.status(201).json(newBook);
});

// 3. UPDATE: Edit an existing book by ID
app.put('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const book = books.find(b => b.id === bookId);

    if (!book) {
        return res.status(404).json({ message: "Book not found" });
    }

    book.title = req.body.title || book.title;
    book.author = req.body.author || book.author;
    
    res.json(book);
});

// 4. DELETE: Remove a book by ID
app.delete('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    books = books.filter(b => b.id !== bookId);
    res.json({ message: "Book deleted successfully" });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});