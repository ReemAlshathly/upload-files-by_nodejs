const express = require('express');
const multer  = require('multer');
const {default: mongoose} = require('mongoose');
const Product = require('./models/create_product');
const app = express();
app.use(express.static("public/"));

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        if(file.mimetype == "image/png" || file.mimetype == "image/jpg")
            cb(null,'public/imgs/');
        else if(file.mimetype == "application/pdf")
            cb(null,'public/pdfs/');
    },
    filename:(req, file, cb)=>{
        var extension = file.originalname.split('.');
        var ext = extension[extension.length - 1];
        var imgName = file.filename + '-'+ Date.now() + '-' + Math.round(Math.random() * 1E9) + '.' + ext;
        // var imgName = Date.now() + '-' + Math.round(Math.random() * 1E9)+file.originalname;

        cb(null, imgName);
    }
}) 
const upload = multer({
    storage: storage,
    fileFilter: (req, file, callback)=>{
        if(file.mimetype == "image/png" || file.mimetype == "image/jpg" ||  file.mimetype == "application/pdf")
            callback(null, true)
        else callback(null, false);
    },
    limits:1024*1024 *5,
});

app.set('view engine', 'ejs');
app.use(express.urlencoded());

mongoose.connect('mongodb://localhost:27017/coding_academy');
// .then((result)=>console.log(result)).catch((err)=>console.log(err));

app.get('/', (req, res)=>{
    res.render('index');
});

app.get('/product/list', (req, res)=>{
    Product.find().then(result =>{
        res.render("show_products", {products: result});
    });  
});


// app.post('/product/add', upload.fields([{name:"p_image"}, {name: "p_image_2"}]), (req, res)=>{
//     res.end();
// });
app.post('/product/add', upload.single('p_image'), (req, res)=>{
    const product = new Product({
        id:mongoose.Types.ObjectId,
        name: req.body.user,
        Email: req.body.Email,
       
        image:req.file.filename,
    }).save();
    res.redirect('/product/list');
});

app.listen(4000, console.log('listening on port 4000'));