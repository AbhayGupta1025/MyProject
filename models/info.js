//const { TooManyRequests } = require('http-errors');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

const infoschema = new Schema({
    
    email :{
        type: String,
        default: '',
        required: true
    },
    
    age :{
        type: String,
        default: '',
        required: true,
    },
    gender :{
        type: String,
        default: '',
        required: true,
    },
    country :{
        type: String,
        default: '',
        required: true,
    },
    facetype :{
        type: String,
        default: '',
        required: true,
    },
    facetone :{
        type: String,
        default: '',
        required: true,
    },
    bodytype :{
        type: String,
        default: '',
        required: true,
    }
},{
    timestamps: true
});

var Infos = mongoose.model('Info',infoschema);

module.exports = Infos;
