import { useEffect, useRef, useState } from "react";


export function usePressedKeys(){

    const pressedKeys = useRef([])



    function appendKey(e){
        if (!pressedKeys.current.includes(e.key)){
            pressedKeys.current.push(e.key)
        }
    }

    function removeKey(e) {
        const index = pressedKeys.current.indexOf(e.key)

        if (index !== -1) {
            pressedKeys.current.splice(index, 1)
        }

    }

    useEffect(()=>{

        document.addEventListener("keydown", appendKey)
        document.addEventListener("keyup", removeKey)

        return ()=>{
            document.removeEventListener("keydown", appendKey)
            document.removeEventListener("keyup", removeKey)
        }

    },[])

    return pressedKeys

}