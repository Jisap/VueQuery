<script setup lang="ts">
import useLabels from 'src/issues/composables/useLabel';
import LoaderSpinner from 'src/shared/components/LoaderSpinner.vue';
 
     const { labelsQuery, toggleLabel, selectedLabels } = useLabels()
     
</script>

<template>
<div class="q-mt-md">

     <LoaderSpinner 
          v-if="labelsQuery.isLoading.value"  
          size="50px" 
          :thickness="1" 
          :show-text="false"
     />
     <q-chip 
          v-else  
          v-for="label of labelsQuery.data.value" :key="label.id"
          :style="{ color: `#${label.color}`, backgroundColor:'#A04000'}"
          :outline="!selectedLabels.includes( label.name ) ? true : false"
          clickable
          @click="toggleLabel( label.name )" 
      >
      <!-- El click en el label modifica el estado en store del array de labels -->
       {{ label.name }}
     </q-chip>

</div>
</template>

<style scoped>

</style>