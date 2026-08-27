import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
    {
        userClerkId: { type: String, default: 'Guest' },
        userEmail: { type: String, default: '' },
        orderItems: [
            {
                name: { type: String, required: true },
                quantity: { type: Number, required: true },
                price: { type: Number, required: true },
                image: { type: String, required: true },
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true,
                    ref: 'Product'
                }
            }
        ],
        shippingAddress: {
            fullName: { type: String, required: true },
            address: { type: String, required: true },
            city: { type: String, required: true },
            postalCode: { type: String, required: true },
            phone: { type: String, required: true }
        },
        totalPrice: { type: Number, required: true, default: 0.0 },
        isPaid: { type: Boolean, required: true, default: false },
        status: {
            type: String,
            required: true,
            enum: ['Pending', 'Processing', 'Shipped', 'Delivered'],
            default: 'Pending'
        }
    },
    { timestamps: true }
);

export default mongoose.model('Order', orderSchema);