import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../util";
import { ToastContainer } from "react-toastify";

const Home = () => {
  const [loggedInUser,setLoggedInUser] = useState('');
  const [products,setProducts] = useState([]);
  const navigate = useNavigate();

  const handleLogout = ()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    handleSuccess("Logout Successfully")
    setTimeout(()=>{
      navigate("/login");
    },1000)
  }

  const fetchProducts = async ()=>{
    try {
        const url = "https://auth-app-api-eight.vercel.app/products";
        const headers = {
          headers :{
            "Authorization" : localStorage.getItem("token")
          }
        }
        const response = await fetch(url,headers);
        const result = await response.json();
        setProducts(result);

    } catch (error) {
      handleError(error);
    }
  }

  useEffect(()=>{
     setLoggedInUser(localStorage.getItem('loggedInUser'));
     fetchProducts();
  },[]);
  
  return (
    <div>
      <h1>Hi {loggedInUser} , Welcome to MySite</h1>
      <button onClick={handleLogout}>Logout</button>
      <div>
        { products && products?.map((el)=>{
           return <ul key={el.name}>
            <h3>{el.name} : {el.price}</h3>
           </ul>
        })}
      </div>
      <ToastContainer/>
    </div>
  )
}

export default Home
