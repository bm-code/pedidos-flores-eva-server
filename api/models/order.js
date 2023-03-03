import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
    orderType: String,
    createDate: String,
    deliveryDate: Date,
    receiverName: String,
    address: String,
    phone: Number,
    product: String,
    clientName: String,
    clientPhone: Number,
    comment: String,
    completed: Boolean,
    delete: Boolean
});

export default mongoose.model("order", orderSchema);