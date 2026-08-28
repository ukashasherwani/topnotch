import Product from '../models/productModel.js';

// Helper to escape user input for safe regex usage in Mongo $regex
const escapeRegex = (str) => {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

// @desc    Get all products (with optional category filter & soft delete filter)
// @route   GET /api/products
export const getProducts = async (req, res) => {
  try {
    const { category } = req.query;

    // Build filter dynamically, ensuring soft-deleted items are always excluded
    const filter = {
      isDeleted: { $ne: true }
    };

    if (category) {
      const escaped = escapeRegex(String(category));
      filter.category = { $regex: `^${escaped}$`, $options: 'i' };
    }

    const products = await Product.find(filter);
    return res.json(products);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// @desc    Get single product by ID
// @route   GET /api/products/:id
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    return res.json(product);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};


// @desc    Update a product (Admin)
// @route   PUT /api/admin/products/:id
export const updateProduct = async (req, res) => {
  try {
    const { name, price, description, category, image, inStock } = req.body;
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    product.name = name || product.name;
    product.price = price !== undefined ? price : product.price;
    product.description = description || product.description;
    product.category = category || product.category;
    product.image = image || product.image;
    product.inStock = inStock !== undefined ? inStock : product.inStock;

    const updatedProduct = await product.save();
    return res.json(updatedProduct);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// @desc    Soft delete a product (Admin)
// @route   DELETE /api/admin/products/:id
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    product.isDeleted = true; // Soft delete flag
    await product.save();

    return res.json({ message: 'Product soft deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};