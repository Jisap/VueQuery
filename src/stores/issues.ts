import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { State } from '../issues/interfaces/issue';

export const useIssuesStore = defineStore('issues', () => {

    const state = ref<State>(State.All); // valor por defecto all
    const labels = ref<string[]>([]);


    return {
        // State propierties
        state,
        labels,

        // Getters
        

        // Actions
        toggleLabel( labelName: string ){
            if( labels.value.includes( labelName )){                                
                labels.value = labels.value.filter(label => label !== labelName) // labels solo contendrá lo que se a pulsado
                return
            }

            labels.value.push( labelName )


        }
    }
})
