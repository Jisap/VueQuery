import { useQuery } from '@tanstack/vue-query';
import { githubApi } from '../../api/githubApi';
import { useIssuesStore } from 'src/stores/issues';
import { computed } from 'vue';
import { Label } from '../interfaces/label';
//import { storeToRefs } from 'pinia';

const getLabels = async():Promise<Label[]> => {
    const { data } = await githubApi<Label[]>('/labels?per_page=100');
    return data
}

const useLabels = () => {

    const issuesStore = useIssuesStore();                       // Estado (store) de los labels
    //const { labels } = storeToRefs( issuesStore )

    const labelsQuery = useQuery(                               // Petición para obtener los labels
        ['labels' ],
        getLabels,
        {
            staleTime: 1000 * 60 * 60, // una hora
        }
    )

    return {
        labelsQuery,                                                        // Labels actuales según petición

        // Getters
        // selectedLabels: labels
        selectedLabels: computed( () => issuesStore.labels ),               //  Labels seleccionados despues de hacer click en ellos


        //Methods
        toggleLabel: issuesStore.toggleLabel                                // Método del store para añadir / quitar label

    }

}

export default useLabels;

