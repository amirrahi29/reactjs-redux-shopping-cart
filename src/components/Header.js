import React,{useState,useEffect} from "react";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { REMOVE_CART } from "../redux/actions/action";

const Header = () => {

    const dispatch = useDispatch();
    const [price, setPrice] = useState(0);
    const getData = useSelector((state) => state.cartReducer.carts);

    const removeCart = (id) => {
        console.log(id);
        dispatch((REMOVE_CART(id)));
        toast.error("Item deleted successfully.");
    }

    const getTotal = () => {
        let p = 0;
        getData.map((e, k) => {
            p = e.price + p;
        });
        setPrice(p);
    }

    useEffect(()=>{
        getTotal();
    },[getTotal])

    return (
        <>
            <nav className="navbar navbar-dark bg-dark fixed-top">
                <div className="container-fluid">
                    <Link className="navbar-brand" to={'/'}>Ecommerce</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar">
                        <FaShoppingCart />{getData.length}
                    </button>
                    <div className="offcanvas offcanvas-end text-bg-dark" tabIndex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">My Cart</h5>
                            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body">
                            <hr />
                            <table className="table-dark" cellPadding={8}>
                                <thead className="table-dark">
                                    <tr>
                                        <th scope="col">Image</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Remove</th>
                                    </tr>
                                </thead>
                                <tbody className="table-group-divider">

                                    {getData.length > 0 ?

                                        getData.map((e) => {
                                            return (
                                                <tr>
                                                    <td><img src={e.image} className='image-fluid' style={{ height: 30, width: 30 }} /></td>
                                                    <td>{e.title}</td>
                                                    <td>Rs.{e.price}</td>
                                                    <td><Link><FaTrash color="red" onClick={() => removeCart(e.id)} /></Link></td>
                                                </tr>
                                            )
                                        })
                                        :
                                        <h3>No items found!</h3>

                                    }
                                </tbody>
                            </table>
                        </div>
                        <h3 style={{ padding: 16 }}>Total: Rs.{price}</h3>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Header;