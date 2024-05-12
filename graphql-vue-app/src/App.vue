<script setup>
import { ref } from 'vue';
import { useQuery } from '@vue/apollo-composable';

import EditRating from './components/edit-rating.vue';
import AddBook from './components/add-book.vue';
import ALL_BOOKS_QUERY from './graphql/allBooks.query.gql';

const searchTerm = ref('');
const activeEditBook = ref(null);
const isNewBookAdditionRequested = ref(false);

const { result, loading, error } = useQuery(
  ALL_BOOKS_QUERY, 
  () => ({
    search: searchTerm.value
  }),
  () => ({
    debounce: 500
  })
);
</script>

<template>
  <add-book v-if="isNewBookAdditionRequested" :search="searchTerm" @close="isNewBookAdditionRequested = false"/>
  <template v-else>
    <button @click="isNewBookAdditionRequested = true">Add new book</button>
    <label for="searchCriteria" class="search-criteria">
      Search criteria:
      <input type="text" name="searchCriteria" v-model="searchTerm"/>
    </label>
    <edit-rating
      v-if="activeEditBook"
      :id="activeEditBook.id"
      :rating="activeEditBook.rating"
      :title="activeEditBook.title"
      @close="activeEditBook = null"
    />
    <template v-else>
      <p v-if="loading">Loading...</p>
      <p v-else-if="error">Something went wrong..</p>
      <template v-else>
        <p v-for="book in result?.allBooks">
          {{ book.title }} - {{ book.rating }}
          <button @click="activeEditBook = book">Edit rating</button>
        </p>
      </template>
    </template>
  </template>
</template>

<style scoped>
.search-criteria {
  display: flex;
  margin-bottom: 8px;
}
</style>
