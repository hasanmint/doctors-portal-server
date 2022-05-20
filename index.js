const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;


//Middileware
app.use(cors());
app.use(express.json());

//database
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wucrg.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const serviceCollection = client.db('doctors-portal').collection('services');

        //Read Data
        app.get('/service',async(req,res)=>{
            const query={};
            const curser=serviceCollection.find(query);
            const services=await curser.toArray();
            res.send(services);
        })



    } finally {

    }
}
run().catch(console.dir);


//server
app.get('/', (req, res) => {
    res.send('Hello Doctors!')
})

app.listen(port, () => {
    console.log(`Doctors app listening on port ${port}`)
})