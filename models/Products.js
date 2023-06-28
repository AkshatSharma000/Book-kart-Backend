const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    bookId:{
        type: String,
        required:true,
    },
    name: {
        type: String,
        required: true,
    },
    imageURL:{
        type: String,
        required:true,
    },
    author: {
        type: String,
        required: true,
    },
    info: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    genre: {
        type: Array,
        required: true
    },
    category:{
        type: String,
        required: true,
    },
    seller: {
        type:String,
        required: true,
    }
})



module.exports = mongoose.model("Products",ProductSchema);