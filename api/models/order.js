import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
    orderType: String,
    createDate: String,
    deliveryDate: Date,
    receiverName: String,
    customerType: String,
    address: String,
    phone: Number,
    product: String,
    productDetails: String,
    clientName: String,
    clientPhone: Number,
    comment: String,
    completed: Boolean,
    delete: Boolean,
    shop: String,
    paid: Boolean,
    employee: String
});

export default mongoose.model("order", orderSchema);