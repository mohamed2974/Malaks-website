import React from "react";
import { LinearGradient } from "react-text-gradients";

export default function GradientTitel({text = '', className = ''}){
    return (
        <h1 className={`text-4xl font-bold ${className}`}>
            <LinearGradient gradient={["to right", "#3658B3,#5A7DEB,#4169E1"]}>
            {text}
            </LinearGradient>
        </h1>
    )
}