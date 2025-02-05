import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);  // Scrollt an den Anfang der Seite
    }, [location]);

    return null; // Diese Komponente rendert nichts
};

export default ScrollToTop;
