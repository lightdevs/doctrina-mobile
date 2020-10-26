import React, { useState } from 'react';

import { DataContext } from "./dataContext";

export const DataState = ({children}) => {
    const [data, setData] = useState(null);

    return(
        <DataContext.Provider value={{
            data,
            setData
        }}>
            {children}
        </DataContext.Provider>
    )
}