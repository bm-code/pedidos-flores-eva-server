import express from "express";
import mongoose from "mongoose";
import order from "./api/models/order.js";
import * as API from './mongo.js';
import cors from "cors";
import bodyParser from "body-parser";


const app = express();

// const port = 3000;
// const mongoURL = `mongodb+srv://${API.API_USER}:${API.API_KEY}@cluster0.ezidvwu.mongodb.net/?retryWrites=true&w=majority`;

// mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });
//mongodb
mongoose.connect(API.MONGO_URL,
    {
        useUnifiedTopology: true

    })
    .then(() => console.log('MongoDB Conectada'))
    .catch(err => console.log(err)
    );

mongoose.set('strictQuery', true);

app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const directorios_permitidos = "http://localhost:3000";
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

// app.listen(port, () => {
//     console.log(`Server is listening at port: ${port}`);
// });
app.listen(API.PORT, () => console.log('Server on port:' + API.PORT));
