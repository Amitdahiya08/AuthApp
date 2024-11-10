import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Formik, Field, Form } from "formik";
import { handleError, handleSuccess } from '../util';

const Signup = () => {
  // navigate hook
    const navigate = useNavigate();

    const handleSubmit = async ({ name, email, password }) => {
           if(!name || !email || !password){
             return handleError('Name, email, and password cannot be empty');
           }
           //  signup logic here
           try {
                const url = "https://authapp-w0nt.onrender.com/auth/signup";
                const response = await fetch(url ,{
                  method: "POST",
                  headers : {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({name,email,password})
                });
                const result = await response.json();
                // result contain 2 things success and message 
                const {success , message , error } = result;
                if(success){
                  handleSuccess(message);
                  setTimeout(()=>{
                    navigate("/login");
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
      <h1>Signup</h1>
      <Formik 
        initialValues={{ name: "", email: "", password: "" }}
        onSubmit={handleSubmit}
      >
        <Form> 
          <div>
            <label htmlFor='name'>Name</label>
            <Field
              type='text'
              name='name'
              autoFocus
              placeholder='Enter your name...'
            />
          </div>
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
          <button type='submit'>Signup</button>
          <span>Already have an account? <Link to="/login">Login</Link></span>
        </Form>
      </Formik>
      <ToastContainer />
    </div>
  );
}

export default Signup;
