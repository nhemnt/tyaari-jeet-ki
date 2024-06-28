import React, { useState } from 'react'
import useDebounce from '../../hooks/useDebounce';

const DebouncedHook = () => {
    const [value, setValue] = useState("");
    const debouncedValue = useDebounce(value, 1000);
    return (
        <div>
            <input value={value} onChange={(e) => setValue(e.target.value)} />
            <p>{debouncedValue}</p>
        </div>
    )
}

export default DebouncedHook