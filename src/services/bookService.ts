import axios from "axios";
import type { Book } from "../types/Book";

const apiUrl = "http://localhost:8000";

const bookService = {
  // Get all books
  async getBooks(): Promise<Book[]> {

    try {
      const response = await axios.get(`${apiUrl}/books`);
      return response.data;
    } catch (error) {
      console.error("Error fetching books:", error);
      throw error;
    }
  },

  // Get a single book by ID
  async getBook(id: number): Promise<Book> {
    try {
      const response = await axios.get(`${apiUrl}/books/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching book ${id}:`, error);
      throw error;
    }
  },

  // Create a new book
  async createBook(book: Omit<Book, "id">): Promise<Book> {
    try {
      const response = await axios.post(`${apiUrl}/books`, book);
      return response.data;
    } catch (error) {
      console.error("Error creating book:", error);
      throw error;
    }
  },
};

export default bookService;
