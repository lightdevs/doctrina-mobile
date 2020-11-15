import React, {useState} from 'react';
import {ProfileContext} from "./profileContext";

export const ProfileState = ({children}) => {
    const [flip, setFlip] = useState(false);
    const [edit, setEdit] = useState(false);

    return (
        <ProfileContext.Provider value={{
            flip, setFlip, edit, setEdit
        }}>
            {children}
        </ProfileContext.Provider>
    )
}