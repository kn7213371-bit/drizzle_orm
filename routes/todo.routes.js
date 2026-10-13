import express from "express";
import { created, deleted, getAll, toggoDone, update } from "../db/queries/todo.query.js";
import { getById } from "../db/queries/todo.query.js";
import { validateBody } from "../middleware/validationBody.js";
import { todoInsert, todoUpdate } from "../schema/todo.schema.js";

export const todoRouter=express.Router();



todoRouter.get("/",async (req,res)=>{
    const todos=await getAll();

    return res.status(200).json({
        message:"success",
        data:todos
    });
})

todoRouter.get("/:id",async (req,res)=>{
    const id= req.params.id
    const todo=await getById(id);
    if(!todo){
        return res.status(404).json({
            error:"todo not found"
        })
    }
    return res.status(200).json({
        message:"success",
        data:todo
    });
});


todoRouter.post("/",validateBody(todoInsert),async(req,res)=>{
    const data=await created(req.body);


    return res.status(200).json({
        message:"Todos Created Successfull",
        data:data
    });

});


todoRouter.patch("/:id",validateBody(todoUpdate),async (req,res)=>{
    const id = req.params.id;

    const todo=await getById(id);

    if(!todo){
        return res.status(404).json({
            message:"Todo Not Found"
        });
    }
    
    const data=await update(id,req.body);

    return res.status(200).json({
        message:"Todo Update Successfull",
        data : data
    })
});
todoRouter.patch("/:id/toggo",validateBody(todoUpdate.optional()),async(req,res)=>{
    const id = req.params.id;

    const todo=await getById(id);

    if(!todo){
        return res.status(404).json({
            message:"Todo Not Found"
        });
    }

    const data=await toggoDone(id);

    return res.status(200).json({
        message:"Toggo Update Successfull",
        data:data
    })
});


todoRouter.delete("/:id",async(req,res)=>{
        const id = req.params.id;

    const todo=await getById(id);

    if(!todo){
        return res.status(404).json({
            message:"Todo Not Found"
        });
    }

    const data =await deleted(id);

    return res.status(200).json({
        message:"Todo Deleted Successfull",
        data:data
    })
})





