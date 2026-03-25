import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const useLocalStorage=(key,initialvalue)=>{

    const [value,setValue]=useState(()=>{

        const savedValue=localStorage.getItem(key);
        if(savedValue){
            return JSON.parse(savedValue);
        }
        else{
            return value;
        }
    });

    useEffect(()=>{
        localStorage.setItem(key,JSON.stringify(value));
    },[key,value]);

    return [value,setValue];
}

export default useLocalStorage;