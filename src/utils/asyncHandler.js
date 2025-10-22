const asyncHandler = (requestHanndler) =>{
    (req, res, next) => {
        Promise.resolve(requestHanndler(req, res, next)).
        catch((err)=> next(err));
    }
}
export {asyncHandler};



/*
//by try catch
const asyncHandler = (fn) => async(req, res, next) => {
    try{
        await fn(req, res, next);
    }
    catch(error){
        res.status(error?.status || 500).json({
            success: false,
            message: error?.message || "Internal Server Error",
        });
    }
}

*/