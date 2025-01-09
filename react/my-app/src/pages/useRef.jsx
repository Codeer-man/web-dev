import { useRef, useState } from "react";

const Form = () => {
  const nameRef = useRef("");
  const emailRef = useRef("");
  const messageRef = useRef("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      message: messageRef.current.value,
    };

    // Show submitted data
    setSubmitted(true);

    // Clear form fields
    nameRef.current.value = "";
    emailRef.current.value = "";
    messageRef.current.value = "";
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label className="label">Name</label>
          <input type="text" ref={nameRef} className="input" required />
        </div>

        <div className="form-group">
          <label className="label">Email</label>
          <input type="email" ref={emailRef} className="input" required />
        </div>

        <div className="form-group">
          <label className="label">Message</label>
          <textarea ref={messageRef} className="textarea" rows="4" required />
        </div>

        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>

      {submitted && (
        <div className="success-message">
          <p>Form submitted successfully!</p>
        </div>
      )}

      {/* External CSS in the same file */}
      <style jsx>{`
        /* General container styling */
        .form-container {
          max-width: 400px;
          margin: 50px auto;
          padding: 20px;
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        /* Form and input field styling */
        .form {
          display: flex;
          flex-direction: column;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .label {
          display: block;
          font-size: 14px;
          font-weight: bold;
          color: #555;
          margin-bottom: 8px;
        }

        .input,
        .textarea {
          width: 100%;
          padding: 10px;
          font-size: 14px;
          border: 1px solid #ccc;
          border-radius: 4px;
          box-sizing: border-box;
          transition: border-color 0.3s ease;
        }

        .input:focus,
        .textarea:focus {
          border-color: #4caf50;
          outline: none;
        }

        .submit-btn {
          padding: 12px 20px;
          background-color: #4caf50;
          color: white;
          border: none;
          border-radius: 4px;
          font-size: 16px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .submit-btn:hover {
          background-color: #45a049;
        }

        /* Success message styling */
        .success-message {
          margin-top: 20px;
          padding: 10px;
          background-color: #e8f5e9;
          border: 1px solid #4caf50;
          border-radius: 4px;
          color: #4caf50;
        }
      `}</style>
    </div>
  );
};

export default Form;
