// File Upload Component
import React from 'react';

export default function FileUpload() {
  const handleFileUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const input = e.target as HTMLFormElement;
    const fileInput = input.fileInput as HTMLInputElement;
    const file = fileInput?.files?.[0]; // Safely access the file

    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await fetch('http://localhost/api/upload', {
          method: 'POST',
          body: formData,
        });
        const result = await response.json();
        alert(`File uploaded: ${result.message}`);
      } catch (error) {
        console.error('File upload error:', error);
        alert('Error uploading file.');
      }
    }
  };

  return (
    <div>
      <h2>Upload File</h2>
      <form onSubmit={handleFileUpload}>
        <div className="form-group">
          <label htmlFor="fileInput">Choose file</label>
          <input
            type="file"
            className="form-control"
            id="fileInput"
            name="fileInput"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Upload
        </button>
      </form>
    </div>
  );
}
