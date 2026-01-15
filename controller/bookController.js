const books = require("../models/bookModel");

const stripe = require('stripe')(process.env.paymentKey);

exports.addbook = async (req, res) => {
  try {
    console.log("inside the function");
    // res.send("req received...");
    console.log(req.body);
    const {
      title,
      author,
      noofpages,
      price,
      dprice,
      abstract,
      publisher,
      isbn,
      category,
      language,
      imageUrl,
    } = req.body;
    console.log();
    const UploadedImages = [];
    req.files.map((item) => UploadedImages.push(item.filename));
    console.log(UploadedImages);
    console.log("core",req.payload);
    const{ userMail,role} = req.payload;

    const existingBook = await books.findOne({ title, userMail });
    console.log(existingBook);
    if (existingBook) {
      console.log("books existing");
      res.status(402).json("book existing");
    } else {
      const newbook = new books({
        title,
        author,
        noofpages,
        price,
        dprice,
        abstract,
        publisher,
        isbn,
        category,
        language,
        imageUrl,
        userMail,
        UploadedImages,
      });
      await newbook.save();
      res.status(200).json({ message: "added", newbook });
      console.log(newbook);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json("error" + err);
  }
};


exports.getBooks = async(req,res)=>{
  
console.log(req.query);
searchKey = req.query.search


  try{

    const query ={
     title:{ $regex:searchKey,
      $options:'i'}
    }
    const allbooks = await books.find(query)
    res.status(200).json({message:"all boook details",allbooks}) 
  }
  catch(err){
    console.log(err);
    
    res.status(400).json("error",err)
  }
}

exports.latestBooks = async(req,res)=>{

  try{
    const lastAddbooks = await books.find().sort({_id:-1}).limit(4);
    res.status(200).json({message:"last add books",lastAddbooks}) 
  }
  catch(err){
    console.log(err);
    
    res.status(400).json("error",err)
  }
}

exports.viewBook = async(req,res)=>{
  const {id}=req.params
  console.log(req.params);
  console.log(id);
  try{
console.log('yfr');

  const bookdata = await books.findOne({ _id:id})
  // console.log(bookdata);

  res.status(200).json({message:"book",bookdata}) 
  
  }

  catch(err){
    console.log(err);
    res.send("errr")
    
  }
  
  
}

exports.payment = async (req,res)=>{
   console.log('inside  payment');
   const {bookdetails} = req.body
   const {userMail,role}= req.payload
   
  try{
     const existingbook = await books.findByIdAndUpdate(bookdetails._id,{ title:bookdetails.title,
        author:bookdetails.author,
        noofpages:bookdetails.noofpages,
        price:bookdetails.price,
        dprice:bookdetails.dprice,
        abstract:bookdetails.abstract,
        publisher:bookdetails.publisher,
        isbn:bookdetails.isbn,
        category:bookdetails.category,
        language:bookdetails.language,
        imageUrl:bookdetails.imageUrl,
        userMail:bookdetails.userMail,
        UploadedImages:bookdetails.UploadedImages,
        status:'sold',
        brought:userMail

      },{new:true})
      const line_items = [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: bookdetails.title,
            description: `${bookdetails.author} | ${bookdetails.publisher}`,
            images: [bookdetails.imageUrl],
            metadata: {
              title: bookdetails.title,
              author: bookdetails.author,
              noofpages: bookdetails.noofpages,
              imageUrl: bookdetails.imageUrl,
              price: bookdetails.price,
              dprice: bookdetails.dprice,
              abstract: bookdetails.abstract,
              publisher: bookdetails.publisher,
              language: bookdetails.language,
              isbn: bookdetails.isbn,
              category: bookdetails.category,
              UploadedImages: [bookdetails.UploadedImages],
              status: "sold",
              userMail: bookdetails.userMail,
              brought: userMail,
            },
          },
          unit_amount: Math.round(Number(bookdetails.dprice) * 100),
        },
        quantity: 1,
      },
    ];

   
const session = await stripe.checkout.sessions.create({
  payment_method_types:['card'],
  success_url: 'http://localhost:5173/payment-success',
  cancel_url:'http://localhost:5173/payment-error',
  line_items,
  mode: 'payment',
});
   res.status(200).json({message:"payement success"})
  }
  catch(err){
    console.log(err);
    
    res.status(500).json({message:'unsccessfull',dataerr:err})
  }

  
}

