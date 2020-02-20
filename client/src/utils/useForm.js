import React, { useState } from 'react';

export const useForm = (initialValue = {}, submitCallback) => {
    const [values, setValues] = useState(initialValue);

    const handleChanges = e => {
        setValues({ ...values, [e.target.name]: e.target.value });
    }

    const handleSubmit = e => {
        e.preventDefault();
        submitCallback();
    }

    return [values, handleChanges, handleSubmit];
}
