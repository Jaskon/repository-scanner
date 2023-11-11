import {
  getRepoDetails as githubGetRepoDetails,
  getRepoPathContent,
} from '../github-api';
import RepoDetails from '../../types/RepoDetails';

async function getRepoDetails(parent, args): Promise<RepoDetails> {
  const { details, webhooks, files } = await githubGetRepoDetails(args.repoName);

  const firstYmlFilePath = files.find((file) => file.name.endsWith('.yml'))?.path;
  const firstYmlFile = await getRepoPathContent(args.repoName, firstYmlFilePath);
  let firstYmlFileContent = null;
  if ('content' in firstYmlFile) {
    firstYmlFileContent = Buffer.from(firstYmlFile.content, 'base64').toString('ascii');
  }


  return {
    ...details,
    owner: details.owner.login,
    fileCount: files.length,
    webhooks: webhooks.map(one => one.name),
    firstYmlFileContent,
  }
}

export default getRepoDetails;
