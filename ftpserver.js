const express = require('express');
const ftp = require('basic-ftp');

const app = express();
const PORT = 3001;

app.get('/list-files', async (req, res) => {
  const client = new ftp.Client();
  client.ftp.verbose = true;

  try {
    await client.access({
      host: '60.54.34.18', // Replace with your FTP host
      user: 'fcsbrhb@2024', // Replace with your FTP username
      password: 'fcsbrhb',
      secure: false, // Use true for FTPS
    });
    const fileList = await client.list('/');
    res.json(fileList);
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    client.close();
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
