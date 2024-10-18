import React, { useEffect, useState } from 'react';
import logo from '@/img/logo.png';
import gmail from '@/img/gmail.png';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const showHiddenPass = () => {
      const input = document.getElementById('login-pass');
      const iconEye = document.getElementById('login-eye');

      if (input && iconEye) {
        iconEye.addEventListener('click', () => {
          if (input.type === 'password') {
            input.type = 'text';
            iconEye.classList.add('ri-eye-line');
            iconEye.classList.remove('ri-eye-off-line');
          } else {
            input.type = 'password';
            iconEye.classList.remove('ri-eye-line');
            iconEye.classList.add('ri-eye-off-line');
          }
        });
      }
    };

    showHiddenPass();

    // Clean up the event listener on component unmount
    return () => {
      const iconEye = document.getElementById('login-eye');
      if (iconEye) {
        iconEye.removeEventListener('click', () => {});
      }
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Username:', username);
    console.log('Password:', password);
  };

  return (
    <div style={styles.login}>
      <form style={styles.loginForm} onSubmit={handleSubmit}>
        <div style={styles.logoContainer}>
          <img src={logo.src} alt="Logo" style={styles.logo} />
        </div>
        <h3 style={styles.title}>Login</h3>

        <div style={styles.content}>
          <div style={styles.inputBox}>
            <input
              type="email"
              required
              style={styles.input}
              id="login-email"
              placeholder="Email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div style={styles.inputBox}>
            <input
              type="password"
              required
              style={styles.input}
              id="login-pass"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <i className="ri-eye-off-line" id="login-eye" style={styles.eyeIcon}></i>
          </div>
        </div>

        <div style={styles.forgotPassword}>
          <a href="#" style={styles.forgotLink}>Forgot Password?</a>
        </div>

        <button type="submit" style={styles.submitButton}>Login</button>

        <div style={styles.registerSection}>
          <p style={styles.signUpText}>or sign up using</p>
          <div style={styles.gmailContainer}>
            <img src={gmail.src} alt="Gmail" style={styles.gmailIcon} />
          </div>
          <a href="/Register" style={styles.signUpLink}>SIGN UP</a>
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
  },
  logo: {
    display: 'block',
    margin: '0 auto',
    width: '70%',
  },
  title: {
    fontSize: '1.75rem',
    marginBottom: '2rem',
    color: '#fff',
  },
  content: {
    display: 'grid',
    rowGap: '1.5rem',
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
  },
  forgotPassword: {
    textAlign: 'right',
    marginTop: '1rem',
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
    backgroundColor: 'transparent',
    border: '2px solid #fff',
    color: '#fff',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  submitButtonHover: {
    backgroundColor: '#fff',
    color: '#0B162B',
  },
  registerSection: {
    marginTop: '2rem',
    textAlign: 'center',
  },
  signUpText: {
    color: '#fff',
    marginBottom: '0.5rem',
  },
  gmailContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '1rem',
  },
  gmailIcon: {
    width: '50px',
    height: '50px',
  },
  signUpLink: {
    color: '#fff',
    fontWeight: '500',
    textDecoration: 'none',
  },
};
