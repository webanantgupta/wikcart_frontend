import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useNavigation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";

const CustomerViewProducts = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid-4');
  const [sortBy, setSortBy] = useState('best-selling');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

const API_URL = import.meta.env.VITE_API_URL;

  // Fetch products using axios
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/api/v2/get-products`);
        if (response.data.success && response.data.data) {
          setProducts(response.data.data);
          setFilteredProducts(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter and sort products
  useEffect(() => {
    let filtered = [...products];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.brand?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    // Sorting
    if (sortBy === 'price-low') {
      filtered.sort((a, b) => parseFloat(a.unit_price) - parseFloat(b.unit_price));
    } else if (sortBy === 'price-high') {
      filtered.sort((a, b) => parseFloat(b.unit_price) - parseFloat(a.unit_price));
    }

    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, sortBy, products]);

  // Get unique categories
  const categories = ['all', ...new Set(products.map((p) => p.category).filter(Boolean))];

  // Calculate discount
  const getDiscount = (product) => {
    if (!product.discount) return 0;
    if (product.discount_type === 'percentage') {
      return Math.round(product.discount);
    }
    const discountAmount = parseFloat(product.discount);
    const price = parseFloat(product.unit_price);
    return Math.round((discountAmount / price) * 100);
  };

  // Get final price
  const getFinalPrice = (product) => {
    const price = parseFloat(product.unit_price);
    if (!product.discount) return price;
    if (product.discount_type === 'percentage') {
      return price - (price * parseFloat(product.discount)) / 100;
    }
    return price - parseFloat(product.discount);
  };

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));

    navigate("/addtocart");
  };
  // Product Card Component
  const ProductCard = ({ product }) => {
    const discount = getDiscount(product);
    const finalPrice = getFinalPrice(product);
    const originalPrice = parseFloat(product.unit_price);
    const rating = 4.5; // Placeholder rating
const navigate = useNavigate();
    return (
      <div className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
        {/* Image Container */}
        <div className="relative bg-gray-200 aspect-square flex items-center justify-center overflow-hidden group">
          <svg
            className="w-24 h-24 text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" />
          </svg>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.featured === 1 && (
              <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                NEW
              </span>
            )}
            {discount > 0 && (
              <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                -{discount}%
              </span>
            )}
          </div>

          {/* Sale Banner */}
          {product.discount && (
            <div className="absolute bottom-0 left-0 right-0 bg-black text-white text-xs font-bold px-2 py-2 text-center">
              HOT SALE {discount}% OFF
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4">
          {/* Title */}
          <h3 className="font-semibold text-gray-900 text-sm mb-2 line-clamp-2 hover:text-blue-600 cursor-pointer">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-xs text-gray-600">({rating})</span>
          </div>

          {/* Price */}
          <div className="mb-3">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-gray-900">₹{finalPrice.toFixed(2)}</span>
              {discount > 0 && (
                <span className="text-sm text-gray-500 line-through">
                  ₹{originalPrice.toFixed(2)}
                </span>
              )}
            </div>
          </div>

        {/* <div>
<button
  onClick={() => navigate("/detail", { state: product })}
  className="w-full py-2 rounded-lg font-semibold text-white bg-black hover:bg-gray-800 active:scale-95 transition-all duration-300 cursor-pointer"
>
  View Details
</button>
<button

  className="w-full py-2 rounded-lg font-semibold text-black border-black hover:bg-gray-800 active:scale-95 transition-all duration-300 cursor-pointer"
>
  Add To Cart
</button>
        </div> */}

        <div className="flex items-center gap-4 mt-5">

  {/* Add To Cart Button */}
<button
    onClick={()=>handleAddToCart(product)}
  className="bg-black text-white px-3 py-2 cursor-pointer rounded-2xl font-medium text-base border border-black hover:bg-gray-900 transition-all duration-300"
>
  Add To Cart
</button>

  {/* View Details Button */}
  <button
    onClick={() => navigate("/detail", { state: product })}
    className="bg-white text-black px-3 py-2 cursor-pointer rounded-2xl font-medium text-base border border-black hover:bg-gray-100 transition-all duration-300"
  >
    View Details
  </button>

</div>

        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Controls */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            {/* Show Filters */}
            <button className="flex items-center gap-2 text-gray-700 hover:text-blue-600 font-semibold">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Show Filters
            </button>

            {/* View Mode Buttons */}
            <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setViewMode('grid-4')}
                className={`p-2 rounded ${viewMode === 'grid-4' ? 'bg-black text-white' : 'text-gray-600'}`}
                title="4 Columns"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4z" />
                  <path d="M3 10a1 1 0 011-1h12a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('grid-3')}
                className={`p-2 rounded ${viewMode === 'grid-3' ? 'bg-black text-white' : 'text-gray-600'}`}
                title="3 Columns"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H4a1 1 0 01-1-1V4z" />
                  <path d="M12 4a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V4z" />
                  <path d="M3 13a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H4a1 1 0 01-1-1v-4z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('grid-2')}
                className={`p-2 rounded ${viewMode === 'grid-2' ? 'bg-black text-white' : 'text-gray-600'}`}
                title="2 Columns"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1V4z" />
                  <path d="M10 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1h-6a1 1 0 01-1-1v-6z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-black text-white' : 'text-gray-600'}`}
                title="List View"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </button>
            </div>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 font-semibold hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="best-selling">Best Selling</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search and Filter Row */}
        <div className="mb-6 flex gap-4">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 font-semibold hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="text-gray-600 font-semibold mt-4">Loading products...</p>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredProducts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12">
            <svg className="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-lg font-semibold text-gray-900">No Products Found</h3>
            <p className="text-gray-600 text-sm mt-2">Try adjusting your search or filters</p>
          </div>
        )}

        {/* Products Grid */}
        {!loading && filteredProducts.length > 0 && (
          <div
            className={`grid gap-6 ${
              viewMode === 'grid-4'
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
                : viewMode === 'grid-3'
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                : viewMode === 'grid-2'
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-2'
                : 'grid-cols-1'
            }`}
          >
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      {/* <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 ShopHub. All rights reserved.</p>
        </div>
      </footer> */}
    </div>
  );
};

export default CustomerViewProducts;
