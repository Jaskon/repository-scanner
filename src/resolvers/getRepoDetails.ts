import {
  getRepoDetails as githubGetRepoDetails,
  getRepoFilesList,
  getRepoPathContent,
} from '../github-api';
import RepoDetails from '../../types/RepoDetails';

async function getRepoDetails(parent, args): Promise<RepoDetails> {
  const details = await githubGetRepoDetails(args.repoName);
  // const webhooks = await getRepoWebhooks(args.repoName);
  const allFiles = await getRepoFilesList(args.repoName);

  const firstYmlFilePath = allFiles.find((file) => file.name.endsWith('.yml'))?.path;
  const firstYmlFile = await getRepoPathContent(args.repoName, firstYmlFilePath);
  let firstYmlFileContent = null;
  if ('content' in firstYmlFile) {
    firstYmlFileContent = Buffer.from(firstYmlFile.content, 'base64').toString('ascii');
  }

  return {
    ...details,
    owner: details.owner.login,
    fileCount: allFiles.length,
    // webhooks,
    firstYmlFileContent,
  }
}

export default getRepoDetails;
