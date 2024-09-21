import React, { useState, useEffect } from 'react';

export default function FTPFolder() {
  const [fileList, setFileList] = useState<string[]>([]);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await fetch('http://localhost:3001/list-files');
        const data = await response.json();
        const files = data.map((file: any) => file.name);
        setFileList(files);
      } catch (err) {
        console.error('Error fetching files:', err);
      }
    };

    fetchFiles();
  }, []);

  return (
    <div>
      <h2>FTP Folder File List</h2>
      <ul>
        {fileList.map((file) => (
          <li key={file}>{file}</li>
        ))}
      </ul>
    </div>
  );
}
