import React, { useContext, useState } from 'react'
import { authStyles as styles } from '../assets/dummystyle'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { validateEmail } from '../utils/helper';
import axiosInstance from '../utils/axiosIntance';
import { API_PATH } from '../utils/apiPaths';
import {Input} from '../components/Inputs';

const SignUp = ({setCurrentPage}) => {
    
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignUp = async (e) =>{
    e.preventDefault();
    if(!fullName) {
        setError('Please enter Full Name');
        return;
    } if (!validateEmail(email)){
        setError('Please enter valid Mail');
        return;
    } if (!password) {
        setError('Please enter Password');
        return;
    }
    setError('');

    try {
        const response = await axiosInstance.post(API_PATH.AUTH.REGISTER,
            {
                name: fullName,
                email,
                password,
            }
        );
        const {token} = response.data;
        if(token){
            localStorage.setItem('token', token);
            updateUser(response.data);
            navigate('/dashboard')
        }
    } catch (error) {
        setError(error.response?.data?.message || 'Something went wrong')        
    }
  }

  return (
    <div className={styles.signupContainer}>
        <div className={styles.headerWrapper}>
            <h3 className={styles.signupTitle}>
                Create Account
            </h3>
            <p className={styles.signupSubtitle}>
                Join thousands of professionals today
            </p>
        </div>
        {/* FROM */}
        <form onSubmit={handleSignUp} className={styles.signupForm}>
            <Input value={fullName} onChange={({target})=> setFullName(target.value)}
            label='Full Name'
            placeholder ='John Doe'
            type='text' />

            <Input value={email} onChange={({target})=> setEmail(target.value)}
            label='Email'
            placeholder ='email@example.com'
            type='email' />

            <Input value={password} onChange={({target})=> setPassword(target.value)}
            label='Password'
            placeholder ='Enter your password'
            type='password' />

            {error && <div className={styles.errorMessage}>{error}</div>}
            <button type='submit' className={styles.signupSubmit}>
                Create Account
            </button>

            <p className={styles.switchText}>
                Already have an account? {' '}
                <button onClick={() => setCurrentPage('login')} type='button' className={styles.signupSwitchButton}>Sign In</button>
            </p>
        </form>
    </div>
  )
}

export default SignUp
