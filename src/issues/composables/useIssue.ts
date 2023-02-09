import { useQuery, useQueryClient } from "@tanstack/vue-query";
import { githubApi } from "src/api/githubApi";
import { Issue } from "../interfaces/issue";



const sleep = ():Promise<boolean> => {
    return new Promise( resolve => {
        setTimeout(() => {
            resolve( true )
        }, 2000);
    })
}

const getIssue = async( issueNumber: number ):Promise<Issue> => {   
    await sleep();
    const { data } = await githubApi.get<Issue>(`/issues/${issueNumber}`)
    return data
}

const getIssueComments = async (issueNumber: number): Promise<Issue[]> => {
    await sleep();
    const { data } = await githubApi.get<Issue[]>(`/issues/${issueNumber}/comments`)
    return data
}

interface Options {
    // Autoload issue and comments
    autoload?: boolean;
}

const useIssue = ( issueNumber: number, options?:Options ) => {

    const { autoload = true } = options || {};

    const queryClient = useQueryClient()

    const issueQuery = useQuery(
        [ 'issue', issueNumber ],
        () => getIssue( issueNumber ),
        {
            staleTime: 1000 * 60 * 60,
            enabled: autoload
        }
    );

    const issueCommentsQuery = useQuery(
        ['issue', issueNumber, 'comments'],
        () => getIssueComments(issueNumber),
        //() => getIssueComments( issueQuery.data.value?.number || 0), // El argumento numérico viene de la anterior petición
        {
            staleTime: 1000 * 60 * 60,
            enabled: autoload
        //  enabled: computed( () => !!issueQuery.data.value ) // issueCommentsQuery se ejecutará si el issueQuery tiene algún valor
        }
    );

    const prefetchIssue = (issueNumber: number) => { // queryClient es un cliente de consulta personalizable que se puede usar
        queryClient.prefetchQuery(                   // para realizar peticiones en cualquier parte de la aplicación.
            ['issue', issueNumber ],                 // Con los prefetchQuery precargamos la data de los issues cuando
            () => getIssue( issueNumber ),           // el ratón pasa por encima del issueCard   
            {
                staleTime: 1000 * 60 * 60
            }
        );

        queryClient.prefetchQuery(
            ['issue', issueNumber, 'comments'],
            () => getIssueComments( issueNumber ),
            {
                staleTime: 1000 * 60 * 60
            }
        );

    }

    const setIssueCacheData = (issue: Issue) => { // Con setQueryData establecemos la cache precargada en la petición
        queryClient.setQueryData(                 // de los issues, que contiene todos los issues
            ['issue', issue.number],
            issue
        );
    }

    return {
        issueQuery,
        issueCommentsQuery,

        // Methods
        prefetchIssue,
        setIssueCacheData
    }

}

export default useIssue;

