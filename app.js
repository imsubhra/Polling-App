const express=require('express')
const path=require('path')
const app=express()
const bodyParser=require('body-parser')
const mongoose  = require('mongoose')
const {MONGOURI} = require('./configs/keys')

mongoose.connect(MONGOURI,{
    useNewUrlParser:true,
    useUnifiedTopology: true
})

mongoose.connection.on('connected',()=>{
    console.log('connected')
})
mongoose.connection.on('error',(err)=>{
    console.log('err connecting',err)
})

const poll=require('./routes/poll')

//set public folder
app.use(express.static(path.join(__dirname,'public')))

//body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))



app.use('/poll',poll)

//start server
const port=process.env.port ||3000;
app.listen(port, () => console.log(`Server started on port ${port} `));
