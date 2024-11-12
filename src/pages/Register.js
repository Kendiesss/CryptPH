import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import logo from '@/img/logo.png';

function RegisterPage() {
  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validatePassword = (password) => {
    const errors = [];

    if (password.length < 8) {
      errors.push('at least 8 characters');
    }
    if (!/[A-Z]/.test(password)) {
      errors.push('an uppercase letter');
    }
    if (!/[a-z]/.test(password)) {
      errors.push('a lowercase letter');
    }
    if (!/[0-9]/.test(password)) {
      errors.push('a number');
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push('a special character');
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!firstName || !lastName || !email || !password) {
      setError('All fields are required');
      return;
    }

    const passwordErrors = validatePassword(password);
    if (passwordErrors.length > 0) {
      setError(`Password must contain ${passwordErrors.join(', ')}.`);
      return;
    }

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });

      const data = await res.json();

      if (data.success) {
        setSuccess('Registration successful! Redirecting to login...');
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');

        setTimeout(() => {
          router.push('/Login');
        }, 2000);
      } else {
        setError(data.error || "Failed to register.");
      }
    } catch (error) {
      console.error('Registration error:', error);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div style={styles.register}>
      <form style={styles.registerForm} onSubmit={handleSubmit}>
        <div style={styles.logoContainer} onClick={() => router.push('/')}>
          <img src={logo.src} alt="Logo" style={styles.logo} />
        </div>
        <h3 style={styles.title}>Register</h3>

        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}

        <div style={styles.content}>
          <div style={styles.inputBox}>
            <input
              type="text"
              id="register-firstname"
              required
              style={styles.input}
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          <div style={styles.inputBox}>
            <input
              type="text"
              id="register-lastname"
              required
              style={styles.input}
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

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
              type={showPassword ? 'text' : 'password'}
              id="register-password"
              required
              style={styles.input}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span style={styles.eyeIcon} onClick={togglePasswordVisibility}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
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
    cursor: 'pointer',
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
