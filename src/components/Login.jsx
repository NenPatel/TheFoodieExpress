import React from 'react';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
// import { app } from '../../Config';
import * as Yup from 'yup';
// import './Login.css'
// import { GoogleAuthProvider } from "firebase/auth";
import { getAuth, signInWithEmailAndPassword , signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// import { getAuth, } from "firebase/auth";

const Login = () => {
 
  const navigate = useNavigate();
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const submitGoogle = () => {
    signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    console.log("login done")
    navigate("/")
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    console.log("logout done")
    alert(error)
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
  }
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
        email: Yup.string().email('Invalid email address').required('Required field'),
        password: Yup.string().min(8,'Atleast 8 character').required('Required field')
      }),
    onSubmit: values => {
    //   alert(JSON.stringify(values, null, 2));

    signInWithEmailAndPassword(auth, formik.values.email, formik.values.password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      navigate("/")
      // ...
    })
    .catch((error) => {
        alert(error)
      const errorCode = error.code;
      const errorMessage = error.message;
    });

    },
  });
  return (
    <div className='login'>
    
    <form onSubmit={formik.handleSubmit} className="form2">

      <div className='image-wall'>
      <img src='https://cdn6.f-cdn.com/contestentries/1992979/57692064/6138d7b564fb9_thumb900.jpg' alt="TechCart" />
      </div>

      <div>
      <h3>TechCart</h3>
      </div>

      {/* <label htmlFor="email">Email Address</label> */}
      <div>
      <input
        id="email"
        name="email"
        type="email"
        onChange={formik.handleChange}
        // onBlur={formik.handleBlur}
        value={formik.values.email}
        placeholder="Enter your Email"
      />
       {formik.touched.email && formik.errors.email ? (
         <div className='error_mess'>{formik.errors.email}</div>
       ) : null}

      </div>

      {/* <label htmlFor="password">Password</label> */}
      <div>
      <input
        id="password"
        name="password"
        type="password"
        onChange={formik.handleChange}
        // onBlur={formik.handleBlur}
        value={formik.values.password}
        placeholder="Enter your Password"
      />
       {formik.touched.password && formik.errors.password ? (
         <div className='error_mess'>{formik.errors.password}</div>
       ) : null}

      </div>

      <div>
      {/* <button type="submit">Submit</button> */}
      <button type="submit" class="btn btn-primary rounded-5 w-100">Submit</button>
      </div>

      <div>
      New User? <span><Link to="/register">Register here</Link></span>
      </div>
      <div>OR</div>
      <div><button type='button' onClick={submitGoogle}>Continue with Google</button></div>
    </form>
    </div>
  );
};

export default Login