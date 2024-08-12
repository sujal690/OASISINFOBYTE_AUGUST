import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTrash, FaShoppingCart } from 'react-icons/fa'; // Importing icons
import './OrderList.css'; // Importing the CSS file

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [showOrders, setShowOrders] = useState(false); // For toggling the order list visibility
useEffect(() => {
  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/admin/orders'); // Update to your route
      setOrders(response.data);
    } catch (error) {
      setError('Error fetching orders');
      console.error('Error fetching orders:', error);
    }
  };

  fetchOrders();
}, []);



  if (error) return <p>{error}</p>;

  return (
    <div className="order-list-container">
      <button className="toggle-btn" onClick={() => setShowOrders(!showOrders)}>
        {showOrders ? 'Hide Order List' : 'Show Order List'}
        <FaShoppingCart />
      </button>
      {showOrders && (
        <div className="order-list">
          <h2>Order List</h2>
          <ul>
            {orders.length === 0 ? (
              <p>No orders available.</p>
            ) : (
              orders.map((order) => (
                <li key={order._id} className="order-item">
                  <div>
                    <strong>Order ID:</strong> {order.orderId || 'N/A'} <br />
                    <strong>Amount:</strong> {order.amount || 'N/A'} <br />
                    <strong>Status:</strong> {order.status || 'N/A'}
                  </div>
                  {order.products && order.products.length > 0 ? (
                    <div>
                      <strong>Products:</strong>
                      <ul>
                        {order.products.map((product, index) => (
                          <li key={index} className="product-item">
                            <div>
                              <strong>Product Name:</strong> {product.name || 'Unknown'} <br />
                              <strong>Quantity:</strong> {product.quantity || 0} <br />
                              <strong>Price:</strong> {product.price ? `${product.price} each` : 'N/A'}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <p>No product details available</p>
                  )}
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default OrderList;
