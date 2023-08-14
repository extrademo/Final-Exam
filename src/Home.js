import React from 'react';
import { Link } from 'react-router-dom';
import { FaTrashAlt } from "react-icons/fa";
import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from 'react';
import { FirestoreDatabase } from './FirebaseConfig';
import { collection, addDoc, getDocs, doc, deleteDoc } from 'firebase/firestore';

const Home = () => {

    useEffect(() => {
        GetProduct();
        GetWishList();
        GetAddtoCart();
    }, []);

    const [ProductImage, setProductImage] = useState("");
    const [ProductName, setProductName] = useState("");
    const [ProductPrice, setProductPrice] = useState("");

    const ProductCollection = collection(FirestoreDatabase, "AddProduct");

    const Submit = async () => {
        if (ProductImage && ProductName && ProductPrice) {
            const admin = await addDoc(ProductCollection, {
                productimage: ProductImage,
                productname: ProductName,
                productprice: ProductPrice
            });

            console.log("AddProduct++", admin);

            toast.success("Product Added SuccessFully", {
                position: "top-center",
                autoClose: 4000
            });

            GetProduct();

            setProductImage("");
            setProductName("");
            setProductPrice("");
        }
        else {
            toast.error("Please enter the Product Value", {
                position: "top-center",
                autoClose: 4000
            });
        }
    }

    const [GetProductAdmin, setGetProductAdmin] = useState([]);

    const GetProduct = async () => {
        const getadmin = await getDocs(ProductCollection);

        console.log("GetProduct++", getadmin.docs);

        const a = [];

        getadmin.forEach((i) => {
            a.push({
                ProductId: i.id,
                ProductImage: i.data().productimage,
                ProductName: i.data().productname,
                ProductPrice: i.data().productprice
            })
        });

        setGetProductAdmin(a);
    }




    const WishListCollection = collection(FirestoreDatabase, "WishList");

    const WishList = async (like) => {
        const wishlistuser = await addDoc(WishListCollection, {
            wishlistimage: like.ProductImage,
            wishlistname: like.ProductName,
            wishlistprice: like.ProductPrice
        });

        console.log("WishList++", wishlistuser);


        toast.success("Product Liked SuccessFully", {
            position: "top-center",
            autoClose: 3000,
        });

        GetWishList();
    }

    const [GetWishListUser, setGetWishListUser] = useState([]);

    const GetWishList = async () => {
        const getwishlistuser = await getDocs(WishListCollection);

        console.log("GetWishList++", getwishlistuser.docs);

        const b = [];

        getwishlistuser.forEach((i) => {
            b.push({
                WishListId: i.id,
                WishListImage: i.data().wishlistimage,
                WishListName: i.data().wishlistname,
                WishListPrice: i.data().wishlistprice
            })
        });

        setGetWishListUser(b);
    }

    const DeleteWishList = async (id) => {
        const deletewishlistuser = doc(FirestoreDatabase, "WishList", id);

        await deleteDoc(deletewishlistuser);

        toast.success("Product Unliked SuccessFully", {
            position: "top-center",
            autoClose: 3000
        });

        GetWishList();
    }



    const AddtoCartCollection = collection(FirestoreDatabase, "AddtoCart");

    const AddtoCart = async (cart) => {
        const addtocartuser = await addDoc(AddtoCartCollection, {
            addtocartimage: cart.ProductImage,
            addtocartname: cart.ProductName,
            addtocartprice: cart.ProductPrice,
            addtocartquantity: 1
        });

        console.log("AddtoCart++", addtocartuser);

        toast.success("Product Added Cart SuccessFully", {
            position: "top-center",
            autoClose: 3000
        });

        GetAddtoCart(); 
    }

    const [GetAddtoCartUser, setGetAddtoCartUser] = useState([]);

    const GetAddtoCart = async () => {
        const getaddtocartuser = await getDocs(AddtoCartCollection);

        console.log("GetAddtoCart++", getaddtocartuser.docs);

        const c = [];

        getaddtocartuser.forEach((i) => {
            c.push({
                AddtoCartId: i.id,
                AddtoCartImage: i.data().addtocartimage,
                AddtoCartName: i.data().addtocartname,
                AddtoCartPrice: i.data().addtocartprice,
                AddtoCartQuantity: i.data().addtocartquantity
            })
        });

        setGetAddtoCartUser(c);
        setProductTotal(c);
    }

    const DeleteAddtoCart = async (id) => {
        const deleteaddtocartuser = doc(FirestoreDatabase, "AddtoCart", id);

        await deleteDoc(deleteaddtocartuser);

        toast.success("Product Deleted Cart SuccessFully", {
            position: "top-center",
            autoClose: 3000
        });

        GetAddtoCart();
    }

    const [ProductTotal, setProductTotal] = useState();

    const TotalProduct= ProductTotal?.reduce((acc,curr)=>{
        return acc + curr.AddtoCartPrice * curr.AddtoCartQuantity
    },0)

    const Total= ProductTotal?.reduce((acc,curr)=>{
        return acc + curr.AddtoCartPrice * curr.AddtoCartQuantity
    },45)




    return (
        <div>

            <div className="container h-100 mt-3 mb-5">
                <div className="row h-100">
                    <div className="col-lg-5 mx-auto d-table h-100">
                        <div className="d-table-cell align-middle">
                            <div className="text-center mt-4 mb-3">
                                <h1 className="h3">Add Product</h1>
                            </div>

                            <div className="card">
                                <div className="card-body">
                                    <div className="m-sm-4">
                                        <div className="form-group">
                                            <label>Product Image</label>
                                            <input type='text' className="form-control form-control-lg fs-6" placeholder="Enter your name" value={ProductImage} onChange={(e) => setProductImage(e.target.value)} />
                                        </div>
                                        <div className="form-group mt-3">
                                            <label>Product Name</label>
                                            <input type='text' className="form-control form-control-lg fs-6" placeholder="Enter your email" value={ProductName} onChange={(e) => setProductName(e.target.value)} />
                                        </div>
                                        <div className="form-group mt-3">
                                            <label>Product Price</label>
                                            <input type='number' className="form-control form-control-lg fs-6" placeholder="Enter your Course" value={ProductPrice} onChange={(e) => setProductPrice(parseInt(e.target.value))} />
                                        </div>
                                        <div className="text-center mt-4">
                                            <button type='submit' value='submit' onClick={Submit} className="btn btn-lg btn-primary">Submit</button>
                                            <ToastContainer />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



            <div className="text-center mb-4">
                <h1 className="h3">Our Product</h1>
            </div>

            <div className='container w'>
                {
                    GetProductAdmin.length === 0 ? (
                        <div className="col-lg-12 col-md-6 text-center">
                            <div className="single-product-item snp">
                                <h3><span className='fs1'>No Product</span> <br /> <span className='fs2'>in Available.</span></h3>
                            </div>
                        </div>
                    ) : (
                        GetProductAdmin.map((i) => {
                            return (
                                <div className="col-lg-4 col-md-6 text-center" key={i.ProductId}>
                                    <div className="single-product-item">
                                        <IoIosHeartEmpty className='like' size={26} onClick={() => WishList(i)} />
                                        <div className="product-image">
                                            <Link><img src={i.ProductImage} alt /></Link>
                                        </div>
                                        <h3 className='fw-bold'>{i.ProductName}</h3>
                                        <p className="product-price"><span>Per Kg</span> {i.ProductPrice}$ </p>
                                        <Link className="cart-btn" onClick={() => AddtoCart(i)} ><i className="fas fa-shopping-cart" /> Add to Cart</Link>
                                        <ToastContainer />
                                    </div>
                                </div>
                            )
                        })  
                    )
                }
            </div>



            <div className="text-center mt-5 mb-4">
                <h1 className="h3">WishList  Product</h1>
            </div>

            <div className="cart-section mt-150 mb-150">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-md-12">
                            <div className="cart-table-wrap">
                                <table className="cart-table">
                                    <tbody>
                                        {
                                            GetWishListUser.length === 0 ? (
                                                <tr className="table-body-row">
                                                    <td className="product-name">
                                                        <h3><span className='fs3'>No Product Likes</span> <br /> <span className='fs4'>in Wishlist.</span></h3>
                                                    </td>
                                                </tr>
                                            ) : (
                                                GetWishListUser.map((i) => {
                                                    return (
                                                        <tr className="table-body-row" key={i.WishListId}>
                                                            <td className="product-remove"><Link onClick={() => DeleteWishList(i.WishListId)}><FaTrashAlt /></Link></td>
                                                            <td className="product-image"><img src={i.WishListImage} alt /></td>
                                                            <td className="product-name">{i.WishListName}</td>
                                                            <td className="product-price">${i.WishListPrice}</td>
                                                            <ToastContainer />
                                                        </tr>
                                                    )
                                                })
                                            )
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



            <div className="text-center mt-5 mb-4">
                <h1 className="h3">Cart Product</h1>
            </div>

            <div className="cart-section mt-150 mb-5">
                <div className="container">
                    <div className="row">

                        <div className="col-lg-8 col-md-12">
                            <div className="cart-table-wrap">
                                {
                                    GetAddtoCartUser.length === 0 ? (
                                        <table className="cart-table">
                                            <tbody>
                                                <tr className="table-body-row snp2">
                                                    <td className="product-name">
                                                        <h3><span className='fs3'>No Product</span> <br /> <span className='fs4'>in Cart.</span></h3>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    ) : (
                                        <table className="cart-table">
                                            <thead className="cart-table-head">
                                                <tr className="table-head-row">
                                                    <th className="product-remove" />
                                                    <th className="product-image">Product Image</th>
                                                    <th className="product-name">Name</th>
                                                    <th className="product-price">Price</th>
                                                    <th className="product-quantity">Quantity</th>
                                                    <th className="product-total">Total</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    GetAddtoCartUser.map((i, index) => {
                                                        return (
                                                            <tr className="table-body-row" key={i.AddtoCartId}>
                                                                <td className="product-remove">
                                                                    <Link onClick={() => DeleteAddtoCart(i.AddtoCartId)}><FaTrashAlt /></Link>
                                                                </td>
                                                                <td className="product-image">
                                                                    <img src={i.AddtoCartImage} alt />
                                                                </td>
                                                                <td className="product-name">{i.AddtoCartName}</td>
                                                                <td className="product-price">${i.AddtoCartPrice}</td>
                                                                <td className="product-quantity">
                                                                    <input placeholder={0} defaultValue={i.AddtoCartQuantity} />
                                                                </td>
                                                                <td className="product-total">{i.AddtoCartPrice * i.AddtoCartQuantity}</td>
                                                                <ToastContainer />
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    )
                                }
                            </div>
                        </div>

                        <div className="col-lg-4">
                            <div className="total-section">
                                <table className="total-table">
                                    <thead className="total-table-head">
                                        <tr className="table-total-row">
                                            <th>Total</th>
                                            <th>Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="total-data">
                                            <td><strong>Subtotal: </strong></td>
                                            <td>${TotalProduct}</td>
                                        </tr>
                                        <tr className="total-data">
                                            <td><strong>Shipping: </strong></td>
                                            <td>$45</td>
                                        </tr>
                                        <tr className="total-data">
                                            <td><strong>Total: </strong></td>
                                            <td>${Total}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Home;
