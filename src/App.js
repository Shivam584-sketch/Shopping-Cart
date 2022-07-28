import React from 'react';
//import CartItem from './CartItem'; 
import Cart from './Cart';
import Navbar from './Navbar';
import { db } from './firebase-config';
import {collection ,addDoc, getDocs, doc , updateDoc, deleteDoc, query , onSnapshot , where}  from "firebase/firestore"
class App extends React.Component {
  constructor(){
    super();
    this.state = {
       products:[],
       loading: true
    }
   //this.testing();
}

componentDidMount(){

  const prods = collection(db ,'products')
    const q = query(prods , where('price' , "==" , 999))
    onSnapshot(prods ,snapshot =>{
      /* snapshot.docs.map((doc)=>{
        console.log(doc.data());
      }); */
  
      const products = snapshot.docs.map((doc)=>{
        const data = doc.data();
        data['id'] = doc.id;

        console.log("data" , data);
        return data;
      })
  
      this.setState({
        products,
        loading:false
      })
  
      })
}


handleIncreaseQuantity = (product) => {
    console.log('hey please increse in qty of ', product)
    const{products} = this.state;
    const index = products.indexOf(product);

    // products[index].Qty += 1;
    
    // this.setState({
    //     products
    // })

    const docRef = doc(db , "products" , products[index].id);

    // docRef.update({
    //   Qty : product[index].Qty + 1
    // })
    // .then(()=>{
    //   console.log('Updated successfully')
    // })

    updateDoc(docRef ,{
      Qty : products[index].Qty + 1
    }).then(()=>{
      console.log('Updated successfully')
    })
    
}
handleDecreaseQuantity = (product) => {
    console.log('hey please increse in qty of ', product)
    const{products} = this.state;
    const index = products.indexOf(product);
    if(products[index].Qty ===0){
        return;
    }
    // products[index].Qty -= 1;
    
    // this.setState({
    //     products
    // })
    const docRef = doc(db , "products" , products[index].id);
    updateDoc(docRef, {
      Qty : products[index].Qty - 1
    }).then(()=>{
      console.log('Updated successfully')
    })
}
handleDeleteProduct = (id) =>{
    const{products} = this.state;
    // const items = products.filter((item) => item.id != id);

    // this.setState({
    //     products:items
    // })
    deleteDoc(doc(db, "products" , id))
    .then(()=>{
      console.log('Deleted successfully');
    })


}

getCartCount = ()=>{
  const {products} = this.state;
  let count = 0;
  products.forEach((product) =>{
    count += product.Qty;
  })
  return count; 

}
getCartTotal = () =>{
  const {products} = this.state;
  let cartTotal = 0;
  products.map((product) =>{
    cartTotal = cartTotal + product.Qty * product.price;
  })
  return cartTotal;
}
addProduct = () =>{
   addDoc(collection(db, 'products') , {
    title: 'ipad',
    Qty: 3,
    price: 90000,
    img : ""
  }).then((docRef) =>{
    console.log('product has been added', docRef)
  })

  
}
  render(){
    const {products,loading} = this.state;
  return (
    <div className="App">
    <Navbar count = {this.getCartCount()}/>
    {/*<button onClick={this.addProduct} style = {{padding : 15, fontSize : 20}}>Add a product</button> */}
     <Cart 
    products  = {products}
      onIncreaseQuantity = {this.handleIncreaseQuantity}
      onDecreaseQuantity = {this.handleDecreaseQuantity}
      onDeleteProduct = {this.handleDeleteProduct} />
      {loading && <h1>Loading Products...</h1>}
      <div style={{padding :10 , fontSize: 20}}>TOTAL : {this.getCartTotal()}</div>
    </div>
  );
  }
}

export default App;
