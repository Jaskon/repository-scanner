import React, { useEffect, useState } from 'react';
import './repo-details.css';
import { useParams } from 'react-router-dom';
import { getRepoDetails } from '../api';
import IRepoDetails from '../../../../types/RepoDetails';

function RepoDetails() {
  const { repoName } = useParams();

  const [data, setData] = useState<IRepoDetails>([]);

  useEffect(() => {
    getRepoDetails(repoName || '').then((data) => {
      setData(data);
      console.log(data);
    });
  }, [repoName]);


  // TODO: Prettify a bit

  return (
    <div>
      <h1>Repo Details</h1>
      <p>Repo Name: {repoName}</p>
      {data && (
        <>
          <p>Owner: {data.owner}</p>
          <p>File count: {data.fileCount}</p>
          <p>Size: {data.size}</p>
          <p>Is private: {data.private}</p>
          <p>First yml file content: {data.firstYmlFileContent}</p>
        </>
      )}
    </div>
  );
}

export default RepoDetails;
