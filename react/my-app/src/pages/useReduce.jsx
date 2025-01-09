import  { useReducer } from 'react';

const initialState = {
  name: '',
  email: '',
  emailValid: true,
  nameValid: true,
  error: '',
  isSubmitted: false,
};

const formReducer = (state, action) => {
  switch (action.type) {
    case 'SET_FIELD':
      return {
        ...state,
        [action.field]: action.value,
        error: '', // Reset error when user updates a field
      };

    case 'VALIDATE_NAME':
      return {
        ...state,
        nameValid: state.name.trim() !== '',
        error: state.name.trim() === '' ? 'Name cannot be empty.' : '',
      };

    case 'VALIDATE_EMAIL':
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      return {
        ...state,
        emailValid: emailRegex.test(state.email),
        error: !emailRegex.test(state.email) ? 'Invalid email format.' : '',
      };

    case 'SUBMIT_FORM':
      if (!state.name || !state.email || !state.nameValid || !state.emailValid) {
        return {
          ...state,
          error: 'Please fill out the form correctly.',
        };
      }
      return {
        ...state,
        isSubmitted: true,
        error: '', // Clear error on successful form submission
      };

    case 'RESET':
      return initialState;

    default:
      return state;
  }
};

function FormApp() {
  // Use useReducer hook with the reducer and initial state
  const [state, dispatch] = useReducer(formReducer, initialState);

  // Handle input change for the name and email
  const handleChange = (e) => {
    dispatch({ type: 'SET_FIELD', field: e.target.name, value: e.target.value });
  };

  // Handle name validation
  const handleNameBlur = () => {
    dispatch({ type: 'VALIDATE_NAME' });
  };

  // Handle email validation
  const handleEmailBlur = () => {
    dispatch({ type: 'VALIDATE_EMAIL' });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: 'SUBMIT_FORM' });
  };

  // Reset the form
  const handleReset = () => {
    dispatch({ type: 'RESET' });
  };

  return (
    <div style={styles.container}>
      <h1>Form with Validation</h1>

      {/* Error Message */}
      {state.error && <p style={styles.error}>{state.error}</p>}

      {/* Form */}
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputContainer}>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={state.name}
            onChange={handleChange}
            onBlur={handleNameBlur}
            style={styles.input}
          />
          {!state.nameValid && <span style={styles.errorText}>Name cannot be empty.</span>}
        </div>

        <div style={styles.inputContainer}>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={state.email}
            onChange={handleChange}
            onBlur={handleEmailBlur}
            style={styles.input}
          />
          {!state.emailValid && <span style={styles.errorText}>Invalid email format.</span>}
        </div>

        <div style={styles.buttons}>
          <button type="submit" style={styles.submitButton}>Submit</button>
          <button type="button" onClick={handleReset} style={styles.resetButton}>Reset</button>
        </div>
      </form>

      {/* Success Message */}
      {state.isSubmitted && !state.error && <p style={styles.success}>Form submitted successfully!</p>}
    </div>
  );
}

const styles = {
  container: {
    width: '300px',
    margin: '0 auto',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  inputContainer: {
    marginBottom: '10px',
  },
  input: {
    width: '100%',
    padding: '8px',
    fontSize: '14px',
    marginTop: '5px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  resetButton: {
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontSize: '12px',
  },
  success: {
    color: 'green',
    fontWeight: 'bold',
    textAlign: 'center',
  },
};

export default FormApp;
