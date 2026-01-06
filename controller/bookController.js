const books = require("../models/bookModel");

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
    console.log(req.payload);
    const userMail = req.payload;

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

  try{
    const allbooks = await books.find()
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
    res.status(200).json({message:"last add boook details",lastAddbooks}) 
  }
  catch(err){
    console.log(err);
    
    res.status(400).json("error",err)
  }
}