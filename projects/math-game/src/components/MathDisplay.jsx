import { useEffect } from "react";

let ans

function MathGenerator(){
    let num1 = Math.floor(Math.random() * 9) + 1;
    let num2 = Math.floor(Math.random() * 9) + 1;

    ans = Math.random() > 0.5? true : false; // determines weather the display answer will be true or false
    let ofset = Math.random() > 0.5? 1 : -1;
    let displayAns
    if (ans) {
       displayAns = num1 + num2
    }
    else{
        displayAns = num1 + num2 + ofset
    }
    let displayMath = `${num1} + ${num2} = ${displayAns}?`
    return displayMath
}

export default function MathDisplay(props){
    let displayMath = MathGenerator()
    useEffect(() => {
        props.setRightAns(ans)
    })
    
    return(
        <div className="h-28 w-full sm:text-8xl text-6xl flex justify-center text-center mt-4">
            <h1>{displayMath}</h1>
        </div>
    )
}