import './App.css'
import { useState } from 'react';

const App = () => {
const [formData, setFormData] = useState({
  productName: '',
  description: '',
  category: '',
  amount: '',
  currency: 'INR',
  stock: ''

});

const handleChange = (e) => {
  const { name, value} = e.target;
  setFormData({...formData, 
    [name]: value
  });
};

// handle sumbit
const handleSubmit = (e) => {
  e.preventDefault();
  alert(formData.productName);
  console.log(formData);
};

  return (
    <main className="page">
      <section className="form-shell">
        <div className="form-header">
          <p className="eyebrow">Inventory</p>
          <h1>Create Product</h1>
        </div>

        <form className="product-form"
        onSubmit={handleSubmit}>
          <fieldset>
            <legend>Product Information</legend>

            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="productName">Product Name</label>
                <input 
                  id="productName"
                  name="productName"
                  type="text"
                  placeholder="Enter product name"
                  required
                  value={formData.productName}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="category">Product Category</label>
                <select 
                  id="category" 
                  name="category" 
                  required
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="" disabled>Select a category</option>
                  <option value="electronics">Electronics</option>
                  <option value="clothing">Clothing</option>
                  <option value="food">Food</option>
                </select>
              </div>

              <div className="form-group form-group-full">
                <label htmlFor="description">Product Description</label>
                <textarea
                  id="description"
                  name="description"
                  placeholder="Enter product description"
                  rows="4"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend>Product Pricing</legend>

            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="amount">Amount</label>
                <input
                  id="amount"
                  name="amount"
                  type="number"
                  placeholder="Enter product price"
                  min="0"
                  required
                  value={formData.amount}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="currency">Currency</label>
                <select 
                  id="currency" 
                  name="currency" 
                  required
                  value={formData.currency}
                  onChange={handleChange}
                >
                  <option value="INR">INR</option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="stock">Stock</label>
                <input
                  id="stock"
                  name="stock"
                  type="number"
                  placeholder="Enter product stock"
                  min="0"
                  required
                  value={formData.stock}
                  onChange={handleChange}
                />
              </div>
            </div>
          </fieldset>

          <div className="form-actions">
            <button type="reset" className="secondary-btn">Reset</button>
            <button type="submit">Create Product</button>
          </div>
        </form>
      </section>
    </main>
  )
}

export default App
