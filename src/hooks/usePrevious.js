import { useEffect, useRef } from 'react'

const UsePrevious = (value) => {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
}

export default UsePrevious