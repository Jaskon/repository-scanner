import { listRepos as githubListRepos } from '../github-api';
import RepoOverview from '../../types/RepoOverview';

async function listRepos(): Promise<RepoOverview[]> {
  const data = await githubListRepos();
  return data.map((repo) => ({
    ...repo,
    owner: repo.owner.login,
    obj: JSON.stringify(repo),
  }));
}

export default listRepos;
