import React from 'react';
import SignUp from '../components/Authentication/SignUp';
import LogIn from '../components/Authentication/LogIn';
import '../index.css';

export const LandingPage = () => {
  const [activeTab, setActiveTab] = React.useState('login');

  return (
    <>
      <div className='container'>
        <div className='text'>
          <h1>ChillChat</h1>
        </div>
        <div
          style={{
            backgroundColor: 'white',
            width: '100%',
            padding: '20px',
            borderRadius: '8px',
            color: 'black',
            border: '1px solid #ccc',
          }}>
          <div className='second-container'>
            <button className='logInBtn'
              style={{
                flex: 1,
                padding: '5px',
                backgroundColor: activeTab === 'login' ? 'aliceblue' : 'lightblue',
                border: 'none',
                borderRadius: '10px',
                cursor: 'pointer',
              }}

              onClick={() => setActiveTab('login')}
            >
              Log In
            </button>
            <button className='signUpBtn'
              style={{
                flex: 1,
                padding: '5px',
                backgroundColor: activeTab === 'signup' ? 'aliceblue' : 'lightblue',
                border: 'none',
                borderRadius: '10px',
                cursor: 'pointer',
              }}

              onClick={() => setActiveTab('signup')}
            >
              Sign Up
            </button>
          </div>
          <div>
            {activeTab === 'login' && <LogIn />}
            {activeTab === 'signup' && <SignUp />}
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
