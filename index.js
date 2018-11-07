const {app} = require('./app');
const port = process.env.PORT || 9000;
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/roommates')
    .then(() => console.log('connected to MongoDB...'))
    .catch((err) => console.error(('could not connect to MongoDB', err)));

app.listen(port, () => {
    console.log(`Server is listening on the port ${port}`)
});