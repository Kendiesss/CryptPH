import React, { useEffect } from 'react';
import logo from '@/img/logo.png';

export default function Footer() {
  useEffect(() => {
    // This code will only run on the client side
    const header = document.createElement('header');
    header.innerHTML = `
    <div class="line"><p>c</p></div></br>
      <div class="container">
        <div class="logo">
          <img src="${logo.src}" alt="Logo" />
                  <div class="text">
          <h2>"your one-stop platform for mastering cryptocurrency trading with <b>cryptocurrency</b> data, <b>educational</b> content, and <b>accessible</b> tools."</h2>
          <h2></h2>
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

    document.body.appendChild(header);


    const style = document.createElement('style');
    style.textContent = `

body {
          font-family: Sora, sans-serif;
          margin: 0;
          background-color: #0B162B;
          color: #fff;
          
        }
      
        header {
          background-color: #0B162B;
          padding: 20px 0;
          padding-left: 80px;
        }
        
         .line{
          background-color: #fff;
          font-size: 1px;

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
          flex-direction: column; /* Make the nav vertical */
          padding-right: 200px;
        }
      
        nav li {
          margin-bottom: 20px; /* Add space between nav items */
        }
      
        nav a {
          color: #fff;
          text-decoration: none;
        }
      
        .content {
          padding: 40px 0;
        }
      
        .text {
          padding: 20px 0;
          font-size: 8px;
          
        }
      
        .text h2 {
          font-size: 2em;
          margin-bottom: 20px;
          padding-right: 500px;
        }

        .text p {
                  color: #4A4A5A;
                  font-size: 14px;
                  font: Inter;

        }
  `;
  

    document.head.appendChild(style);

    // Clean up when the component unmounts
    return () => {
      document.body.removeChild(header);
      document.head.removeChild(style);
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  return null;
}
