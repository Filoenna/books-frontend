import type { Book } from "../types/Book";
import api from "./api";



const bookService = {
  // Get all books
  async getBooks(): Promise<Book[]> {

    try {
      console.info('Fetching books...');
      const response = await api.get('/books');
      return response.data;
    } catch (error) {
      console.error("Error fetching books:", error);
      throw error;
    }
  },

  // Create a new book
  async addBook(book: Omit<Book, "id">): Promise<Book> {
    try {
      const response = await api.post('/books', book);
      return response.data;
    } catch (error) {
      console.error("Error creating book:", error);
      throw error;
    }
  },

  // Delete a book by ID
  async deleteBook(id: number): Promise<void> {
    try {
      const response = await api.delete(`/books/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting book ${id}:`, error);
      throw error;
    }
  },

  // Update a book by ID
  async updateBook(id: number, book: Partial<Book>): Promise<Book> {
    console.log(id)
    try {
      const response = await api.patch(`/books/${id}`, book);
      return response.data;
    } catch (error) {
      console.error(`Error updating book ${id}:`, error);
      throw error;
    }
  }
};

export default bookService;
