import React from 'react';

export default function FileUpload() {
  const handleFileUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Get the form element and the file input
    const input = e.target as HTMLFormElement;
    const fileInput = input.elements.namedItem(
      'excel_file',
    ) as HTMLInputElement;
    const file = fileInput?.files?.[0]; // Safely access the file

    const apiUrl =
      process.env.NODE_ENV === 'development'
        ? 'http://fcatsdashboard.test/api'
        : 'https://www.fcats.com.my/api';

    if (file) {
      const formData = new FormData();
      formData.append('excel_file', file);

      try {
        const token =
          'VUNmWM7m136oGjldohkkjoU1ROoM22XhI6h0RD0olR7qGIkXrHCdw5WUyOe5';

        // Make the request with fetch
        const response = await fetch(`${apiUrl}/uploadfile`, {
          method: 'POST',
          headers: {
            Authorization: `${token}`, // Bearer token typically used for Authorization
          },
          body: formData,
        });

        // Handle HTTP errors (e.g., 400, 500)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status} -
        ${response.statusText}`);
        }

        // Parse the response JSON
        const result = await response.json();
        alert(`File uploaded: ${result.message}`);
      } catch (error: unknown) {
        if (error instanceof Error) {
          // Display error details in case of failure
          console.error('File upload error:', error);
          alert(`Error uploading file: ${error.message}`);
        }
      }
    } else {
      alert('No file selected');
    }
  };

  return (
    <div className="mt-2">
      <h2>Format Conversion</h2>
      <form onSubmit={handleFileUpload}>
        <div className="form-group">
          <label htmlFor="fileInput">Choose file</label>
          <input
            type="file"
            className="form-control"
            id="excel_file"
            name="excel_file"
          />
        </div>
        <div className="form-group mt-2">
          <label htmlFor="fileInput">Sheet No:</label>
          <select className="form-control" name="sheetNo">
            <option value="1">Sheet 1</option>
            <option value="2">Sheet 2</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary mt-2">
          Upload
        </button>
      </form>
    </div>
  );
}
