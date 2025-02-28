import mongoose from 'mongoose';

const orderSchema = mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
        orderItems: [
            {
                product: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Product' },
                name: { type: String, required: true },
                qty: { type: Number, required: true },
                imageUrl: { type: String, required: false },
                price: { type: Number, required: true },
            },
        ],
        shippingAddress: {
            address: { type: String, required: true },
            city: { type: String, required: true },
            postalCode: { type: String, required: true },
            country: { type: String, required: true },
        },
        paymentMethod: { type: String, required: true },
        itemsPrice: { type: Number, required: true },
        shippingPrice: { type: Number, required: true },
        taxPrice: { type: Number, required: true },
        totalPrice: { type: Number, required: true },
        isPaid: { type: Boolean, default: false },
        paidAt: { type: Date },
        isDelivered: { type: Boolean, default: false },
        deliveredAt: { type: Date },
    },
    { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);

export default Order; // Make sure you're exporting the model with `export default`
