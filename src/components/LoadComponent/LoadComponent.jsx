import React from "react";
import Loader from "react-js-loader";

export const LoadComponent = ({ type, bgColor, title, size}) => {
    return (
        <Loader type={type} bgColor={bgColor} title={title} size={size} />
    )
}