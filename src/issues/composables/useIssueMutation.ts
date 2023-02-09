import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { Issue } from '../interfaces/issue';
import { githubApi } from '../../api/githubApi';

interface Args {
    title: string;
    labels?: string[];
    body?: string;
}

const addIssue = async( { title, body='', labels=[] }:Args ):Promise<Issue> => {
    
    const newIssueData = { title, body, labels }

    const { data } = await githubApi.post<Issue>('./issues', newIssueData)
    
    return data;

   
}

const useIssueMutation = () => {

    const queryClient = useQueryClient();

    const issueMutation = useMutation( addIssue, {        
        onSuccess:(issue) => {
           
            queryClient.invalidateQueries({ // Cuando se hace una inserción se invalidan la data del cache correspondiente a issues
            queryKey: ['issues'],
            exact: false
           });
           
           queryClient.refetchQueries(  //Acontinuación se vuelven a hacer la petición para el refresco de la data correspondiente a 'issues'
                ['issues'],
                {
                    exact: false,
                }
            );

            queryClient.setQueryData(   // y se establece la cache expecífica para el issue que estamos insertando
                ['issue', issue.number],
                issue
            )
        },
        
    })

    return {
        issueMutation
    }

}

export default useIssueMutation;

