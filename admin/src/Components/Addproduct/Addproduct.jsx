import React, { useState } from 'react'
import './Addproduct.css'
import upload from '../../assets/upload_area.svg'
const Addproduct = () => {
    const [image,setImage]= useState(false);
    const [productDetails, setProductDetails] = useState({
        name:"",
        image:"",
        category:"women",
        new_price:"",
        old_price:"",

    })

    const imageHandler = (e)=>{
            setImage(e.target.files[0]);
    }

    const changeHandler = (e)=>{
        setProductDetails({...productDetails,[e.target.name]:e.target.value});
    }

    const addproduct = async ()=>{
        console.log(productDetails);
        let responseData;
        let product = productDetails;

        let formData = new FormData();
        formData.append('product',image);

        await fetch('http://localhost:4040/upload',{
            method:"POST",
        headers:{
            Accept:'application/json'
        },
        body:formData
    
    }).then((resp)=>
        resp.json()
    ).then((data)=>{responseData=data });

    if(responseData.success)
        {
            product.image = responseData.img_url;
            console.log(product);
            await fetch('http://localhost:4040/addproduct',{
                method:"POST",
        headers:{
            Accept:'application/json',
            "Content-Type":"application/json"
        },

        body:JSON.stringify(product),

            }).then((resp)=>resp.json()).then((data)=>{
                if(data.success){
                    alert('Product Added');
                }
                else alert('Failed');
            })
        }


    }
  return (
  
<div className="Addproduct">


<div className="itemfield">
    <p>Product Title</p>
    <input value={productDetails.name  } onChange={changeHandler} type="text"  name="name" placeholder='Type' />
</div>
<div className="price">
    <div className="itemfield">
        <p>Price</p>
        <input type="text" value={productDetails.old_price} onChange={changeHandler} name="old_price" placeholder='Price' />
    </div>
    <div className="itemfield">
        <p>Offer Price</p>
        <input type="text" value={productDetails.new_price} onChange={changeHandler} name="new_price" placeholder='Price' />
    </div>
    </div>

    <div className="itemfield">
        <p>Category</p>
        <select name="category" value={productDetails.category} onChange={changeHandler} className="add-product-selector">
            <option value="women">Women</option>
            <option value="men">Men</option>
            <option value="kid">Kid</option>
        </select>
    </div>

    <div className="itemfield">
        <label htmlFor="file-input">
            <img src={(image)?URL.createObjectURL(image):upload} className='thumbnail' alt="" />

        </label>
        <input onChange={imageHandler} type="file" name="image" id="file-input" hidden/>
    </div>
    <button onClick={addproduct} className="addbutton">Add</button>
</div>


 )
}

export default Addproduct