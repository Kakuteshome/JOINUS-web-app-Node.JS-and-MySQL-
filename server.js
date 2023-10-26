const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

app.use(express.static('public')); // Assuming your web app files are in the 'public' folder.

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
