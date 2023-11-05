import { Octokit } from 'octokit';
import { envs } from '../app-config';

const octokit = new Octokit({
  auth: envs.GITHUB_TOKEN,
});

export async function listRepos() {
  return (await octokit.rest.repos.listForUser({
    username: envs.GITHUB_USER_TO_SCAN,
  })).data;
}

// TODO: Limit to two in parallel
export async function getRepoDetails(repoName: string) {
  return (await octokit.rest.repos.get({
    owner: envs.GITHUB_USER_TO_SCAN,
    repo: repoName,
  })).data;
}

export async function getRepoWebhooks(repoName: string) {
  return (await octokit.rest.repos.listWebhooks({
    owner: envs.GITHUB_USER_TO_SCAN,
    repo: repoName,
  })).data;
}

export async function getRepoPathContent(repoName: string, path: string) {
  return (await octokit.rest.repos.getContent({
    owner: envs.GITHUB_USER_TO_SCAN,
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
