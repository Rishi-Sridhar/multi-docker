const keys = require('./keys');

//Express app setup

const express= require('express');
const bodyParser = require('body-parser');
const cors= require('cors');

const app= express();
app.use(cors());
app.use(bodyParser.json());

// postgres client setup

const  { Pool } = require('pg');
const pgClient= new Pool({
    user: keys.pgUser,
    host: keys.pgHost,
    database: keys.pgDatabase,
    password: keys.pgPassword,
    port: keys.pgPort
});

pgClient.on('error', ()=> console.log('Lost PG connection'));

pgClient.query('CREATE TABLE IF NOT EXISTS values (number INT)')
    .catch(err=>console.log(err));

// redis client setup

const redis = require('redis');
const redisClient = redis.createClient({
    host: keys.redisHost,
    port: keys.redisPort,
    retry_strategy: () => 1000
});

const redisPublisher = redisClient.duplicate();

// express route handlers

app.get('/,',(req,res)=> {
    res.send('Hola');
});

app.get('/values/all', async(req,res)=> {
    const values= await pgClient.query('SELECT * FROM values');
    res.send(values.rows);
});

app.get('/values/current',  async(req,res)=> {
    redisClient.hgetall('values', (err,values)=> {
        res.send(values);
    });
});

app.post('/values', async(req,res)=> {
    const index= req.body.index;
    if(parseInt(index)>40)
        return res.status(422).send("Index too high!! Damn son do you really want me to run for decades or centuries!?!?! Use a goddammned smaller value goddammit!!");

    redisClient.hset('values',index,'Nothing yet!');
    redisPublisher.publish('insert',index);
    pgClient.query('INSERT INTO values(number) VALUES ($1)',[index]);
    res.send({working:true});
});

app.listen(500, err => {
    console.log('Sunrela hai bhai 500 pe...')
});