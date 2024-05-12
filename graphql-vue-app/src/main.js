import { createApp, provide, h } from 'vue'
import './style.css'
import App from './App.vue'
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'
import { DefaultApolloClient } from '@vue/apollo-composable';

const cache = new InMemoryCache();

const apolloClient = new ApolloClient({
    link: createHttpLink({
        uri: 'http://localhost:4000/graphql'
    }),
    cache
});

// apolloClient.query({
//     query: ALL_BOOKS_QUERY
// }).then(res => {
//     console.log(res);
// });

const app = createApp({
    setup() {
        provide(DefaultApolloClient, apolloClient)
    },
    render: () => h(App)
})
app.mount('#app')
