import React, { useState, useEffect } from 'react';

export default function FileList() {
  const [files, setFiles] = useState<string[]>([]); // State to store file names
  const [loading, setLoading] = useState<boolean>(true); // State for loading status
  const [errorList, setError] = useState<string | null>(null); // State for handling errors

  const apiUrl =
    process.env.NODE_ENV === 'development'
      ? 'http://fcatsdashboard.test'
      : 'https://www.fcats.com.my/storage';

  // Fetch the list of files from the API
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const token =
          'VUNmWM7m136oGjldohkkjoU1ROoM22XhI6h0RD0olR7qGIkXrHCdw5WUyOe5';
        const response = await fetch(`${apiUrl}/api/files`, {
          method: 'get',
          headers: {
            Authorization: `${token}`, // Bearer token typically used for Authorization
          },
        });

        if (!response.ok) {
          throw new Error(
            `HTTP error! status: ${response.status} - ${response.statusText}`,
          );
        }

        const data = await response.json();
        setFiles(data.files); // Set the fetched files in state
        setLoading(false); // Set loading to false once the request completes
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error('Error fetching files:', error);
          setError(error.message); // Set the error message in state
          setLoading(false);
        }
      }
    };

    fetchFiles(); // Call the function on component mount
  }, [apiUrl]); // Empty dependency array to only run on mount

  // Return JSX with loading, error, and file list handling
  return (
    <div className="mt-2">
      <h2>File List {apiUrl}</h2>
      {loading && <p>Loading files...</p>} {/* Display while loading */}
      {errorList && <p>Error: {errorList}</p>} {/* Display error message */}
      <div className="file-list-container">
        {/* Conditionally render the file list if files are available */}
        {files.length > 0 ? (
          <ul className="file-list">
            {files.map((file, index) => (
              <li key={index}>
                <a
                  href={`${apiUrl}/txt/${file}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {file}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          !loading && <p>No files available</p> // Show if there are no files after loading
        )}
      </div>
    </div>
  );
}
