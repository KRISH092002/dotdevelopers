import { useState } from 'react';

export default function useCustomForm(initialState = {}) {
    const [data, setData] = useState(initialState);
    const [errors, updateErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [hasErrors, setHasError] = useState(false);
    const handleChange = (name, value, e = null) => {
        if (e) {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (e.target.type == 'email') {
                if (!regex.test(value)) {
                    setHasError(true)
                    return setErrors(name, 'Enter Valid Email')
                }

            } else if (e.target.type == 'password') {
                if (value && value.length < 8) {
                    setHasError(true)
                    return setErrors(name, 'The password must be at least 8 characters.')
                }
            }
        }
        setData((prev) => {
            if (value != '') {
                deleteError(name)
            }
            return ({ ...prev, [name]: value })
        }
        );
    };
    const setErrors = (key, value) => {
        updateErrors(prev => ({ ...prev, [key]: value }))

    }

    const deleteError = (key) => {
        updateErrors(prev => {
            const updated = { ...prev };
            delete updated[key]; // or delete updated.category;
            if (Object.keys(updated).length === 1 || Object.keys(updated).length === 0) {
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
















