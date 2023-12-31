import { Octokit } from 'octokit';
import { envs } from '../app-config';
import PromisePool from '../utils/promise-pool';


let user = '';

const octokit = new Octokit({
  auth: envs.GITHUB_TOKEN,
});
octokit.rest.users.getAuthenticated().then(_user => {
  user = _user.data.login
});
const promisePool = new PromisePool(2);


export async function listRepos() {
  return (await octokit.rest.repos.listForAuthenticatedUser({
    username: user,
    type: 'owner',
  })).data;
}

export async function getRepoDetails(repoName: string) {
  async function inner() {
    console.debug('getRepoDetails. User:', user, 'Repo:', repoName);
    const repoDetails = (await octokit.rest.repos.get({
      owner: user,
      repo: repoName,
    })).data;

    const files = await getRepoFilesList(repoName);
    const webhooks = await getRepoWebhooks(repoName);

    return {
      details: repoDetails,
      files,
      webhooks
    }
  }

  return await promisePool.add(async () => {
    return await inner();
  });
}

export async function getRepoWebhooks(repoName: string) {
  return (await octokit.rest.repos.listWebhooks({
    owner: user,
    repo: repoName,
  })).data;
}

export async function getRepoPathContent(repoName: string, path: string) {
  return (await octokit.rest.repos.getContent({
    owner: user,
    repo: repoName,
    path,
  })).data;
}

export async function getRepoFilesList(repoName: string) {
  const files = [];

  const recurse = (path: string) => {
    return new Promise<void>((resolve) => {
      const promises = [];

      getRepoPathContent(repoName, path).then((content) => {
        if (Array.isArray(content)) {
          content.forEach(item => {
            if (item.type === 'dir') {
              promises.push(recurse(item.path));
            } else {
              files.push(item);
            }
          });
        } else {
          files.push(content);
        }

        Promise.all(promises).then(() => {
          resolve();
        });
      });
    });
  }

  await recurse('');

  return files;
}
