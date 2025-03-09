<template>
    <div class="container uk-margin-top">
        <h1 class="uk-heading-medium">Books library</h1>

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
        <div v-else class="uk-grid uk-child-width-1-3@m uk-child-width-1-2@s" uk-grid>
            <div v-for="book in books" :key="book.id" class="uk-margin-bottom">
                <div class="uk-card uk-card-default uk-card-hover">
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
                            @click="viewBookDetails(book.id)"
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
import { ref, onMounted } from 'vue';
import bookService from '../services/bookService';
import type { Book } from '../types/Book';

//State
const books = ref<Book[]>([]);
const isLoading = ref<boolean>(true);
const error = ref<string | null>(null);

// Load book when component mounts
onMounted(async () => {
    try {
        isLoading.value = true;
        books.value = await bookService.getBooks();
    } catch (err) {
        error.value = 'Failed to load books';
        console.error(err);
    } finally {
        isLoading.value = false;
    }
});

//Function to navigate to book details
const viewBookDetails = (bookId: number) => {
    console.log('Viewing book details', bookId);
};
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