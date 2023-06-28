const Products = require("../models/Products");
const { validationResult } = require("express-validator");

exports.productsGet = async (req,res,next) =>{
    console.log("Product list called");
    // console.log(req.query);
    await Products.find({})
    .then((prod)=>{
        if(prod)
        res.status(200).send({Products:prod});
        else
        res.status(500).send({message:"Internal Server error"});
    })
}

exports.productsPost = async (req,res,next) =>{
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(422).send({ message: "Error occured at validation" });
        return;
    }
    const productData = new Products({
        bookId: req.body.bookId,
        name: req.body.name,
        imageURL: req.body.imageURL,
        author: req.body.author,
        info: req.body.info,
        price: req.body.price,
        genre: req.body.genre,
        category: req.body.category,
        seller: req.body.seller
    });
    productData.save().then((data)=>{
        if(!data){
            res.status(400).send({message:"Error in adding product"});
            return;
        }
        return res.status(201).send({message:"Product added successfully"});
    });
};

exports.productUpdate = async (req,res,next) =>{
    console.log(req.body);
    await Products.findOneAndUpdate({bookId:req.body.bookId},{
        bookId: req.body.bookId,
        name: req.body.name,
        imageURL: req.body.imageURL,
        author: req.body.author,
        info: req.body.info,
        price: req.body.price,
        genre: req.body.genre,
        category: req.body.category,
        seller: req.body.seller
    })
    .then((data)=>{
        if(!data){
            res.status(400).send({message:"Error in Updating product"});
            return;
        }
        return res.status(201).send({message:"Product Updated successfully"});
    })

}

exports.productInfo = async (req,res,next) =>{
    console.log(req.body);
    await Products.findOne({bookId:req.body.bookId})
    .then((data)=>{
        if(data)
        res.status(200).send({product:data});
        else
        res.status(500).send({message:"NO record found"});
    });
};

exports.productInfoSeller = async (req,res,next) =>{
    console.log(req.body);
    await Products.findOne({bookId:req.body.bookId,seller:req.body.seller})
    .then((data)=>{
        if(data)
        res.status(200).send({product:data});
        else
        res.status(500).send({message:"NO record found"});
    });
};

exports.productBySeller = async (req,res,next) =>{
    console.log(req.body);
    await Products.find({seller:req.body.seller})
    .then((data)=>{
        if(data)
        res.status(200).send({data});
        else
        res.status(500).send({message:"No record Found"});
    })
}