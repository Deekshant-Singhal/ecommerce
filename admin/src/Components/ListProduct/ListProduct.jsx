import React, { useEffect, useState } from 'react';
import './ListProduct.css';
import cross from '../../assets/cross_icon.png';

const ListProduct = () => {
  const [allProducts, setAllProducts] = useState([]);

  const fetchInfo = async () => {
    await fetch('http://localhost:4040/allproducts') // Use 'http' if running locally without HTTPS
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data);
      })
      .catch((err) => console.error('Error fetching products:', err));
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const removeProduct = async (id)=>{
    await fetch('http://localhost:4040/removeproduct',{
      method:"POST",
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json'
      },
      body:JSON.stringify({id:id})
      
    })
    await fetchInfo();
  }

  return (
    <div className="listProduct">
      <h1>All Products List</h1>
      <div className="format pain">
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="allproducts">
        <hr />
        {allProducts.map((product, index) => (
          <div key={index} className="format main">
            <img src={product.image} className="icon" alt="" />
            <p>{product.name}</p>
            <p>${product.old_price}</p>
            <p>${product.new_price}</p>
            <p>{product.category}</p>
            <img src={cross} onClick={()=>{
              removeProduct(product.id)
            }} className="remove" alt="" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListProduct;
