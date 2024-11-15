import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Formik, Field, Form } from "formik";
import { handleError, handleSuccess } from '../util';

const Login = () => {
  // navigate hook
    const navigate = useNavigate();

    const handleSubmit = async ({ email, password }) => {
           if(!email || !password){
             return handleError('email and password cannot be empty');
           }
           //  signup logic here
           try {
                const url = "https://authapp-w0nt.onrender.com/auth/login";
                const response = await fetch(url ,{
                  method: "POST",
                  headers : {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({email,password})
                });
                const result = await response.json();
                // result contain 2 things success and message 
                const {success , message, jwtToken, name, error } = result;
                if(success){
                  handleSuccess(message);
                  localStorage.setItem('token',jwtToken);
                  localStorage.setItem('loggedInUser',name);
                  setTimeout(()=>{
                    navigate("/home");
                  },1000)
                }
                else if(error){
                  const details = error?.details[0].message;
                  handleError(details);
                }
                else if(!success){
                   handleError(message);
                }
           } catch (error) {
           }
        };

        // form component using Formik library
  return (
    <div className='container'>
      <h1>Login</h1>
      <Formik 
        initialValues={{ email: "", password: "" }}
        onSubmit={handleSubmit}
      >
        <Form> 
          <div>
            <label htmlFor='email'>Email</label>
            <Field
              type='email'
              name='email'
              placeholder='Enter your email...'
            />
          </div>
          <div>
            <label htmlFor='password'>Password</label>
            <Field
              type='password'
              name='password'
              placeholder='Enter your password...'
            />
          </div>
          <button type='submit'>Login</button>
         <span>Dont't have an account? <Link to="/signup">Signup</Link></span> 
        </Form>
      </Formik>
      <ToastContainer />
    </div>
  );
}

export default Login;
