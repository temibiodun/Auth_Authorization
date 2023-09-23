"use strict";
const USER = require("./../models/users");
const API_RESPONSE = require("./../utils/api_response");
const SETTING = require("./../config/setting.json");
const jwt = require("jsonwebtoken");
const HTTP_CODES= require("./../utils/response_codes")


class Authentication {
    login(user){
        let{username, password} = user;
        let check = this.checkRequired({ username, password });
        if(check.length) {
            return API_RESPONSE(null,HTTP_CODES.BAD_REQUEST, check)
        }
        //check if user exist or not
        let userAccount = USER.find((user) => {
            return (user.username === username && user.password === password)
            });

        if(userAccount){
            let payload = {
                id: userAccount.id,
                firstName: userAccount.firstName,
                lastName: userAccount.lastName,
              }
              const accessToken = jwt.sign(payload, SETTING.SECRET, {
                algorithm: "HS256",
                expiresIn: SETTING.EXPIRE,
              });
              return API_RESPONSE({ token: accessToken }, HTTP_CODES.OK , null);
            
        }else {
            return API_RESPONSE(null,HTTP_CODES.BAD_REQUEST, ["login fail check your username or password"]);
        }

    }

    checkRequired(fields) {
        const errors = [];
        let keys = Object.keys(fields);
        keys.map((key) => {
          if (!fields[key]) errors.push(`${key} is required!`);
        });
        return errors;
        }
  

}


module.exports = new Authentication();