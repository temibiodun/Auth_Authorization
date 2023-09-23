"use strict";
const usercontroller = require("./../controllers/authentication")
const authRoutes= (app)=>{
    app.post("/api/v1/login", (req,res,next)=>{
        let {username,password}=req.body;
        let auth = usercontroller.login({username,password});
        let{response,code} = auth;
        return res.status(code).json(response);

    });  
}
module.exports = authRoutes;