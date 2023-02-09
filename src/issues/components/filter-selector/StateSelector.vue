<script setup lang="ts">
import { ref } from 'vue'
import { useIssuesStore } from '../../../stores/issues';

 	const issuesStore = useIssuesStore();



</script>

<template>
    <q-btn-toggle 
        v-model="issuesStore.state" 
        push 
        glossy 
        toggle-color="primary" 
        :options="[
            { label: 'All', value: '' },
            { label: 'Open', value: 'open' },
            { label: 'Closed', value: 'closed' }
        ]" 
    />
</template>

<style scoped>

</style>