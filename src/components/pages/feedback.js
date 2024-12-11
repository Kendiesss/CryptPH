import React, { useState } from 'react';
import { useRouter } from 'next/router';
import logo from "@/img/logo.png";

export default function Feedback() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    content: '',
  });

  const [status, setStatus] = useState('');
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');
    try {
      const res = await fetch('/api/send-feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus('Feedback sent successfully!');
        setFormData({ name: '', email: '', subject: '', content: '' });
      } else {
        setStatus('Failed to send feedback.');
      }
    } catch (error) {
      console.error(error);
      setStatus('An error occurred. Please try again later.');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.feedbackContainer}>
        <form style={styles.feedbackForm} onSubmit={handleSubmit}>
        <div style={styles.logoContainer} onClick={() => router.push("/")}>
          <img src={logo.src} alt="Logo" style={styles.logo} />
        </div>
          <h3 style={styles.formTitle}>Submit Feedback</h3>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
            style={styles.input}
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            required
            style={styles.input}
          />
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Subject"
            required
            style={styles.input}
          />
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Your Message"
            required
            style={{
              ...styles.input,
              height: '100px',
              resize: 'none',
              backgroundColor: '#fff',
              color: '#0B162B',
              borderRadius: '8px',
              border: '1px solid rgba(0, 0, 0, 0.2)',
              padding: '10px',
            }}
          ></textarea>
          <button type="submit" style={styles.submitButton}>
            Submit Feedback
          </button>

          <button
            type="button"
            style={{
              ...styles.submitButton,
              backgroundColor: '#6B7280',
              marginTop: '1rem',
            }}
            onClick={() => router.push('/')}
          >
            Return to Home
          </button>
        </form>
      </div>

      <div style={styles.textSection}>
        <h1 style={styles.title}>Leave us a feedback!</h1>
        <p style={styles.description}>
          We value your input to improve our services. Please take a moment to share your thoughts.
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#0B162B',
    color: '#fff',
    padding: '2rem',
  },
  textSection: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: '2rem',
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
  description: {
    fontSize: '1rem',
    lineHeight: '1.5',
  },
  feedbackContainer: {
    flex: 1,
    display: 'flex',
    margin: '100px',
    alignItems: 'center',
  },
  title: {
    fontSize: '3rem',
    fontWeight: 'bold',
    marginBottom: '20px',
  },  
  feedbackForm: {
    width: '100%',
    maxWidth: '350px',
    padding: '2rem',
    backgroundColor: '#0B162B',
    borderRadius: '8px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
    color: '#fff',
    textAlign: 'center',
  },
  formTitle: {
    fontSize: '1.75rem',
    marginBottom: '1rem',
    color: '#fff',
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    background: 'none',
    border: 'none',
    color: '#fff',
    fontSize: '1rem',
    fontFamily: 'Poppins, sans-serif',
    outline: 'none',
    marginBottom: '1rem',
    borderBottom: '1px solid rgba(255, 255, 255, 0.5)',
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
    '&:hover': {
      backgroundColor: '#fff',
      color: '1D4ED8',
    },
  },
  
};
