import { event } from 'jquery';
import { useState } from 'react';

export default function useCustomForm(initialState = {}) {
    const [data, setData] = useState(initialState);
    const [errors, updateErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [hasErrors, setHasError] = useState(false);
    const handleChange = (name, value) => {
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
            if (Object.keys(updated).length === 1) {
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
















