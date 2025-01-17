const Home = () => {
  const handleSubmit = () => {};
  const newProduct = () => {};
  const handleInputChange = () => {};
  const viewCart = () => {};

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">
        Add Product
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg mb-12 hover:shadow-xl transition-transform transform hover:-translate-y-2"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-2">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              value={newProduct.name}
              onChange={handleInputChange}
              required
              className="p-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-2">
              Price
            </label>
            <input
              type="number"
              name="price"
              value={newProduct.price}
              onChange={handleInputChange}
              required
              className="p-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-2">
              Category
            </label>
            <input
              type="text"
              name="category"
              value={newProduct.category}
              onChange={handleInputChange}
              required
              className="p-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-2">
              Quantity
            </label>
            <input
              type="number"
              name="quantity"
              value={newProduct.quantity}
              onChange={handleInputChange}
              required
              className="p-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col md:col-span-2">
            <label className="text-sm font-medium text-gray-600 mb-2">
              Description
            </label>
            <input
              type="text"
              name="description"
              value={newProduct.description}
              onChange={handleInputChange}
              required
              className="p-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-transform transform hover:-translate-y-1"
        >
          Add Product
        </button>
      </form>

      <div className="mt-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Available Products
          </h2>
          <button
            onClick={viewCart}
            className="px-6 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-transform transform hover:-translate-y-1"
          >
            View Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
