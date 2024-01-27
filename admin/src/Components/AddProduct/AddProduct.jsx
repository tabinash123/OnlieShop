import React, { useState } from 'react'

import upload_area from '../../assets/upload_area.svg'

const AddProduct = () => {
  const [image, setimage] = useState(null);
  const [productDetails, setproductDetails] = useState({
    name: '',
    image: '',
    category: '',
    new_price:'',
    old_price:'',
  })

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        setimage(reader.result);
      };

      reader.readAsDataURL(file);
    } else {
      setimage(null);
    }
  };

  const changeHandeler = (e) => {
    setproductDetails({ ...productDetails, [e.target.name]: e.target.value });
    
  }

  const addProducts = async() => {
    let responseData;
    let product = productDetails;
    let formData =new FormData();
    formData.append('product', image)
    console.log(formData);
    
    await fetch('http://localhost:4000/upload', {
      method: 'POST',
      headers: {
        Accept:'application/json',
      }, 
      body:formData,
    }).then((resp) => resp.json()).then((data) => { responseData = data })
    
    if (responseData.success)
    {
      product.image = responseData.image_url;
    }
    console.log(product);
  }


  return (
      <div className='add-product' >
          
          {/* name of product */}
          <div className="addproduct-itemfield">
              <p>Product title</p>
              <input value={productDetails.name} type="text" onChange={changeHandeler} name='name' placeholder='Product name' />
          </div>
          
          {/* prices of product */}
          <div className="addproduct-price">
              <div className="addproduct-itemfield">
                  <p>Price</p>
                  <input value={productDetails.old_price} onChange={changeHandeler} type="number" name='old_price' placeholder='Old Price' />
              </div>
              <div className="addproduct-itemfield">
                  <p>Offer Price</p>
                  <input value={productDetails.new_price} onChange={changeHandeler} type='number' name='new_price' placeholder='New Price' />              </div>
              </div>
              {/* categoty of produce */}
               <div className="addproduct-itemfield">
                  <p>Product Category</p>
                  <select value={productDetails.category} onChange={changeHandeler} name="category" className='add-product-selector' >
                      <option value="men">Men</option>
                      <option value="women">Women</option>
                      <option value="kid">Kid</option>
                  </select>             
              </div>

              {/* image of product */}
               <div className="addproduct-itemfield">
                  <label htmlFor="file-input">
                      <img  src={image? image:upload_area} alt="" className='addproduct-thumnail-img' />
                  </label>
        <input value={productDetails.image} onChange={handleImageChange} type="file" name='image' id='file-input' accept='image/*'  hidden />
              </div>
              <button className="addproduct-btn" onClick={()=>addProducts()} >Add</button>
    </div>
  )
}

export default AddProduct