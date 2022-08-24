const mongoose = require('mongoose');

const dbConection = async() => {
    try {

        await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true,
            // useFindAndModify: false,
        });
        console.log('DB on line!')
        
    } catch (error) {
        console.log(error);
        throw new Error('Error al levantar la DB!!');
    }
}


module.exports = {
    dbConection
}