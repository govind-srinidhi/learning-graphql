<script setup>
import { ref } from 'vue';
import { useQuery } from '@vue/apollo-composable';
import ALL_BOOKS_QUERY from './graphql/allBooks.query.gql';

const searchTerm = ref('');
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
  <input v-model="searchTerm"/>

  <p v-if="loading">Loading...</p>
  <p v-else-if="error">Something went wrong..</p>
  <template v-else>
    <div v-for="book in result?.allBooks">{{ book.title }}</div>
  </template>
</template>
