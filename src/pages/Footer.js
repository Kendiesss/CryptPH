import React, { useEffect } from 'react';
import logo from '@/img/logo.png';

export default function Footer() {
  useEffect(() => {
    const footer = document.createElement('footer'); // Changed from header to footer
    footer.innerHTML = `
      <div class="line"></div>
      <div class="container">
        <div class="logo">
          <img src="${logo.src}" alt="Logo" />
          <div class="text">
            <h2>Your one-stop platform for mastering cryptocurrency trading with <b>cryptocurrency</b> data, <b>educational</b> content, and <b>accessible</b> tools.</h2>
            <p>&copy; 2024 CryptPH. All Rights Reserved.</p>
          </div>
        </div>
        <nav>
          <ul>
            <li><a href="/">Dashboard</a></li>
            <li><a href="/charts">Charts</a></li>
            <li><a href="/news">News</a></li>
            <li><a href="/learn">Learn</a></li>
            <li><a href="/virtual-trading">Virtual Trading</a></li>
          </ul>
        </nav>
      </div>
    `;

    document.body.appendChild(footer);

    const style = document.createElement('style');
    style.textContent = `
      body {
        font-family: Sora, sans-serif;
        margin: 0;
        background-color: #0B162B;
        color: #fff;
      }

      footer {
        background-color: #0B162B;
        padding: 20px 0;
        padding-left: 80px;
        width: 100%; /* Ensure footer takes full width */
      }

      .line {
        background-color: #fff;
        width: 100%;
        height: 1px;
        margin-bottom: 20px;
      }

      .container {
        max-width: 1200px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .logo img {
        width: 150px;
      }

      nav ul {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: column;
        padding-right: 200px;
      }

      nav li {
        margin-bottom: 20px;
      }

      nav a {
        color: #fff;
        text-decoration: none;
        font-size: 1rem;
      }

      .text {
        padding: 20px 0;
        font-size: 12px;
      }

      .text h2 {
        font-size: 2em;
        margin-bottom: 20px;
      }

      .text p {
        color: #4A4A5A;
        font-size: 14px;
      }

      /* Responsive styles */
      @media (max-width: 1024px) {
        .container {
          padding: 0 20px;
          flex-direction: column;
          align-items: center;
        }

        .logo img {
          width: 120px;
        }

        nav ul {
          padding-right: 0;
        }

        nav ul {
          flex-direction: row;
          justify-content: center;
        }

        nav li {
          margin: 0 10px;
        }

        .text h2 {
          font-size: 1.5em;
          text-align: center;
        }

        .text p {
          text-align: center;
        }
      }

      @media (max-width: 768px) {
        footer {
          padding-left: 0; /* Remove left padding on smaller screens */
        }

        .container {
          flex-direction: column;
          text-align: center;
        }

        .logo {
          margin-bottom: 20px;
        }

        .logo img {
          width: 100px;
        }

        .text h2 {
          font-size: 1.2em;
        }

        .text p {
          font-size: 0.9em;
        }

        nav ul {
          flex-direction: column;
          padding-right: 0;
        }

        nav li {
          margin: 10px 0;
        }

        nav a {
          font-size: 1rem;
        }
      }

      @media (max-width: 480px) {
        footer {
          padding-left: 0; /* Remove left padding on very small screens */
        }

        .logo img {
          width: 80px;
        }

        .text h2 {
          font-size: 1rem;
        }

        .text p {
          font-size: 0.8rem;
        }

        nav a {
          font-size: 0.9rem;
        }

        /* Make the footer take full width on mobile */
        .container {
          width: 100%; /* Full width on mobile */
          padding: 0 10px; /* Optional padding for mobile */
        }
      }
    `;

    document.head.appendChild(style);

    return () => {
      document.body.removeChild(footer);
      document.head.removeChild(style);
    };
  }, []);

  return null;
}
