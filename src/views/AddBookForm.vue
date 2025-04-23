<template>
    <div id="add-book-modal" uk-modal>
        <div class="uk-modal-dialog uk-modal-body">
            <h2 class="uk-modal-title">{{ isEditMode ? 'Edit Book' : 'Add New Book' }}</h2> 
            <form @submit.prevent="submitForm" class="uk-form-stacked">
                <div class="uk-margin">
                    <label class="uk-form-label" for="title">Title</label>
                    <input class="uk-input" type="text" id="title" v-model="form.title" required>
                </div>
                <div class="uk-margin">
                    <label class="uk-form-label" for="author">Author</label>
                    <input class="uk-input" type="text" id="author" v-model="form.author" required>
                </div>
                <div class="uk-margin">
                    <label class="uk-form-label" for="year">Year</label>
                    <input class="uk-input" type="number" id="year" v-model.number="form.year" required>
                </div>
                <div class="uk-margin">
                    <label class="uk-form-label" for="year">Genre</label>
                    <input class="uk-input" type="text" id="genre" v-model="form.genre" required>
                </div>
                <div class="uk-margin">
                    <label class="uk-form-label" for="description">Description</label>
                    <textarea class="uk-textarea" id="description" v-model="form.description"></textarea>
                </div>
                <button type="submit" class="uk-button uk-button-primary">{{ isEditMode ? 'Update' : 'Add' }}</button>
            </form>
            <button class="uk-modal-close-default" type="button" uk-close></button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

import type { Book } from '@/types/Books'

const props = defineProps<{
    bookToEdit: Partial<Book> | null
}>()

const emit = defineEmits<{
    (e: 'addBook', book: Partial<Book>): void;
    (e: 'editBook', book: Partial<Book>): void;
}>();

const form = ref<Partial<Book>>({
    title: '',
    author: '',
    genre: '',
    description: '',
    year: undefined,
});

const originalBook = ref<Partial<Book> | null>(null);

const isEditMode = computed(() => props.bookToEdit !== undefined && props.bookToEdit !== null);

watch(
    () => props.bookToEdit,
    (newVal) => {
        if (newVal) {
            form.value = { ...newVal }; // clone to avoid mutating prop
            originalBook.value = { ...newVal }; // store original book for comparison
        } else {
            // reset form when switching from edit to add
            form.value = {
                title: '',
                author: '',
                description: '',
                genre: '',
                year: undefined,
            };
        }
    },
    { immediate: true }
);

const getChangedFields = () => {
    const changedFields: Partial<Book> = {};
    for (const key in form.value) {
        if (form.value[key] !== originalBook.value?.[key]) {
            changedFields[key] = form.value[key];
        }
    }
    return changedFields;
}

const submitForm = () => {
    if (isEditMode.value) {
        const changedFields = getChangedFields();
        if (Object.keys(changedFields).length === 0) {
            UIkit.modal('#add-book-modal').hide();
            return; // No changes made, just close the modal
        }
        console.log('Changed fields:', changedFields);
        changedFields.id = originalBook.value?.id; // Ensure the ID is included for editing
        emit('editBook', changedFields);
    } else {
        emit('addBook', form.value);
    }

    // Reset form after submission
    form.value = {
        title: '',
        author: '',
        description: '',
        year: undefined,
    };

    UIkit.modal('#add-book-modal').hide();
};

</script>