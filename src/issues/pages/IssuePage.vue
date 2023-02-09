<script setup lang="ts">
import LoaderSpinner from 'src/shared/components/LoaderSpinner.vue';
import { useRoute } from 'vue-router';
import IssueCard from '../components/issue-list/IssueCard.vue';
import useIssue from '../composables/useIssue';

const route = useRoute();
const { id = '' } = route.params;

const { issueQuery, issueCommentsQuery } = useIssue( +id )

</script>

<template>  

    <router-link class="text-white" to="/">Go Back</router-link>
    
    <!-- Header -->
    <LoaderSpinner 
        v-if="issueQuery.isLoading.value" 
        color="white" 
        :thickness="1" 
        size="1.5rem" 
        :showText="false" 
    />
    <IssueCard 
        v-else-if="issueQuery.data.value" 
        :issue="issueQuery.data.value"
    />
    <p v-else>Issue with Id {{ id }} not found</p>

    <!-- Comentarios -->
    <LoaderSpinner 
        v-if="issueCommentsQuery.isLoading.value" 
        :thickness="1" 
        size="1.5rem" 
        :showText="false" 
    />
    <div v-else-if="issueCommentsQuery.data.value" class="column">
        <span class="text-h3 q-mb-md">Comment ({{ issueCommentsQuery.data.value?.length }})</span>
        <IssueCard
            v-for="comment of issueCommentsQuery.data.value" 
            :key="comment.id" 
            :issue="comment"
        />
    </div>

</template>

<style scoped>

</style>