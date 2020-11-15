import React, { useState } from 'react';

import { LessonContext } from "./lessonContext";

export const LessonState = ({children}) => {
    const [state, setState] = useState({});

    return(
        <LessonContext.Provider value{{

        }}>
            {children}
        </LessonContext.Provider>
    )
}
