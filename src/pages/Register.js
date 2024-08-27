import React, { useEffect, useState } from 'react';
import logo from '@/img/logo.png';


function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [birthday, setBirthday] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    const showHiddenPass = (passId, eyeId) => {
      const input = document.getElementById(passId);
      const iconEye = document.getElementById(eyeId);

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
    };

    showHiddenPass('register-pass', 'register-eye');
    showHiddenPass('confirm-pass', 'confirm-eye');
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle registration logic here
    console.log('Username:', username);
    console.log('Email:', email);
    console.log('Contact Number:', contactNumber);
    console.log('Birthday:', birthday);
    console.log('Password:', password);
    console.log('Confirm Password:', confirmPassword);
  };

  return (
    <div className="register">
      <style jsx>{`
        body {
          color: var(--white-color);
          background-color: #0B162B;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }

        input,
        button {
          border: none;
          outline: none;
          color: #fff;
        }

        img {
          max-width: 100%;
          height: auto;
        }

        .register {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          padding: 1rem;
        }

        .register__form {
          background-color: #0B162B;
          padding: 2.5rem 2rem;
          border-radius: 1rem;
          backdrop-filter: blur(10px);
          border: 2px solid #fff;
          max-width: 400px;
          width: 100%;
          color: #fff;
        }

        .register__title {
          text-align: center;
          font-size: var(--h1-font-size);
          font-weight: var(--font-medium);
          margin-bottom: 2rem;
        }

        .register__content {
          display: grid;
          row-gap: 1.5rem;
        }

=

        .register__icon {
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          font-size: 1.25rem;
          color: #fff;
        }

.register__box {
  display: flex;
  flex-direction: column;
  position: relative;
  border-bottom: 1px solid #fff; 
  padding-bottom: 0.5rem; 
  width: 80%;
  margin: 0 auto; /* Centers the box horizontally */
}


.register__input {
  width: 70%;
  padding: 1rem;
  background: none;
  border: none; 
  border-radius: 0.5rem;
  padding-left: 2rem;
  color: var(--white-color);
            transition: top 0.3s, font-size 0.3s;

}

        .register__label {
          position: absolute;
          left: 2rem;
          top: 50%;
          transform: translateY(-50%);
          font-weight: var(--font-medium);
          transition: top 0.3s, font-size 0.3s;
          color: var(--white-color);
        }

        .register__input:focus + .register__label,
        .register__input:not(:placeholder-shown) + .register__label {
          top: -0.5rem;
          font-size: var(--small-font-size);
        }

        .register__eye {
          position: absolute;
          right: 1rem;
          top: 50%;
          transform: translateY(-50%);
          cursor: pointer;
          font-size: 1.25rem;
        }

   .button-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%; /* Ensure full width for centering */
    margin-top: 1.5rem;
  }

  .cancel_button, .register__button {
    width: 80%; /* Width of the buttons */
    padding: 1rem;
    border-radius: 10rem;
    font-weight: var(--font-medium);
    cursor: pointer;
    text-align: center;
    transition: background-color 0.3s;
    margin-bottom: 1rem; 
    margin-left: 2rem;
  }

  .cancel_button {
    background-color: #0B162B;
    color: #fff;
    border: 1px solid #fff;
  }

  .register__button {
    background-color: #fff;
    color: #0B162B;
  }

        .register__login {
          text-align: center;
          margin-top: 2rem;
          font-size: var(--small-font-size);
        }

        .register__login a {
          color: var(--white-color);
          font-weight: var(--font-medium);
          text-decoration: none;
        }

        .register__login a:hover {
          text-decoration: underline;
        }
      `}</style>

      <form className="register__form" onSubmit={handleSubmit}>
      <img src={logo.src}/>
        <h1 className="register__title">Register</h1>

        <div className="register__content">
          <div className="register__box">
            <i className="ri-user-3-line register__icon"></i>
            <input
              type="text"
              required
              className="register__input"
              id="register-username"
              placeholder=" "
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor="register-username" className="register__label">Username</label>
          </div>

          <div className="register__box">
            <i className="ri-mail-line register__icon"></i>
            <input
              type="email"
              required
              className="register__input"
              id="register-email"
              placeholder=" "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="register-email" className="register__label">Email</label>
          </div>

          <div className="register__box">
            <i className="ri-phone-line register__icon"></i>
            <input
              type="tel"
              required
              className="register__input"
              id="register-contact"
              placeholder=" "
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
            />
            <label htmlFor="register-contact" className="register__label">Contact Number</label>
          </div>

          <div className="register__box">
            <i className="ri-calendar-line register__icon"></i>
            <input
              type="date"
              required
              className="register__input"
              id="register-birthday"
              placeholder=" "
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
            />
            <label htmlFor="register-birthday" className="register__label"></label>
          </div> 

          <div className="register__box">
            <i className="ri-lock-2-line register__icon"></i>
            <input
              type="password"
              required
              className="register__input"
              id="register-pass"
              placeholder=" "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="register-pass" className="register__label">Password</label>
            <i className="ri-eye-off-line register__eye" id="register-eye"></i>
          </div>

          <div className="register__box">
            <i className="ri-lock-2-line register__icon"></i>
            <input
              type="password"
              required
              className="register__input"
              id="confirm-pass"
              placeholder=" "
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <label htmlFor="confirm-pass" className="register__label">Confirm Password</label>
            <i className="ri-eye-off-line register__eye" id="confirm-eye"></i>
          </div><br/> 
        </div>

        <button href="/login" className="cancel_button">CANCEL</button>
        <button href="/dashboard" className="register__button">REGISTER</button>


        <p className="register__login">
          Already have an account? <a href="/Login">Login</a>
        </p>
      </form>
    </div>
  );
}

export default RegisterPage;
