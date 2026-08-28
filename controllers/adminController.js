import Product from '../models/productModel.js';
import Order from '../models/orderModel.js';

// @desc    Get all orders (Admin)
// @route   GET /api/admin/orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).sort({ createdAt: -1 });
    return res.json(orders);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// @desc    Update order status
// @route   PUT /api/admin/orders/:id/status
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.status = status;
    const updatedOrder = await order.save();
    return res.json(updatedOrder);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// @desc    Create a product (Admin)
// @route   POST /api/products
export const createProduct = async (req, res) => {
  try {
    const { name, price, description, category, image } = req.body;

    const product = new Product({
      name,
      price,
      description,
      category,
      image,
      inStock: true
    });

    const createdProduct = await product.save();
    return res.status(201).json(createdProduct);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// @desc    Update order payment status (Paid/Unpaid)
// @route   PUT /api/admin/orders/:id/pay
export const updatePaymentStatus = async (req, res) => {
  try {
    const { isPaid } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.isPaid = isPaid;
    const updatedOrder = await order.save();
    return res.json(updatedOrder);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};