let mongoose = require('mongoose');

let listSchema = new mongoose.Schema({
    taskname: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        required: true,
        trim: true
    }, 
},
{
    timestamps: true
})

let List = mongoose.model('List', listSchema);

module.exports = List;