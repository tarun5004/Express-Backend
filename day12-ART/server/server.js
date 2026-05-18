require('dotenv').config();
let app = require('./src/app');

let PORT = process.env.PORT || 4000;

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})


