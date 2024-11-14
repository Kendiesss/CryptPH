import React, {useState, useEffect} from 'react';
import { useRouter } from 'next/router';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import logo from '@/img/logo.png';
import Modal3 from '@/components/Layout/modal3';
import modalStyles from '@/styles/modal.module.css';






function RegisterPage() {
  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);

  const openTermsModal = () => setIsTermsModalOpen(true);
  const closeTermsModal = () => setIsTermsModalOpen(false);

  const openPrivacyModal = () => setIsPrivacyModalOpen(true);
  const closePrivacyModal = () => setIsPrivacyModalOpen(false);

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

        <div style={styles.content} id='modal-root'>
          <div style={styles.inputBox}>
            <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} style={styles.input} required />
          </div>
          <div style={styles.inputBox}>
            <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} style={styles.input} required />
          </div>
          <div style={styles.inputBox}>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} style={styles.input} required />
          </div>
          <div style={styles.inputBox}>
            <input type={showPassword ? 'text' : 'password'} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} style={styles.input} required />
            <span onClick={togglePasswordVisibility} style={styles.eyeIcon}>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
          </div>
        </div>

        <p style={styles.termsText}>
          By signing up, you agree to our{' '}
          <span style={{ ...styles.link, cursor: 'pointer' }} onClick={() => setIsTermsModalOpen(true)}>
            Terms of Use 
          </span> and{' '}<span style={{ ...styles.link, cursor: 'pointer' }} onClick={() => setIsPrivacyModalOpen(true)}>
            Privacy Policy
          </span>.
        </p>


        <button type="submit" style={styles.registerButton}>Sign up</button>

        <p style={styles.loginText}>
          Already have an account? <a href="/Login" style={styles.loginLink}>Login</a>
        </p>
      </form>

      {/* Privacy Modal */}
      <Modal3
          isOpen={isPrivacyModalOpen}
          onClose={closePrivacyModal}
          title="Privacy Policy"
          content={
            <div 
              style={{
                whiteSpace: 'pre-line',
                lineHeight: '1.6', // Adjust line height for paragraphs
                maxHeight: 'calc(80vh - 100px)', 
                overflowY: 'auto',
                backgroundColor: '#f4f4f4',
                borderRadius: '8px',
                padding: '20px',
                marginBottom: '20px',
                fontFamily: "'Roboto', sans-serif"
              }}
            >
              <h3 style={{ marginBottom: '5px', fontSize: '1.8rem', lineHeight: '1.2' }}>Information Collection</h3>
              <p style={{ textIndent: '30px', textAlign: 'justify', marginBottom: 'px', marginBottom: '10px' }}>
                CryptPH collects user information to enhance platform functionality, improve educational content, and offer more relevant tools for historical crypto data analysis. Information collected may include personal data, such as name, email address, and usage behavior on the platform. CryptPH also collects data automatically, like IP addresses and browser types, to help improve security and personalize user experiences.
              </p>
          
              <h3 style={{ marginBottom: '5px', fontSize: '1.8rem', lineHeight: '1.2' }}>Use of Information</h3>
              <p style={{ textIndent: '30px', textAlign: 'justify', marginBottom: 'px', marginBottom: '10px' }}>
                The information CryptPH collects is used primarily to provide users with an optimal experience, to maintain and secure platform operations, and to develop educational materials tailored to the Philippine crypto market. Information may also be used to send periodic updates, announcements, and responses to inquiries. CryptPH does not sell or rent personal information to third parties.
              </p>
          
              <h3 style={{ marginBottom: '5px', fontSize: '1.8rem', lineHeight: '1.2' }}>Data Sharing and Third Parties</h3>
              <p style={{ textIndent: '30px', textAlign: 'justify', marginBottom: 'px', marginBottom: '10px' }}>
                CryptPH may share data with trusted service providers who assist in delivering the platform’s services, such as payment processors, analytics providers, and email services. These third parties are obligated to handle data responsibly and only for the purposes of providing services to CryptPH. If CryptPH is acquired or merges with another company, user data may be transferred to the new entity in compliance with applicable privacy laws.
              </p>
          
              <h3 style={{ marginBottom: '5px', fontSize: '1.8rem', lineHeight: '1.2' }}>Data Security</h3>
              <p style={{ textIndent: '30px', textAlign: 'justify', marginBottom: 'px', marginBottom: '10px' }}>
                CryptPH employs reasonable security measures to protect user data from unauthorized access, disclosure, or destruction. However, no method of electronic storage or transmission is entirely secure, and CryptPH cannot guarantee absolute security. Users are encouraged to take their own precautions in safeguarding their account information and to report any suspicious activity immediately.
              </p>
          
              <h3 style={{ marginBottom: '5px', fontSize: '1.8rem', lineHeight: '1.2' }}>User Rights</h3>
              <p style={{ textIndent: '30px', textAlign: 'justify', marginBottom: 'px', marginBottom: '10px' }}>
                Users have the right to access, update, or delete their personal information as maintained by CryptPH. Requests to modify or remove data may be submitted to our support team, and CryptPH will make reasonable efforts to accommodate these requests, subject to legal obligations. Users can also manage their communication preferences and opt out of receiving promotional emails.
              </p>
          
              <h3 style={{ marginBottom: '5px', fontSize: '1.8rem', lineHeight: '1.2' }}>Cookies and Tracking Technologies</h3>
              <p style={{ textIndent: '30px', textAlign: 'justify', marginBottom: 'px', marginBottom: '10px' }}>
                CryptPH uses cookies and similar tracking technologies to enhance the user experience, track usage patterns, and improve overall platform functionality. Cookies help personalize content and ads based on user interests. Users may modify their browser settings to refuse cookies, though this may limit access to certain features or functionalities of the platform.
              </p>
            </div>
          }
          
          footerActions={
            <>
              <button className={modalStyles.cancelButton} onClick={closePrivacyModal}>
                Close
              </button>
            </>
          }
        />
        
      {/* Terms Modal */}
      <Modal3
          isOpen={isTermsModalOpen}
          onClose={closeTermsModal}
          title="Terms of Use"
          content={
            <div 
              style={{
                whiteSpace: 'pre-line',
                lineHeight: '1.6',
                maxHeight: 'calc(80vh - 100px)', 
                overflowY: 'auto',
                backgroundColor: '#f4f4f4',
                borderRadius: '8px',
                padding: '20px',
                marginBottom: '20px',
                fontFamily: "'Roboto', sans-serif"
              }}
            >
              <h3 style={{ marginBottom: '10px', fontSize: '1.8rem', lineHeight: '1.2' }}>Acceptance of Terms</h3>
              <p style={{ textIndent: '30px', textAlign: 'justify', marginBottom: 'px' }}>
                By accessing or using CryptPH's platform, users agree to comply with these Terms of Use. This document serves as a binding agreement between the user and CryptPH regarding the use of its tools, educational content, and other resources related to historical crypto e-wallet data in the Philippines. If a user does not agree to these terms, they are advised to discontinue use of the platform.
              </p>
          
              <h3 style={{ marginBottom: '10px', fontSize: '1.8rem', lineHeight: '1.2' }}>Changes to Terms</h3>
              <p style={{ textIndent: '30px', textAlign: 'justify', marginBottom: 'px' }}>
                CryptPH reserves the right to update or modify these Terms of Use at any time without prior notice. Such changes take effect immediately upon being posted on the platform. Users are responsible for reviewing these terms regularly to stay informed of updates, as continued use of CryptPH’s tools and resources implies acceptance of any revised terms.
              </p>
          
              <h3 style={{ marginBottom: '10px', fontSize: '1.8rem', lineHeight: '1.2' }}>Services and Content</h3>
              <p style={{ textIndent: '30px', textAlign: 'justify', marginBottom: 'px' }}>
                CryptPH provides users with tools and educational content to access historical data on crypto e-wallets in the Philippines. While CryptPH strives to ensure accuracy and reliability in its data and materials, the platform does not guarantee that all information will be entirely accurate, complete, or up-to-date. Users should use the information as a guide and not as financial advice, as CryptPH is not responsible for any financial decisions made based on the platform's content.
              </p>
          
              <h3 style={{ marginBottom: '10px', fontSize: '1.8rem', lineHeight: '1.2' }}>Account Registration and Security</h3>
              <p style={{ textIndent: '30px', textAlign: 'justify', marginBottom: 'px' }}>
                To access certain features, users may be required to create an account. Users agree to provide accurate, current, and complete information during registration and to maintain the confidentiality of their login credentials. CryptPH is not liable for any unauthorized access or misuse of a user’s account resulting from the user’s failure to safeguard their login information.
              </p>
          
              <h3 style={{ marginBottom: '10px', fontSize: '1.8rem', lineHeight: '1.2' }}>Usage Restrictions</h3>
              <p style={{ textIndent: '30px', textAlign: 'justify', marginBottom: 'px' }}>
                CryptPH grants users a limited, non-exclusive license to access and use its tools and content for personal, non-commercial purposes. Users agree not to misuse the platform by copying, distributing, or exploiting content, engaging in data scraping, or using automated methods to access the platform’s resources. Unauthorized use of CryptPH’s materials may result in account termination and legal action.
              </p>
          
              <h3 style={{ marginBottom: '10px', fontSize: '1.8rem', lineHeight: '1.2' }}>Third-Party Content and Links</h3>
              <p style={{ textIndent: '30px', textAlign: 'justify', marginBottom: 'px' }}>
                CryptPH may include links to third-party websites or resources for additional information. These links are provided for convenience and do not constitute an endorsement by CryptPH. Users acknowledge that CryptPH has no control over third-party content and is not responsible for its accuracy, availability, or privacy practices. Any transactions or interactions with third-party sites are solely between the user and the third party.
              </p>
          
              <h3 style={{ marginBottom: '10px', fontSize: '1.8rem', lineHeight: '1.2' }}>Limitation of Liability</h3>
              <p style={{ textIndent: '30px', textAlign: 'justify', marginBottom: 'px' }}>
                CryptPH disclaims any liability for direct, indirect, incidental, or consequential damages arising from the use or inability to use its tools, educational content, or data. Users acknowledge that CryptPH provides content "as-is" without any warranties regarding its completeness, accuracy, or fitness for a particular purpose. Users assume full responsibility for their use of CryptPH’s resources.
              </p>
          
              <h3 style={{ marginBottom: '10px', fontSize: '1.8rem', lineHeight: '1.2' }}>Governing Law and Dispute Resolution</h3>
              <p style={{ textIndent: '30px', textAlign: 'justify', marginBottom: 'px' }}>
                These Terms of Use shall be governed by and construed in accordance with the laws of the Philippines. Any disputes arising from or relating to these terms or the use of CryptPH's platform shall be subject to the exclusive jurisdiction of the courts of the Philippines. Users agree to submit to these jurisdictional terms in the event of a legal dispute.
              </p>
            </div>
          }
          
        footerActions={
            <>
              <button className={modalStyles.cancelButton} onClick={(e) => {
                e.preventDefault(); // Prevent any form submission or validation
                closeTermsModal(); // Close the modal
              }}>
                Close
              </button>            
            </>
            }
        />
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
