import React, { createContext, useContext, useState } from 'react';

const GlobalDataContext = createContext();

export const useGlobalData = () => useContext(GlobalDataContext);

export const GlobalDataProvider = ({ children }) => {
    const [globalData, setGlobalData] = useState(null);

    return <GlobalDataContext.Provider value={{ globalData, setGlobalData }}>{children}</GlobalDataContext.Provider>;
};
