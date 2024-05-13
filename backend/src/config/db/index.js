const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect(
            'mongodb+srv://hotelbooking:nQJ7ZN4Jqp8FjEF3@hotelbooking.iybvemx.mongodb.net/',
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            },
        );
        console.log('Success');
    } catch (error) {
        console.log('Failed');
    }
}

module.exports = { connect };
