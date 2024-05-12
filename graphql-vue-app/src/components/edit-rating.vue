<script setup lang="ts">
import { ref } from 'vue';
import { useMutation } from '@vue/apollo-composable';
import UPDATE_BOOK_MUTATION from '../graphql/updateBook.mutation.gql';

const props = defineProps<{
    id: string;
    rating: number;
    title: string;
}>();

const emit = defineEmits<{
    (e: 'close'): void
}>();

const newRating = ref(null);
const { mutate: editRating, onDone, loading, error } = useMutation(UPDATE_BOOK_MUTATION, () => ({
    variables: {
        input: {
            id: props.id,
            rating: newRating.value
        }
    }
}));

onDone(() => {
    emit('close');
});

</script>

<template>
    <p v-if="loading">Updating...</p>
    <p v-if="error">{{  error }}</p>
    <span>Edit rating for <b>{{ title }}</b>: </span>
    <input type="number" v-model.number="newRating" @keyup.enter="editRating" @keyup.esc="emit('close')"/>
</template>