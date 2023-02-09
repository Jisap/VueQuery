<script setup lang="ts">
import { ref } from 'vue';
import LoaderSpinner from '../../shared/components/LoaderSpinner.vue';
import FilterSelector from '../components/filter-selector/FilterSelector.vue';
import FloatingButtons from '../components/FloatingButtons.vue';
import IssueList from '../components/issue-list/IssueList.vue';
import NewIssueDialog from '../components/NewIssueDialog.vue';
import useIssues from '../composables/useIssues';
import useLabels from '../composables/useLabel';
import { SizeButton } from '../interfaces/button';




const { issuesQuery } = useIssues();
const { labelsQuery } = useLabels();

const isOpen = ref<boolean>(false)

const openDialog = () => {
    isOpen.value = true;
}

</script>

<template>
    <div class="row q-mb-md">
        <div class="col-12">
            <span class="text-h4">Github Issues</span>
        </div>
    </div>

    <div class="row">
        <div class="col-xs-12 col-md-4">
            <!-- Filtros -->
            <FilterSelector />
        </div>
        <div class="col-xs-12 col-md-8">
            <!-- Loader -->
            <LoaderSpinner
                v-if="issuesQuery.isLoading.value"    
            />

            <!-- IssueList - Array de IssueCard -->
            <IssueList v-else :issues="issuesQuery.data?.value || []"/>
        </div>
    </div>

    <!-- Botones flotantes -->
    <FloatingButtons :buttons="[
        {
            icon: 'add',
            color: 'primary',
            size: SizeButton.xl,
            action: openDialog,
        },
    ]"/>

    <!-- Dialog de new Issue -->
    <NewIssueDialog 
        :is-open="isOpen"
            v-if="labelsQuery.data " 
            :labels="labelsQuery.data.value?.map( label => label.name) || []" 
        @on-close="isOpen=false"
    />

</template>

<style scoped>

</style>