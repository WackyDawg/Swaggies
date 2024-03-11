const express = require('express');
//const

const app = express();
const PORT = 3535;
app.get('/products', (req, res) => {
res.json()
})


app.listen(PORT, () => {
  console.log('Server up and running');
});
