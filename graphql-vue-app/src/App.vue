<script setup>
import { useQuery } from '@vue/apollo-composable';
import ALL_BOOKS_QUERY from './graphql/allBooks.query.gql';

const { result } = useQuery(ALL_BOOKS_QUERY);
</script>

<template>
  <div v-for="book in result?.allBooks">{{ book.title }}</div>
</template>
