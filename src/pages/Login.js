import { useState } from 'react';
import styles from '../styles/login.module.css';
import { useToasts } from 'react-toast-notifications';
// import { login } from '../api';
import { useAuth } from '../hooks';
import { Navigate } from 'react-router-dom'

const Login = () => {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [loggingIn,setLoggingIn] = useState(false);
  const {addToast} = useToasts();
  const auth = useAuth();
  console.log('auth',auth);

  const handleSubmit = async (e) =>{
    e.preventDefault();
    setLoggingIn(true);

    if(!email || !password){
        return addToast('Please enter both Email & Password',{
          appearance: 'error'
        });
    }
    const response = await auth.login(email,password);
    if(response.success){
      addToast('Successfully Logged In',{
        appearance: 'success'
      })
    }else{
      addToast(response.message,{
        appearance: 'error'
      })
    }
    setLoggingIn(false);
  };
  if(auth.user){
    return <Navigate to='/' />
  }
  return (
    <form className={styles.loginForm} onSubmit={handleSubmit}>
      <span className={styles.loginSignupHeader}>Log In</span>

      <div className={styles.field}>
        <input 
        type="email" 
        placeholder="Email"
        onChange={(e)=>{setEmail(e.target.value)}} 
        />
      </div>

      <div className={styles.field}>
        <input 
        type="password" 
        placeholder="Password"  
        onChange={(e)=>{setPassword(e.target.value)}}
        />
      </div>

      <div className={styles.field}>
        <button disabled={loggingIn}>{loggingIn? "Logging in.." : "Login" }</button>
      </div>
    </form>
  );
};

export default Login;
