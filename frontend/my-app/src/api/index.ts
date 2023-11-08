import AppConfig from '../app-config';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import RepoOverview from '../../../../types/RepoOverview';
import RepoDetails from '../../../../types/RepoDetails';

const client = new ApolloClient({
  uri: AppConfig.BASE_URL,
  cache: new InMemoryCache(),
});

export async function getRepoList(): Promise<Array<RepoOverview>> {
  const data = await client.query({
    query: gql`
      query ListRepos {
        listRepos {
          name
          owner
          size
        }
      }
    `
  });

  return data.data.listRepos;
}

export async function getRepoDetails(repoName: string): Promise<RepoDetails> {
  const data = await client.query({
    query: gql`
      query GetRepoDetails($repoName: String!) {
        getRepoDetails(repoName: $repoName) {
          name
          owner
          fileCount
          size
          private
          firstYmlFileContent
        }
      }
    `,
    variables: {
      repoName,
    },
  });

  return data.data.getRepoDetails;
}
