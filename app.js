import express from "express";
import mongoose from "mongoose";
import order from "./api/models/order.js";
import user from "./api/models/user.js";
import cors from "cors";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";


const app = express();

//mongodb
mongoose.connect(process.env.MONGO_URL,
    {
        useUnifiedTopology: true

    })
    .then(() => console.log('MongoDB Conectada'))
    .catch(err => console.log(err)
    );


mongoose.set('strictQuery', true);

app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const directorios_permitidos = "*";
app.use(cors({
    origin: directorios_permitidos
}));

app.get('/', (req, res) => {
    res.json({
        message: 'Hello orders'
    });
});

app.post("/api/orders", (req, res) => {
    let orderData = req.body;
    order.create(orderData, (err, records) => {
        if (err) {
            console.log(err);
            res.status(500).send(err)
        } else {
            res.status(200).send(records)
        }
    })
});

app.delete("/api/orders", (req, res) => {
    order.deleteMany({}, (err) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send('Eliminado correctamente')
        }
    })
})

app.post("/api/actualizar", (req, res) => {
    order.findOneAndUpdate({ _id: req.body._id }, req.body)
        .then((err) => {
            if (err) {
                console.log(err);
            } else {
                res.status(200).send('Pedido actualizado con éxito')
            }
        })
})

app.post("/api/editar", (req, res) => {
    console.log(req.body);
    order.findOneAndUpdate({ _id: req.body._id }, req.body)
        .then((err) => {
            if (err) {
                console.log(err);
            } else {
                res.status(200).send('Pedido editado con éxito')

            }
        })
})

app.post("/api/borrar", (req, res) => {
    console.log(req.body);
    order.findOneAndUpdate({ _id: req.body._id }, req.body)
        .then((err) => {
            if (err) {
                console.log(err);
            } else {
                res.status(200).send('Pedido borrado con éxito')

            }
        })
})

app.get('/api/orders', (req, res) => {
    order.find({}, (err, docs) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(docs)
        }
    });
});

// Login de usuario

app.get('/api/login', (req, res) => {
    const userLogin = req.query.username;
    const pass = req.query.password;
    user.findOne({ 'username': userLogin, 'password': pass }, (err, docs) => {
        if (err) {
            res.status(400).send('Login incorrecto');
            return err;
        } else {
            if (docs !== null) {
                res.status(200).send(docs)
                console.log(docs);
            }
        }
    })

});

// const port = 5500;
// app.listen(port, () => {
//     console.log(`Server is listening at port: ${port}`);
// });
app.listen(process.env.PORT, () => console.log('Server on port:' + process.env.PORT));
