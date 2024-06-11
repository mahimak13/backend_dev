//const asyncHandler=()=>{}


const asyncHandler=(requestHandler)=>{
    return (req,res,next)=>{
        Promise.resolve(requestHandler(req,res))
    }
}


export {asyncHandler}













