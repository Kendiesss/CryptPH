import React, { useEffect, useState } from 'react';
import logo from '@/img/logo.png'; // Assuming you're using alias '@' for the src folder

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const showHiddenPass = (loginPass, loginEye) => {
      const input = document.getElementById(loginPass);
      const iconEye = document.getElementById(loginEye);

      iconEye.addEventListener('click', () => {
        // Change password to text
        if (input.type === 'password') {
          // Switch to text
          input.type = 'text';

          // Icon change
          iconEye.classList.add('ri-eye-line');
          iconEye.classList.remove('ri-eye-off-line');
        } else {
          // Change to password
          input.type = 'password';

          // Icon change
          iconEye.classList.remove('ri-eye-line');
          iconEye.classList.add('ri-eye-off-line');
        }
      });
    };

    showHiddenPass('login-pass', 'login-eye');
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Username:', username);
    console.log('Password:', password);
  };

  return (
    <div className="login">
      <style jsx>{`
        /*=============== GOOGLE FONTS ===============*/
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500&display=swap');
        
        /*=============== VARIABLES CSS ===============*/
        :root {
          --white-color: hsl(0, 0%, 100%);
          --black-color: hsl(0, 0%, 0%);
          --body-font: 'Poppins', sans-serif;
          --h1-font-size: 1.75rem;
          --normal-font-size: 1rem;
          --small-font-size: 0.813rem;
          --font-medium: 500;
        }

        /*=============== BASE ===============*/
        * {
          box-sizing: border-box;
          padding: 0;
          margin: 0;
          color: #fff;

          
        }

        body,
        input,
        button {
          font-size: var(--normal-font-size);
          font-family: var(--body-font);
                     color: #fff;


        }

        body {
          color: var(--white-color);
          background-color: #0B162B;
          
        }

        input,
        button {
          border: none;
          outline: none;
                    color: #fff;

        }

        a {
          text-decoration: none;
          color: #fff;
        }

        img {
          max-width: 100%;
          height: auto;
        }

        /*=============== LOGIN ===============*/
        .login {
          position: relative;
          height: 100vh;
          display: grid;
          align-items: center;
          
        }
        .login__img {
          position: absolute;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          
        }
        .login__form {
          position: relative;
          border: 2px solid var(--white-color);
          margin-inline: 1.5rem;
          padding: 2.5rem 1.5rem;
          border-radius: 1rem;
          backdrop-filter: blur(8px);
                    background-color: #0B162B;

        }
        .login__title {
          text-align: center;
          font-size: var(--h1-font-size);
          font-weight: var(--font-medium);
          margin-bottom: 2rem;
        }
        .login__content, .login__box {
          display: grid;
        }
        .login__content {
          row-gap: 1.75rem;
          margin-bottom: 1.5rem;
        }
        .login__box {
          grid-template-columns: max-content 1fr;
          align-items: center;
          column-gap: 0.75rem;
          border-bottom: 2px solid var(--white-color);
        }
        .login__icon, .login__eye {
          font-size: 1.25rem;
        }
        .login__input {
          width: 100%;
          padding-block: 0.8rem;
          background: none;
          color: var(--white-color);
          position: relative;
          z-index: 1;
        }
        .login__box-input {
          position: relative;
        }
        .login__label {
          position: absolute;
          left: 0;
          top: 13px;
          font-weight: var(--font-medium);
          transition: top 0.3s, font-size 0.3s;
        }
        .login__eye {
          position: absolute;
          right: 0;
          top: 18px;
          z-index: 10;
          cursor: pointer;
        }
        .login__box:nth-child(2) input {
          padding-right: 1.8rem;
        }
        .login__check, .login__check-group {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .login__check {
          margin-bottom: 1.5rem;
        }
        .login__check-label, .login__forgot, .login__register {
          font-size: var(--small-font-size);
        }
        .login__check-group {
          column-gap: 0.5rem;
        }
        .login__check-input {
          width: 16px;
          height: 16px;
        }
        .login__forgot {
          color: var(--white-color);
        }
        .login__forgot:hover {
          text-decoration: underline;
        }
        .login__button {
          width: 100%;
          padding: 1rem;
          border-radius: 0.5rem;
          background-color: var(--white-color);
          font-weight: var(--font-medium);
          cursor: pointer;
          margin-bottom: 2rem;
        }
        .login__register {
          text-align: center;
        }
        .login__register a {
          color: var(--white-color);
          font-weight: var(--font-medium);
        }
        .login__register a:hover {
          text-decoration: underline;
        }

        /* Input focus move up label */
        .login__input:focus + .login__label {
          top: -12px;
          font-size: var(--small-font-size);
        }

        /* Input focus sticky top label */
        .login__input:not(:placeholder-shown).login__input:not(:focus) + .login__label {
          top: -12px;
          font-size: var(--small-font-size);
        }

        /*=============== BREAKPOINTS ===============*/
        @media screen and (min-width: 576px) {
          .login {
            justify-content: center;
          }
          .login__form {
            width: 432px;
            padding: 4rem 3rem 3.5rem;
            border-radius: 1.5rem;
          }
          .login__title {
            font-size: 2rem;
          }
        }
      `}</style>
      <div className="login__img"></div>
      <form className="login__form" onSubmit={handleSubmit}>
        <h1 className="login__title">Login</h1>

        <div className="login__content">
          <div className="login__box">
            <i className="ri-user-3-line login__icon"></i>

            <div className="login__box-input">
              <input
                type="email"
                required
                className="login__input"
                id="login-email"
                placeholder=" "
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <label htmlFor="login-email" className="login__label">Email</label>
            </div>
          </div>

          <div className="login__box">
            <i className="ri-lock-2-line login__icon"></i>

            <div className="login__box-input">
              <input
                type="password"
                required
                className="login__input"
                id="login-pass"
                placeholder=" "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="login-pass" className="login__label">Password</label>
              <i className="ri-eye-off-line login__eye" id="login-eye"></i>
            </div>
          </div>
        </div>

        <div className="login__check">
          <a href="#" className="login__forgot">Forgot Password?</a>
        </div>

        <button type="submit" className="login__button">Login</button>

        <p className="login__register">
          Don't have an account? <a href="#">Register</a>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;
