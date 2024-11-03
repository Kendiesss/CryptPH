import React, { useState } from 'react';
import { useRouter } from 'next/router'; // Import useRouter for navigation in Next.js
import logo from '@/img/logo.png';

function RegisterPage() {
  const router = useRouter(); // Initialize useRouter for navigation
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [birthday, setBirthday] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Contact Number:', contactNumber);
    console.log('Birthday:', birthday);
    console.log('Password:', password);
    console.log('Confirm Password:', confirmPassword);
  };

  return (
    <div style={styles.register}>
      <form style={styles.registerForm} onSubmit={handleSubmit}>
        <div style={styles.logoContainer} onClick={() => router.push('/')}>
          <img src={logo.src} alt="Logo" style={styles.logo} />
        </div>
        <h3 style={styles.title}>Register</h3>

        <div style={styles.content}>
          <div style={styles.inputBox}>
            <input
              type="email"
              id="register-email"
              required
              style={styles.input}
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div style={styles.inputBox}>
            <input
              type="tel"
              id="register-contact"
              required
              style={styles.input}
              placeholder="Contact Number"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
            />
          </div>

          <div style={styles.inputBox}>
            <input
              type="date"
              id="register-birthday"
              required
              style={styles.input}
              placeholder="Birthday"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
            />
          </div>

          <div style={styles.inputBox}>
            <input
              type={showPassword ? 'text' : 'password'}
              id="register-pass"
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
              {showPassword ? '🙈' : '👁️'}
            </span>
          </div>

          <div style={styles.inputBox}>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirm-pass"
              required
              style={styles.input}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <span
              style={styles.eyeIcon}
              onClick={toggleConfirmPasswordVisibility}
            >
              {showConfirmPassword ? '🙈' : '👁️'}
            </span>
          </div>
        </div>

        <p style={styles.termsText}>
          By signing up, you agree to our <a href="/terms" style={styles.link}>Terms of Use</a> and <a href="/privacy" style={styles.link}>Privacy Policy</a>.
        </p>

        <button type="submit" style={styles.registerButton}>Sign up</button>

        <p style={styles.loginText}>
          Already have an account? <a href="/Login" style={styles.loginLink}>Login</a>
        </p>
      </form>
    </div>
  );
}

const styles = {
  register: {
    position: 'relative',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0B162B',
  },
  registerForm: {
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
    cursor: 'pointer', // Make the logo clickable
  },
  logo: {
    display: 'block',
    margin: '0 auto',
    width: '70%',
  },
  title: {
    fontSize: '1.75rem',
    marginBottom: '1.5rem',
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
    fontSize: '1.25rem',
  },
  termsText: {
    fontSize: '0.875rem',
    color: '#ffffffb3',
    textAlign: 'center',
    marginTop: '1rem',
    marginBottom: '1.5rem',
  },
  link: {
    color: '#3B82F6',
    textDecoration: 'none',
  },
  registerButton: {
    width: '100%',
    padding: '0.75rem',
    borderRadius: '50px',
    backgroundColor: '#1D4ED8',
    color: '#fff',
    fontWeight: '500',
    cursor: 'pointer',
    border: 'none',
    marginTop: '1rem',
  },
  loginText: {
    color: '#fff',
    marginTop: '1rem',
  },
  loginLink: {
    color: '#3B82F6',
    fontWeight: '500',
    textDecoration: 'none',
  },
};

export default RegisterPage;
