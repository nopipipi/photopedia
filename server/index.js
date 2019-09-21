var http = require('http')
var express = require('express')
var app = express()
var bodyParser = require('body-parser');
var mysql = require('mysql')
var multer = require('multer')
const jwt = require('jsonwebtoken')

var conn = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "",
    database : "dbtugas"
})

app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
app.use((req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    if (req.method === "OPTIONS"){
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        return res.status(200).json({});
    }
    next();
})

conn.connect((err)=>{
    if(err)
        console.log("Problem with MySQL " + err);
    else
        console.log("Connected with Database");
})

var secret_key = "key"

app.post('/daftar', (req, res)=>{
    var data = ({
        username : req.body.username,
        firstname : req.body.firstname,
        lastname : req.body.lastname,
        password : req.body.password
    })

    conn.query("INSERT INTO users SET ?", data, (err, result)=>{
        var payload = {
            id : result.insertId,
            username : data.username
        }
        var token = jwt.sign(payload, secret_key, {expiresIn:'2d'})
        res.json({
            id : data.username,
            token : token
        })
    })

    // conn.query("INSERT INTO users SET ?", data, (err, result)=>{
    //     if(err) res.status(400).json(err)
    //     else res.status(200).json(result)
    // })
})

app.post('/login', (req, res)=>{
    var username = req.body.username 
    var password = req.body.password
    conn.query("SELECT * FROM users WHERE username = '" + username + "' and password = '" + password + "'",(err, rows)=>{
        if(rows.length > 0){
            var payload = {
                id : rows[0].id,
                username : rows[0].username
            }
            var token = jwt.sign(payload, secret_key, {expiresIn:'2d'})
            res.status(200).json({
                id : rows[0].username,
                token : token
            })
        }
        else{
            res.status(401).json({message:'email & password tidak valid'})
        }
    })
})

const checkAuth = (req, res, next)=>{
    try{
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, secret_key);
        req.userData = decoded;
        next();
    }
    catch(error){
        return res.status(401).json({message : 'Auth failed'})
    }
}

// ADD PRODUCT

var storageFile = multer.diskStorage({
    destination : (req, file, cb)=>{
        cb(null, './images')
    },
    filename : (req, file, cb)=>{
        cb(null, Date.now() + file.originalname)
    }
})

var upload = multer({storage : storageFile})

app.post('/gallery', upload.single('fileImage'), (req, res)=>{
    var gallery = {
        title : req.body.title,
        image : req.file.filename,
        price : req.body.price,
        desc : req.body.desc,
        username : req.body.username
    }   
    conn.query("INSERT INTO gallery SET ?", gallery , (err, result)=>{
    if(err) res.status(400).json(err)
    else res.status(200).json(result)
    })
})

app.get('/gallery', (req, res)=>{
    conn.query("SELECT * FROM gallery ORDER BY id desc", (err, rows)=>{
        res.json(rows)
    })
})

app.use('/images', express.static('./images'))

app.get('/count', (req, res)=>{
    conn.query("SELECT COUNT(*) FROM gallery", (err, result)=>{
        res.json(result)
    })
})

app.get('/gallery/:input', (req, res)=>{
    var input = req.params.input
    conn.query("SELECT * FROM gallery WHERE LOWER(title) LIKE '%" + input + "%'", (err, rows)=>{
        res.json(rows)
    })
})

app.get('/profile/:username', (req, res)=>{
    var username = req.params.username
    conn.query("SELECT * FROM users WHERE username = '" + username + "'", (err, rows)=>{
        if(err) res.status(400).json(err)
        else res.status(200).json(rows)
    })  
})

app.get('/profile/:username/gallery', (req, res)=>{
    var username = req.params.username
    conn.query("SELECT * FROM gallery WHERE username = '" + username + "'", (err, rows)=>{
        if(err) res.status(400).json(err)
        else res.status(200).json(rows)
    })  
})


app.get('/detail/:id', (req, res)=>{
    var id = req.params.id
    conn.query("SELECT * FROM gallery WHERE id = '" + id + "'", (err, rows)=>{
        if(err) res.status(400).json(err)
        else res.status(200).json(rows)
    })  
})

app.delete('/gallery/:id', (req, res)=>{
    var id = req.params.id
    conn.query("DELETE FROM gallery WHERE id = '" + id + "'", (err, rows)=>{
        if(err) res.status(400).json(err)
        else res.status(200).json(rows)
    })  
})

app.put('/detail/:id', (req, res)=>{
    var id = req.params.id
    var title = req.body.title
    var price = req.body.price
    var desc = req.body.desc
    conn.query("UPDATE gallery SET title = '" + title + "', price = " + price + ", `desc` = '" + desc + "' WHERE id = " + id, (err, result)=>{
        if(err) res.status(400).json(err)
        else res.status(200).json(result)
    })
})

app.listen(8000)