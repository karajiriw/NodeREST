const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
//const cors = require("cors");

mongoose.connect(
    "mongodb://admin:VZQlaa25848@node57049-kittipong-noderest.proen.app.ruk-com.cloud:11835",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);

const book = mongoose.model("Book", {
    id: {
        type: Number,
        unique: true,
        required: true,
    },
    title: String,
    author: String,
});

const app = express();
app.use(bodyParser.json());
//app.use(cors());

app.post("/books", async (req, res) => {
    try{
        const lastBook = await book.findOne().sort({ id: -1 });
        const nextId = lastBook ? lastBook.id + 1 : 1;

        const book = new Book({
            id: nextId,
            ...req.body,
        });

        await book.save();
        res.send(book);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get("/books", async (req, res) => {
    try {
        const books = await Book.find();
        res.send(books);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get("/books/:id", async (req, res) => {
    try {
        const book = await Book.findOne({id:req.params.id});
        res.send(book);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.put("/books/:id", async (req, res) => {
    try {
        const book = await Book.findOneAndUpdate({id:req.params.id}, req.body, {
            new: true,
        });
        res.send(book);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.delete("/books/:id", async (req, res) => {
    try {
        const book = await Book.findOneAndDelete({id:req.params.id});
        res.send(book);
    } catch (error) {
        res.status(500).send(error);
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server atarted at http://localhost:${PORT}`);
});

// const express = require('express');
// const Sequelize = require('sequelize');
// const app = express();

// app.use(express.json());

// const dbUrl = 'postgres://webadmin:YBGshr13922@node57053-kittipong-noderest.proen.app.ruk-com.cloud/Books'

// const sequelize = new Sequelize(dbUrl);
// // const sequelize = new Sequelize('database', 'username', 'password', {
// //     host: 'localhost',
// //     dialect: 'sqlite',
// //     storage: './Database/SQBooks.sqlite'
// // });

// const Book = sequelize.define('book', {
//     id: {
//         type: Sequelize.INTEGER,
//         autoIncrement: true,
//         primaryKey: true
//     },
//     title: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     author: {
//         type: Sequelize.STRING,
//         allowNull: false
//     }
// });

// sequelize.sync();

// app.get('/books', (req,res) => {
//     Book.findAll().then(books => {
//         res.json(books);
//     }).catch(err => {
//     });
// });

// app.get('/books/:id', (req, res) => {
//     Book.findByPk(req.params.id).then(book => {
//         if (!book) {
//             res.status(404).send('Book not found');
//         }else {
//             res.json(book);
//         }
//     }).catch(err => {
//         res.status(500).send(err);
//     });
// });

// app.post('/books', (req, res) => {
//     Book.create(req.body).then(book => {
//         res.send(book);
//     }).catch(err => {
//         res.status(500).send(err);
//     });
// });

// app.put('/books/:id', (req, res) => {
//     Book.findByPk(req.params.id).then(book => {
//         if (!book) {
//             res.status(404).send('Book not found');
//         } else {
//             book.update(req.body).then(() => {
//                 res.send(book);
//             }).catch(err => {
//                 res.status(500).send(err);
//             });
//         }
//     }).catch(err => {
//         res.status(500).send(err);
//     });
// });

// app.delete('/books/:id', (req, res) => {
//     Book.findByPk(req.params.id).then(book => {
//         if (!book) {
//             res.status(404).send('Book not found');
//         } else {
//             book.destroy().then(() => {
//                 res.send({});
//         }).catch(err => {
//             res.status(500).send(err);
//             });
//         }
//     }).catch(err => {
//         res.status(500).send(err);
//     });
// });

// const port = process.env.PORT || 3000;
// app.listen(port, () => console.log(`Listening on port ${port}...`));