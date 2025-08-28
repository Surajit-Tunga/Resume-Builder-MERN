import React, { useContext, useState } from 'react'
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosIntance';
import { API_PATH } from '../utils/apiPaths';
import { authStyles as styles } from '../assets/dummystyle'
import { validateEmail } from '../utils/helper';
import {Input} from '../components/Inputs'

const Login = ({setCurrentPage}) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handlelogin = async(e)=>{
    e.preventDefault()
    if (!validateEmail(email)){
            setError('Please enter valid Mail');
            return;
        } if (!password) {
            setError('Please enter Password');
            return;
        }
        setError('');

        try {
            const response = await axiosInstance.post(API_PATH.AUTH.LOGIN, {email,password});
            const {token} = response.data;
            if(token){
            localStorage.setItem('token', token);
            updateUser(response.data);
            navigate('/dashboard')
        }
        } catch (error) {
            setError(error.response?.data?.message || 'Something went wrong');            
        }
  }
  return (
    <div className={styles.container}>
        <div className={styles.headerWrapper}>
            <h3 className={styles.title}>Welcome Back</h3>
            <p className={styles.subtitle}>Sign in to continue building amazing resumes</p>
        </div>
        {/*FROM*/}
        <form onSubmit={handlelogin} className={styles.form}>
            <Input value={email} onChange={({target})=> setEmail(target.value)}
            label='Email'
            placeholder ='email@example.com'
            type='email' />

            <Input value={password} onChange={({target})=> setPassword(target.value)}
            label='Password'
            placeholder ='Enter your password'
            type='password' />

            {error && <div className={styles.errorMessage}>{error}</div>}
            <button type='submit' className={styles.submitButton}>
                Sign In
            </button>
            
            <p className={styles.switchText}>
                 Don't have an account? {' '}
                <button onClick={() => setCurrentPage('signup')} type='button' className={styles.switchButton}>Sign Up</button>
            </p>
        </form>
    </div>
  )
}

export default Login
