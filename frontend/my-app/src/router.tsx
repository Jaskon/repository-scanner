import { createBrowserRouter } from 'react-router-dom';
import RepoList from './pages/repo-list';
import RepoDetails from './pages/repo-details';

export default createBrowserRouter([
  {
    path: '/',
    element: <RepoList />
  },
  {
    path: '/repo/:repoName',
    element: <RepoDetails />
  }
]);
