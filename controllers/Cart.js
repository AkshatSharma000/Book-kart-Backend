const CartDetails = require('../models/Cart');

exports.cartInfoAdd = async(req,res,next) => {
    console.log(req.body);
    
    // CartDetails.findOne({BookId:req.body})
    const cartInfo = new CartDetails({
        EmailId:req.body.EmailId,
        BookId: req.body.BookId,
        Name: req.body.Name,
        Price: req.body.Price,
        Category: req.body.Category,
        ImageURL: req.body.ImageURl
    });
    cartInfo.save().then((data)=>{
        if(!data){
            res.status(400).send({message:"error in saving the data"});
            return;
        }
        return res.status(200).send({message:"added to cart"});

    })

};

exports.cartInfo = async(req,res,next) =>{
    console.log(req.body);
    await CartDetails.find({email:req.body.email})
    .then((data)=>{
        if(data)
        return req.status(200).send(data);
        else
        return req.status(400).send({message:"Error occured"});
    })
}
