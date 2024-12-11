import { useState } from 'react';
import logo from "@/img/logo.png";


export default function FeedbackForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    content: '',
  });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setStatus({ type: 'success', message: 'Feedback submitted successfully!' });
        setFormData({ name: '', email: '', subject: '', content: '' });
      } else {
        setStatus({ type: 'error', message: data.error || 'Submission failed.' });
      }
    } catch (error) {
      console.error('Error:', error);
      setStatus({ type: 'error', message: 'An error occurred. Please try again.' });
    }
  };

  return (
    <div style={styles.feedbackContainer}>
      <form style={styles.feedbackForm} onSubmit={handleSubmit}>
        <div style={styles.logoContainer} onClick={() => router.push("/")}>
          <img src={logo.src} alt="Logo" style={styles.logo} />
        </div>
        <h3 style={styles.formTitle}>Feedback Form</h3>
        {status && (
          <p style={{ color: status.type === 'success' ? 'green' : 'red' }}>
            {status.message}
          </p>
        )}
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

      </form>

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
    container: {
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: '#0B162B',
      color: '#fff',
      padding: '2rem',
      justifyContent: 'center',  // Center content horizontally
      alignItems: 'center',       // Center content vertically
    },
    textSection: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-start',
      padding: '2rem',
    },
    title: {
        fontSize: '3rem',
        fontWeight: 'bold',
        marginBottom: '20px',
      },
    description: {
      fontSize: '1rem',
      lineHeight: '1.5',
    },
    feedbackContainer: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
    },
    feedbackForm: {
      width: '100%',
      maxWidth: '400px',
      padding: '2rem',
      backgroundColor: '#0B162B',
      borderRadius: '8px',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
      color: '#fff',
      textAlign: 'center',
      margin: '200px',

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
    },
  };
  