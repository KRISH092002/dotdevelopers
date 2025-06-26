import { useState } from 'react';

export default function useCustomForm(initialState = {}) {
    const [data, setData] = useState(initialState);
    const [errors, updateErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [hasErrors, setHasError] = useState(false);
    const handleChange = (name, value, e = null) => {
        setData((prev) => {
            return ({ ...prev, [name]: value })
        }
        );
        if (value != '') {
            deleteError(name)
        }else if(value == ''){
            setErrors(name , 'The field is Required')
        }
        if (e) {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (e.target.type == 'email') {
                if (!regex.test(value)) {
                    setHasError(true)
                    setErrors(name, 'Enter Valid Email')
                }

            } else if (e.target.type == 'password') {
                if (value && value.length < 8) {
                    setHasError(true)
                    setErrors(name, 'The password must be at least 8 characters.')
                }
            }
        }
    };
    const setErrors = (key, value) => {
        if(typeof key == 'object'){
            updateErrors(prev => ({ ...prev, ...key }))
        }else{
            updateErrors(prev =>({ ...prev, [key]: value }))

        }

    }

    const deleteError = (key) => {
        updateErrors(prev => {
            const updated = { ...prev };
            delete updated[key]; // or delete updated.category;
            if (Object.keys(updated).length === 0) {
                setHasError(false)
            }            
            return updated;
        });
    }
    const reset = () => {
        setData(initialState);
        updateErrors({});
        setHasError(false);
    };


    return {
        data, setData, handleChange, errors, setErrors, setLoading, loading, reset, hasErrors, setHasError
    };
}
















