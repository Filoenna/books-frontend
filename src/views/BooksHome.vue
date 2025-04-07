<template>
    <div class="container uk-margin-top">
        <h1 class="uk-heading-medium uk-text-primary">Books library</h1>

        <button @click="openModal" class="uk-button uk-button-primary">
            Add Book
        </button>

        <AddBookForm   
            :bookToEdit="bookToEdit" 
            @addBook="addNewBook"
            @editBook="updateExistingBook"
        />
        <!-- Loading state -->
        <div v-if="isLoading" class="uk-flex uk-flex-center uk-flex-middle uk-height-large">
            <span uk-spinner="ratio: 3"></span>
        </div>

        <!-- Error state -->
        <div v-else-if="error" class="uk-alert-danger" uk-alert>
            <p>{{ error }}</p>
        </div>

        <!-- Empty state -->
        <div v-else-if="books.length === 0" class="uk-alert-primary" uk-alert>
            <p>No books available. Add your first book to get started!</p>
        </div>

        <!-- Books grid -->
        <div v-else class="uk-grid uk-child-width-1-3@m uk-child-width-1-2@s uk-margin-large-top" uk-grid>
            <div v-for="book in books" :key="book.id" class="uk-margin-bottom">
                <div class="uk-card uk-card-default uk-card-hover">
                    <div class="uk-card-badge uk-background-default">
                        <a @click="deleteBook(book.id)" class="uk-icon-button" uk-icon="trash"></a>
                    </div>
                    <div class="uk-card-header">
                        <h3 class="uk-card-title">{{ book.title }}</h3>
                        <p class="uk-text-meta">{{ book.author }}</p>
                    </div>
                    <div class="uk-card-body">
                        <p v-if="book.description">
                        {{ book.description.length > 100
                            ? book.description.substring(0, 100) + '...'
                            : book.description }}
                        </p>
                        <p v-if="book.year" class="uk-text-meta">
                            Published: {{ book.year }}
                        </p>
                    </div>
                    
                    <div class="uk-card-footer">
                        <button 
                            class="uk-button uk-button-primary" 
                            @click="openModal(book)"
                        >
                            View Details
                        </button>
                    </div>
                </div>
            </div>
            <!-- Add book button (floating) -->
            <div class="uk-position-fixed uk-position-bottom-right uk-margin-right uk-margin-bottom">
                <button class="uk-button uk-button-primary uk-border-circle" style="width: 60px; height: 60px;">
                    <span uk-icon="icon: plus; ratio: 1.5"></span>
                </button>
            </div>
        </div>        
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import UIkit from "uikit"
import AddBookForm from './AddBookForm.vue'
import bookService from '../services/api.bookService'
import type { Book } from '../types/Book'

//State
const books = ref<Book[]>([])
const isLoading = ref<boolean>(true)
const error = ref<string | null>(null)
const bookToEdit = ref<Partial<Book> | null>(null)

const fetchBooks = async () => {
    try {
        isLoading.value = true;
        books.value = await bookService.getBooks()
    } catch (err) {
        error.value = 'Failed to load books'
        console.error(err)
    } finally {
        isLoading.value = false
    }
};
// Load book when component mounts
onMounted(async () => {
    fetchBooks()
});

// Function to open modal
const openModal = (book: Book | null = null) => {
    bookToEdit.value = book
    UIkit.modal("#add-book-modal").show()
}

const addNewBook = async (newBook: Book) => {
    try {
        isLoading.value = true
        const addedBook = await bookService.addBook(newBook)
        fetchBooks()
        UIkit.modal("#add-book-modal").hide()
    } catch (err) {
        error.value = 'Failed to add book'
        console.error(err)
    } finally {
        isLoading.value = false
    }
}

const deleteBook = async (bookId: number) => {
    try {
        isLoading.value = true
        await bookService.deleteBook(bookId)
        fetchBooks()
    } catch (err) {
        error.value = 'Failed to delete book'
        console.error(err)
    } finally {
        isLoading.value = false
    }
};

const updateExistingBook = async (updatedBook: Book) => {
    try {
        isLoading.value = true;
        await bookService.updateBook(updatedBook.id, updatedBook)
        fetchBooks()
        UIkit.modal("#add-book-modal").hide()
    } catch (err) {
        error.value = 'Failed to update book'
        console.error(err)
    } finally {
        isLoading.value = false
    }
}
</script>


<style scoped>
.uk-card {
    transition: transform 0.2s ease;
    height: 100%;
}

.uk-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}
</style>