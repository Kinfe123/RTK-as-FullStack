import CartContainer from "./components/CartContainer";
import Navbar from "./components/Navbar";
import { useEffect } from "react";
import { useDispatch , useSelector } from "react-redux";
import { calculateTotal, getCartItems } from "./features/cart/cartSlice";
import Modal from "./components/Modal";


function App() {
  const dispatch = useDispatch()
  const {isOpen} = useSelector((state)=>state.modal)
  
  const {cartItems , isLoading} = useSelector((state)=> state.cart)


  useEffect(()=>{
    dispatch(calculateTotal())
   } , [cartItems])

   useEffect(()=> {
    dispatch(getCartItems())
  } , [])
  if (isLoading) {
    return (
      <div className="loading">
         <h1>Loading...</h1>
      </div>
    )
  }
  return (
  
  <main >
   
  
    {isOpen && <Modal />}
   
    <Navbar />

    <CartContainer />


    
    
    
    </main>)
}
export default App;
