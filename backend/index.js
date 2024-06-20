import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import multer from "multer";
import path from "path";
import jwt from "jsonwebtoken";

const app = express();
const Port = 4040;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection setup
const dbURI = "mongodb+srv://samdoe15aug:gMT53z23nhDJHSci@cluster0.x1u13nu.mongodb.net/Ecommerce";

mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Multer configuration for file uploads
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage });

// Serve uploaded images statically
app.use('/images', express.static('upload/images'));

// Endpoint for uploading files
app.post('/upload', upload.single('product'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: 0, message: 'No file uploaded' });
    }
    res.json({
        success: 1,
        img_url: `http://localhost:${Port}/images/${req.file.filename}`
    });
});

// Root endpoint
app.get('/', (req, res) => {
    res.send('Express running');
});

// Schema for products
const productSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    new_price: { type: Number, required: true },
    old_price: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    available: { type: Boolean, default: true },
});

const Product = mongoose.model("Product", productSchema);

// Add product endpoint
app.post('/addproduct', async (req, res) => {
    try {
        const products = await Product.find({});
        const id = products.length > 0 ? products.slice(-1)[0].id + 1 : 1;

        const product = new Product({
            id,
            name: req.body.name,
            image: req.body.image,
            category: req.body.category,
            new_price: req.body.new_price,
            old_price: req.body.old_price,
        });

        await product.save();
        console.log(`Product ${product.id} ${product.name} saved`);
        res.json({ success: true, name: req.body.name });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});

// Remove product endpoint
app.post('/removeproduct', async (req, res) => {
    try {
        await Product.findOneAndDelete({ id: req.body.id });
        console.log("Product removed");
        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});

// Display all products endpoint
app.get('/allproducts', async (req, res) => {
    try {
        const products = await Product.find({});
        console.log("All products fetched");
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});

// Schema for users
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    cartData: { type: Object, default: {} },
    date: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);

// Signup endpoint
app.post('/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        let check = await User.findOne({ email });

        if (check) {
            return res.status(400).json({ success: false, error: 'Found Existing User with same id' });
        }

        const cart = {};
        for (let i = 0; i < 300; i++) {
            cart[i] = 0;
        }

        const user = new User({
            name: username,
            email,
            password,
            cartData: cart,
        });

        await user.save();

        const data = { user: { id: user.id } };
        const token = jwt.sign(data, 'secret_ecom');
        res.json({ success: true, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});


// ep for login

app.post('/login', async(req,res)=>{

    const {username,email,password} = req.body;

    let user = await User.findOne({email})

    if(user){
        const passCompare = password === user.password;
        if(passCompare ){
            const data = {
                user:{
                    id:user.id
                }

            }
            const token = jwt.sign(data,'secret_ecom');
            res.json({success:true ,token})

        }

        else {
            res.json({success:false , errors:"Wrong Password"})
        }
    }

    else {
        res.json({success:false , errors:"Wrong Email address"})
    }


})


// new 

app.get('/newcollection', async (req,res)=>{
    let products = await Product.find({});
    let newcollection= products.slice(1).slice(-8);
    console.log("newcollection");

    res.send(newcollection);
})


// popular in women

app.get('/popularinwomen', async (req, res) => {
    try {
        let products = await Product.find({ category: 'women' });
        let piw = products.slice(0, 4);
        console.log("women collected");
        res.send(piw);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
})


//fetch user 
const fetchUser = async(req, res, next)=>{
    const token = req.header('auth-token')
    if(!token){
        res.status(401).send({error:"Use right token"});
    }

    else {
        try{
            const data = jwt.verify(token,'secret_ecom');
            req.user = data.user;
            next();
        }
        catch(e){
                res.status(401).send({error:"use good token"});
        }
    }

}

// cart items add

app.post('/addtocart',fetchUser ,async (req, res)=>{
    let userData = await User.findOne({_id:req.user.id});
    userData.cartData[req.body.itemId] +=1;
    await User.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send("Added");
})


// remove 
app.post('/removecartdata',fetchUser ,async (req, res)=>{
    let userData = await User.findOne({_id:req.user.id});
    if( userData.cartData[req.body.itemId]>0)
    userData.cartData[req.body.itemId] -=1;
    await User.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send("Removed");
})

// retrieve 
app.post('/getcart',fetchUser, async (req,res)=>{
    let userData = await User.findOne({_id:req.user.id});
    res.json(userData.cartData)

    

})

// Start server
app.listen(Port, () => {
    console.log(`Server running on http://localhost:${Port}`);
});
