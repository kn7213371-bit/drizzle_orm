import z from "zod"

export function validateBody(schema){
    return (req,res,next)=>{
    const body = req.body
    const result = schema.safeParse(body);

    if(!result.success){
        return res.status(402).json({
         error:z.treeifyError(result.error).properties
        })
    }
    req.body=result.data
    next()
}
}