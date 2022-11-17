import React, { useEffect, useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { FaRupeeSign } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
// import { FaHeart } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ADD_CART } from "../redux/actions/action";

const Home = () => {

  //redux
  const dispatch = useDispatch();
  const getData = useSelector((state) => state.cartReducer.carts);
  console.log(getData);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    let result = await fetch("https://fakestoreapi.com/products");
    result = await result.json();
    if (result) {
      setProducts(result);
    }
  }

  const addToCart = (item) => {
    dispatch(ADD_CART(item));
    toast.success("Item added into cart.");
  }

  return (
    <div className="container">
      <div className="row">
        {products.map((item) => {
          return (
            <div className="col-sm-3" style={{ padding: 8 }}>
              <div className="card">
                <div className="card-body">
                  <center>
                    <img src={item.image} alt="" style={{ height: 100 }} className="img-fluid" />
                  </center>
                  <h5 className="card-title">{item.title.substring(0, 20)}</h5>
                  <p className="card-text"><FaRupeeSign />{item.price}</p>
                  <p style={{ position: 'absolute', top: 8, right: 8 }}><FaRegHeart /></p>
                  <button className="btn btn-primary" onClick={() => addToCart(item)}>Add to cart</button>
                </div>
              </div>
            </div>
          )
        })}
        <ToastContainer />
      </div>
    </div>
  )
}

export default Home;