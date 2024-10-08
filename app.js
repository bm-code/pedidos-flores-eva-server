import express from "express";
import mongoose from "mongoose";
import order from "./api/models/order.js";
import user from "./api/models/user.js";
import cors from "cors";
import bodyParser from "body-parser";
import webpush from 'web-push';
import * as dotenv from 'dotenv'

const app = express();
dotenv.config()

const directorios_permitidos = "*";
app.use(cors({
    origin: directorios_permitidos
}));

//mongodb
mongoose.connect(process.env.MONGO_URL ?? 'mongodb+srv://benimorales:6LmxqAsRRhjbijEZ@cluster0.ezidvwu.mongodb.net/?retryWrites=true&w=majority',
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

app.post('/api/login', (req, res) => {
    const userLogin = req.body.username;
    const pass = req.body.password;
    user.findOne({ 'username': userLogin, 'password': pass }, (err, docs) => {
        if (err) {
            res.status(400).send('Login incorrecto');
            return err;
        } else {
            console.log(res);
            if (docs !== null) {
                res.status(200).send(docs);
            } else {
                res.status(401).send('Login incorrecto')
            }
        }
    })

});

//Notificaciones

// webpush.setVapidDetails('mailto:i.benimorales@gmail.com', process.env.PUBLIC_KEY, process.env.PRIVATE_KEY);

// let pushSubscription;

// app.post('/subscriptions', async (req, res) => {

//     pushSubscription = req.body;
//     res.status(200).json();
// })

// app.post('/new-order', async (req, res) => {

//     const { message } = req.body;

//     const payload = JSON.stringify({
//         title: 'Nuevo pedido registrado',
//         message: message
//     })

//     try {
//         await webpush.sendNotification(pushSubscription, payload, {
//             headers: { 'Content-Type': 'application/json' }
//         })
//     } catch (error) {
//         console.log(error)
//     }
// })

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => console.log('Server on port:' + PORT));
// app.listen(process.env.PORT, () => console.log('Server on port:' + process.env.PORT));
