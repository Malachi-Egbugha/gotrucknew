const express = require("express");
const port = 4005;
const path = require("path");

const app = express();
app.use(express.static(path.join(__dirname,  "build")));


app.get('/*', function(req,res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.listen(process.env.PORT || port, () => {
  console.log(`server is listen on port ${port}`);
});




