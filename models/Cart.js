const mongoose = require('mongoose');

cartSchema = new mongoose.Schema(
    {
        BookId: {type:String,required:true},
        Name: { type: String,required:true },
        Price: {type:Number,required:true},
        Category: {type: String,required:true},
        ImageURL:{type:String,required:true}
    },
);

module.exports = mongoose.model("Cart", cartSchema);

