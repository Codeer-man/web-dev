import React from "react";
import { useAuth } from "../store/auth";

export default function Services() {
  const { Services } = useAuth();

  return (
    <>
      <style jsx>{`
        .section-services {
          padding: 4rem 2rem;
          background-color: #f9f9f9;
        }
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
        }
        .main-heading {
          text-align: center;
          font-size: 2.5rem;
          color: #333;
          margin-bottom: 2rem;
        }
        .grid {
          display: grid;
          gap: 1.5rem;
        }
        .grid-three-cols {
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        }
        .grid-two-cols {
          grid-template-columns: 1fr 1fr;
        }
        .card {
          background: #fff;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .card:hover {
          transform: translateY(-10px);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
        }
        .card-img img {
          width: 100%;
          height: 200px;
          object-fit: cover;
        }
        .card-details {
          padding: 1.5rem;
        }
        .card-details h2 {
          font-size: 1.5rem;
          color: #333;
          margin-bottom: 0.5rem;
        }
        .card-details p {
          font-size: 1rem;
          color: #666;
          margin-bottom: 0.5rem;
        }
        .card-details .grid-two-cols p {
          font-weight: bold;
          color: #333;
        }
        .login-button,
        .register-button {
          display: inline-block;
          padding: 0.75rem 1.5rem;
          font-size: 1rem;
          color: #fff;
          background-color: #007bff;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        .login-button:hover,
        .register-button:hover {
          background-color: #0056b3;
        }
        @media (max-width: 768px) {
          .grid-three-cols {
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          }
          .main-heading {
            font-size: 2rem;
          }
          .card-details h2 {
            font-size: 1.25rem;
          }
          .card-details p {
            font-size: 0.9rem;
          }
        }
        @media (max-width: 480px) {
          .section-services {
            padding: 2rem 1rem;
          }
          .main-heading {
            font-size: 1.75rem;
          }
          .card-details h2 {
            font-size: 1rem;
          }
          .card-details p {
            font-size: 0.8rem;
          }
          .login-button,
          .register-button {
            padding: 0.5rem 1rem;
            font-size: 0.9rem;
          }
        }
      `}</style>

      <section className="section-services">
        <div className="container">
          <h1 className="main-heading">Our Services</h1>
          <div className="container grid grid-three-cols">
            {Services?.length > 0 ? (
              Services.map((curElem, index) => (
                <div className="card" key={index}>
                  <div className="card-img">
                    <img
                      src="https://cdn.pixabay.com/photo/2023/07/24/01/31/plane-8145957_640.jpg"
                      alt="design"
                      width="200"
                    />
                  </div>
                  <div className="card-details">
                    <div className="grid grid-two-cols">
                      <p>{curElem.provider}</p>
                      <p>{curElem.price}</p>
                    </div>
                    <h2>{curElem.service}</h2>
                    <p>{curElem.description}</p>
                  </div>
                </div>
              ))
            ) : (
              <div>
                <h1>No services found</h1>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
