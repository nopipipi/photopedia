// var conn = mysql.createConnection({
//     host : "localhost",
//     user : "root",
//     password : "",
//     database : "dbtugas"
// })

// conn.connect((err)=>{
//     if(err)
//         console.log("Problem with MySQL " + err);
//     else{
//         console.log("Connected");
//         conn.query("CREATE DATABASE dbtugas", (err, result)=>{
//             if(err)
//                 console.error("Error creating database " + err)
//             else   
//                 console.log("Database created successfully")
//         })
//     }
// })

// conn.connect((err)=>{
//     if(err)
//         console.log("Problem with MySQL " + err);
//     else{
//         console.log("Connected");
//         conn.query("CREATE TABLE users (id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY, username VARCHAR(20) NOT NULL, firstname VARCHAR(50) NOT NULL, lastname VARCHAR(50) NOT NULL, password VARCHAR(16) NOT NULL", (err, result)=>{
//             if(err)
//                 console.error("Error creating table " + err)
//             else   
//                 console.log("Table created successfully")
//         })
//     }
// })


// conn.connect((err)=>{
//     if(err)
//         console.log("Problem with MySQL " + err);
//     else{
//         console.log("Connected");
//         conn.query("CREATE TABLE gallery (id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY, title VARCHAR(50) NOT NULL, image VARCHAR(100) NOT NULL, desc VARCHAR(100) NOT NULL, username VARCHAR(20) NOT NULL, price INT(10) NOT NULL", (err, result)=>{
//             if(err)
//                 console.error("Error creating table " + err)
//             else   
//                 console.log("Table created successfully")
//         })
//     }
// })