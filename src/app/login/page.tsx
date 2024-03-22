// Import necessary modules and components
'use client';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '../../lib/firebase';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import './page.css';
import { useRouter } from 'next/navigation';

// Main component for the authentication page
function Page() {
  const router = useRouter();

  // State to manage form input details
  const [details, setDetails] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  // Use effect to set up click event listeners for switching between sign-in and sign-up modes
  useEffect(() => {
    const handleSignUpClick = () => {
      const container = document.querySelector('.container');
      container?.classList.add('sign-up-mode');
    };

    const handleSignInClick = () => {
      const container = document.querySelector('.container');
      container?.classList.remove('sign-up-mode');
    };

    const sign_up_btn = document.querySelector('#sign-up-btn');
    const sign_in_btn = document.querySelector('#sign-in-btn');

    // Cleanup event listeners on component unmount
    sign_up_btn?.addEventListener('click', handleSignUpClick);
    sign_in_btn?.addEventListener('click', handleSignInClick);

    // Cleanup event listeners on component unmount
    return () => {
      sign_up_btn?.removeEventListener('click', handleSignUpClick);
      sign_in_btn?.removeEventListener('click', handleSignInClick);
    };
  }, []);

  // Function to handle sign-in
  const signIn = () => {
    signInWithEmailAndPassword(auth, details.email, details.password)
      .then((auth) => {
        router.push('/');
        console.log(auth);
      })
      .catch((error) => console.log(error));
  };

  // Function to handle sign-up
  const signUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        details.email,
        details.password,
      );
      const user = userCredential.user;
      console.log('User signed up:', user);
      router.push('/');
    } catch (error) {
      console.error('Signup error:', error);
    }
  };

  // Function to handle form submission
  const onSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', details);
    router.push('/');
  };

  // Function to handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setDetails((prevDetails) => ({
      ...prevDetails,
      [id]: value,
    }));
  };

  // Render the authentication page
  return (
    <div className="container">
      <div className="forms-container">
        <div className="signin-signup">
          <form action="#" className="sign-in-form" onSubmit={onSubmit}>
            <h2 className="title">Sign in</h2>
            <div className="input-field">
              <i className="fas fa-envelope"></i>{' '}
              <input
                type="email"
                placeholder="email"
                id="email"
                value={details.email}
                onChange={handleChange}
              />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                placeholder="Password"
                id="password"
                value={details.password}
                onChange={handleChange}
              />
            </div>
            <button
              type="submit"
              value="Login"
              className="btn solid"
              id="login"
              onClick={signIn}
            >
              Login
            </button>
            <p className="social-text">Or Sign in with social platforms</p>
            <div className="social-media">
              <a
                href="#"
                className="social-icon"
                type="submit"
                id="facebookLogin"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social-icon" type="submit" id="appleLogin">
                <i className="fab fa-apple"></i>
              </a>
              <a
                href="#"
                className="social-icon"
                type="submit"
                id="googleLogin"
              >
                <i className="fab fa-google"></i>
              </a>
              <a
                href="#"
                className="social-icon"
                type="submit"
                id="microsoftLogin"
              >
                <i className="fab fa-microsoft"></i>
              </a>
            </div>
          </form>
          <form action="#" className="sign-up-form" onSubmit={onSubmit}>
            <h2 className="title">Sign up</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input type="text" placeholder="Username" id="username" />
            </div>
            <div className="input-field">
              <i className="fas fa-envelope"></i>{' '}
              <input
                type="email"
                placeholder="email"
                id="email"
                value={details.email}
                onChange={handleChange}
              />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                placeholder="Password"
                id="password"
                value={details.password}
                onChange={handleChange}
              />
            </div>
            <button
              type="submit"
              className="btn"
              value="Sign up"
              id="signUp"
              onClick={signUp}
            >
              Sign up
            </button>
            <p className="social-text">Or Sign up with social platforms</p>
            <div className="social-media">
              <a
                href="#"
                className="social-icon"
                type="submit"
                id="facebookLogin"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social-icon" type="submit" id="appleLogin">
                <i className="fab fa-apple"></i>
              </a>
              <a
                href="#"
                className="social-icon"
                type="submit"
                id="googleLogin"
              >
                <i className="fab fa-google"></i>
              </a>
              <a
                href="#"
                className="social-icon"
                type="submit"
                id="microsoftLogin"
              >
                <i className="fab fa-microsoft"></i>
              </a>
            </div>
          </form>
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>New here ?</h3>
            <p>
              Make sure to sign up!
            </p>
            <button className="btn transparent" id="sign-up-btn">
              Sign up
            </button>
          </div>
          <img src="img/log.svg" className="image" alt="" />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>One of us ?</h3>
            <p>
              Already have an account? Just click log in.
            </p>
            <button className="btn transparent" id="sign-in-btn">
              Sign in
            </button>
          </div>
          <img src="img/register.svg" className="image" alt="" />
        </div>
      </div>
    </div>
  );
}

// Export the component as the default export
export default Page;
