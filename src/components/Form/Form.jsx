import React from "react";
import "../../styles/Form.scss";

export const Form = ({ children }) => {
    return (
        <form action="submit" className="form">
            {children}
        </form>
    );
};
