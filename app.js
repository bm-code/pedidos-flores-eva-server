import express from "express";
import mongoose from "mongoose";
import order from "./api/models/order.js";
import * as API from './mongo.js';

const app = express();
const port = 5500;

const mongoURL = `mongodb+srv://${API.API_USER}:${API.API_KEY}@cluster0.ezidvwu.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('strictQuery', false);

app.use(express.json({ limit: "50mb" }));

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

app.listen(port, () => {
    console.log(`Server is listening at port: ${port}`);
});
