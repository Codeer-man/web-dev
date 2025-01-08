import { useState, useEffect } from "react";

const Contact = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [displayMessage, setDisplayMessage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // styling

  const addStyles = () => {
    const style = document.createElement("style");
    style.innerHTML = `
      .contact-page {
        font-family: 'Arial', sans-serif;
        padding: 20px;
        max-width: 600px;
        margin: 0 auto;
        background-color: #f4f4f9;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      }

      h1 {
        text-align: center;
        color: #333;
        font-size: 2rem;
      }

      .contact-form {
        display: flex;
        flex-direction: column;
      }

      .form-group {
        margin-bottom: 15px;
      }

      label {
        font-size: 1rem;
        color: #555;
      }

      input, textarea {
        padding: 10px;
        font-size: 1rem;
        border: 1px solid #ddd;
        border-radius: 4px;
        width: 100%;
      }

      textarea {
        height: 150px;
        resize: vertical;
      }

      .submit-btn {
        background-color: #4CAF50;
        color: white;
        padding: 10px 15px;
        font-size: 1rem;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.3s ease;
      }

      .submit-btn:hover {
        background-color: #45a049;
      }

      .message-display {
        margin-top: 30px;
        padding: 20px;
        background-color: #e0f7fa;
        border-radius: 6px;
        border: 1px solid #b2ebf2;
      }

      .message-display h3 {
        font-size: 1.5rem;
        color: #00796b;
      }

      .message-display p {
        font-size: 1rem;
        color: #555;
      }

      .delete-btn {
        background-color: #f44336;
        color: white;
        padding: 10px 15px;
        font-size: 1rem;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.3s ease;
      }

      .delete-btn:hover {
        background-color: #e53935;
      }

      .error {
        color: red;
        font-size: 1rem;
      }

      .success {
        color: green;
        font-size: 1rem;
      }
    `;
    document.head.appendChild(style);
  };

  useEffect(() => {
    addStyles();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    //checking name
    if (name == "" || message === "") {
      setError("field required");
      setSuccess("");
    } else {
      setError("");
      setDisplayMessage({ name, message });
      setSuccess("message submitted success fully");
    }
  };
  const handleDelete = () => {
    if (window.confirm("are you sure want to delete  message")) {
      setDisplayMessage("");
      setName("");
      setMessage("");
      setError("");
      setSuccess("message deleted success fully");
    }
  };

  return (
    <div className="contact-page">
      <h1>Contact page</h1>
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (e.target.value !== "") {
                setError("");
              }
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <input
            type="text"
            id="message"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              if (e.target.value !== "") {
                setError("");
              }
            }}
          />
        </div>
        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>

      {/* show error message */}
      {error && <p className="error">{error}</p>}
      {/* success message */}
      {success && <p className="success">{success}</p>}

      {displayMessage && (
        <div className="message-display">
          <h3>your message:</h3>
          <p>
            <strong>Name:</strong>
            {displayMessage.name}
          </p>
          <p>
            <strong>Message:</strong>
            {displayMessage.message}
          </p>
          <button onClick={handleDelete} className="delete-btn">
            Delete{" "}
          </button>
        </div>
      )}
    </div>
  );
};

export default Contact;
