import React, { useEffect } from 'react';
import './repo-list.css';
import { getRepoList } from '../api';
import RepoOverview from '../../../../types/RepoOverview';
import { Link } from 'react-router-dom';

function RepoList() {
  const [data, setData] = React.useState<RepoOverview[]>([]);

  useEffect(() => {
    getRepoList().then((data) => {
      setData(data);
    });
  }, []);

  return (
    <div className="RepoList-wrapper">
      {data.map((repo) => (
        <Link to={`/repo/${repo.name}`} className={'RepoList-repo'} key={repo.id}>
          {repo.name}
        </Link>
      ))}
    </div>
  );
}

export default RepoList;
