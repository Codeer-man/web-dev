const errorMiddleware = (req,res,next,error)=>{
    const status = err.status || 500;
    const message = err.message || "Backend Error"
    const extraDefault = err.extraDefault || "Error from Backend"


    console.error(
        
        `[${req.method}]&{req.path} >> StatusCode:: &{status},Mesage:: ${extraDefault})`
    )
        return res.status(state).json({message,extraDefault})
};

export default errorMiddleware;