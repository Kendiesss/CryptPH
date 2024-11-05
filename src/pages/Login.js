import React, { useState } from 'react';
import { useRouter } from 'next/router'; 
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import logo from '@/img/logo.png';

export default function LoginPage() {
  const router = useRouter(); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div style={styles.login}>
      <form style={styles.loginForm} onSubmit={handleSubmit}>
        <div style={styles.logoContainer} onClick={() => router.push('/')}>
          <img src={logo.src} alt="Logo" style={styles.logo} />
        </div>
        <h3 style={styles.title}>Login</h3>

        <div style={styles.content}>
          <button type="button" style={styles.googleButton}>
            <FcGoogle style={styles.googleIcon} />
            Continue with Google
          </button>

          <div style={styles.inputBox}>
            <input
              type="email"
              id="login-email"
              required
              style={styles.input}
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div style={styles.inputBox}>
            <input
              type={showPassword ? 'text' : 'password'}
              id="login-pass"
              required
              style={styles.input}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              style={styles.eyeIcon}
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>

        <div style={styles.forgotPassword}>
          <a href="#" style={styles.forgotLink}>Forgot Password?</a>
        </div>

        <button type="submit" style={styles.submitButton}>Login</button>

        <div style={styles.registerSection}>
          <p style={styles.signUpText}>
            Don't have an account yet? <a href="/Register" style={styles.signUpLink}>Sign up</a>.
          </p>
        </div>
      </form>
    </div>
  );
}

const styles = {
  login: {
    position: 'relative',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0B162B',
  },
  loginForm: {
    width: '100%',
    maxWidth: '400px',
    padding: '2rem',
    backgroundColor: '#0B162B',
    borderRadius: '8px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
    color: '#fff',
    textAlign: 'center',
  },
  logoContainer: {
    marginBottom: '2rem',
    cursor: 'pointer', 
  },
  logo: {
    display: 'block',
    margin: '0 auto',
    width: '70%',
  },
  title: {
    fontSize: '1.75rem',
    marginBottom: '1rem',
    color: '#fff',
  },
  content: {
    display: 'grid',
    rowGap: '1.5rem',
  },
  googleButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: '0.75rem',
    borderRadius: '50px',
    backgroundColor: '#fff',
    color: '#0B162B',
    fontWeight: '500',
    cursor: 'pointer',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    marginBottom: '1.5rem',
    border: 'none',
  },
  googleIcon: {
    marginRight: '0.5rem',
    fontSize: '1.25rem',
  },
  inputBox: {
    position: 'relative',
    borderBottom: '1px solid rgba(255, 255, 255, 0.5)',
  },
  input: {
    width: '100%',
    padding: '0.75rem 0',
    background: 'none',
    border: 'none',
    color: '#fff',
    fontSize: '1rem',
    fontFamily: 'Poppins, sans-serif',
    outline: 'none',
  },
  eyeIcon: {
    position: 'absolute',
    right: '10px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '1.25rem',
  },
  forgotPassword: {
    textAlign: 'right',
    marginTop: '1rem',
    marginBottom: '1.5rem',
  },
  forgotLink: {
    color: '#ffffffb3',
    fontSize: '0.875rem',
    textDecoration: 'none',
  },
  submitButton: {
    width: '100%',
    padding: '0.75rem',
    borderRadius: '50px',
    backgroundColor: '#1D4ED8',
    color: '#fff',
    fontWeight: '500',
    cursor: 'pointer',
    border: 'none',
    transition: 'all 0.3s ease',
  },
  registerSection: {
    marginTop: '2rem',
    textAlign: 'center',
  },
  signUpText: {
    color: '#fff',
  },
  signUpLink: {
    color: '#3B82F6',
    fontWeight: '500',
    textDecoration: 'none',
  },
};