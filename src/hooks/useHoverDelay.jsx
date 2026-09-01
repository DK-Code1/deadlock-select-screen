import { useRef } from "react";

export function useHoverDelay(callback, delay = 300) {
    const timeoutRef = useRef(null);
    const hoveredRef = useRef(null);

    const onEnter = (value) => {
        hoveredRef.current = value;

        clearTimeout(timeoutRef.current);

        timeoutRef.current = setTimeout(() => {
            if (hoveredRef.current === value) {
                callback(value);
            }
        }, delay);
    };

    const onLeave = (value) => {
        if (hoveredRef.current === value) {
            hoveredRef.current = null;
        }

        clearTimeout(timeoutRef.current);
    };

    return { onEnter, onLeave };
}