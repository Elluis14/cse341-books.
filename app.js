import express from 'express';
import { getDb } from './src/db/connect.js';

const app = express();

app.use(express.json());

// Root endpoint
app.get('/', (req, res) => {
  return res.status(200).json({
    message: 'Welcome to the CSE 341 Books API',
    status: 'success'
  });
});

// GET /books - Retrieve all books
app.get('/books', async (req, res) => {
  try {
    const database = getDb();

    const books = await database
      .collection('books')
      .find(
        {},
        {
          projection: {
            _id: 0,
            id: 1,
            author: 1,
            title: 1,
            publicationDate: 1
          }
        }
      )
      .sort({ id: 1 })
      .toArray();

    return res.status(200).json(books);
  } catch (error) {
    console.error('Error retrieving books:', error.message);

    return res.status(500).json({
      message: 'Internal server error'
    });
  }
});

// GET /books/:id - Retrieve one book
app.get('/books/:id', async (req, res) => {
  try {
    const database = getDb();
    const requestedId = req.params.id;

    const book = await database
      .collection('books')
      .findOne(
        { id: requestedId },
        {
          projection: {
            _id: 0,
            id: 1,
            author: 1,
            title: 1,
            publicationDate: 1
          }
        }
      );

    if (!book) {
      return res.status(404).json({
        message: 'Book not found'
      });
    }

    return res.status(200).json(book);
  } catch (error) {
    console.error('Error retrieving book:', error.message);

    return res.status(500).json({
      message: 'Internal server error'
    });
  }
});

export default app;
