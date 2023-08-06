const mongoose = require('mongoose');

// mongoUri = 'mongodb://localhost:27017/inotebook?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false'
mongoUri = 'mongodb://localhost:27017'

async function connnecttodb() {
    mongoose.connect(mongoUri, () => {
        console.log("Connected to MongoDb successfully!!");
    });
}

connnecttodb();

module.exports =connnecttodb;