import Product from '../models/productModel.js';

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
      filter.category = new RegExp(`^${category}$`, 'i');
    }

    const products = await Product.find(filter);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
};

// @desc    Get single product by ID
// @route   GET /api/products/:id
export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching product', error: error.message });
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
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error updating product', error: error.message });
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

    res.json({ message: 'Product soft deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error: error.message });
  }
};