<script setup lang="ts">
import { Button } from '../interfaces/button';

interface Props {
    buttons: Button[]
}

const props = defineProps<Props>();


</script>

<template>
    <div class="fab">
        <q-btn
            v-for="btn of props.buttons"
                :key="btn.icon" 
                round 
                :color="btn.color || 'primary'"
                :icon="btn.icon" 
                :size="btn.size || 'md'"
                @click="btn.action"
                class="q-mr-sm"   
        />
    </div>
</template>

<style scoped>
    .fab{
        position: fixed;
        bottom: 30px;
        right: 30px;
    }
</style>