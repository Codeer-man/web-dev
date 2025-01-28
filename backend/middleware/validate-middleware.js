

const validate = (schema) => async (req, res, next) => {
    try {
      // Parse the request body using the schema
      const parsedBody = await schema.parseAsync(req.body);
      req.body = parsedBody;
      return next();
    } catch (err) {
      const status = 422; // Unprocessable Entity
      const message = "Validation failed. Please fill in the input properly.";
      const extraDetails = err.issues.map((curElem) => curElem.message);
  
      // Return a structured error response to the client
      return res.status(status).json({
        status,
        message,
        extraDetails,
      });
    }
  };
  
 export default  validate;