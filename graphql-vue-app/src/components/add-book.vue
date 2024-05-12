<script setup lang="ts">
import { reactive } from 'vue';
import ADD_BOOK_MUTATION from '../graphql/addBook.mutation.gql';
import ALL_BOOKS_QUERY from '../graphql/allBooks.query.gql';
import { useMutation } from '@vue/apollo-composable';

const props = defineProps<{
    search: String;
}>();

const emit = defineEmits<{
    (e: 'close'): void
}>();

const newBook = reactive({
    title: '',
    rating: 0,
    description: '',
    author: '',
    year: 0
});

const { mutate: addBook, onDone } = useMutation(ADD_BOOK_MUTATION, () => ({
    variables: {
        input: newBook
    },
    update(cache, response) {
        const sourceData = cache.readQuery({
            query: ALL_BOOKS_QUERY,
            variables: {
                search: props.search
            }
        });

        const data = {
            allBooks: [...sourceData.allBooks, response.data.addBook]
        }

        cache.writeQuery({
            data,
            query: ALL_BOOKS_QUERY,
            variables: {
                search: props.search
            }
        });
    }
}));

onDone(() => emit('close'));
</script>

<template>
    <form @submit.prevent="addBook()">
        <div class="form__input">
            <label for="title">Title:</label>
            <input name="title" type="text" v-model.trim="newBook.title" required/>
        </div>
        <div class="form__input">
            <label for="rating">Rating:</label>
            <input name="rating" type="number" v-model.number="newBook.rating" step="any"/>
        </div>
        <div class="form__input">
            <label for="description">Description:</label>
            <input name="description" type="text" v-model="newBook.description"/>
        </div>
        <div class="form__input">
            <label for="author">Author:</label>
            <input name="author" type="text" v-model="newBook.author" required/>
        </div>
        <div class="form__input">
            <label for="year">Year:</label>
            <input name="year" type="number" v-model.number="newBook.year" required/>
        </div>
        <button type="submit">Submit</button>
        <button type="reset" @click="emit('close')">Reset</button>
    </form>
</template>

<style scoped>
.form__input {
    margin-bottom: 6px;
}

.form__input > input {
    margin-left: 3px;
}
</style>