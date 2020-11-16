import React, {useState, useEffect} from 'react';
import {ProfileContext} from "./profileContext";

export const ProfileState = ({children}) => {
    const [flip, setFlip] = useState(false);
    const [edit, setEdit] = useState(false);
    const [state, setState] = useState({});
    const [fields, setFields] = useState({
        email: '',
        name: '',
        surname: '',
        country: '',
        city: '',
        institution: '',
        description: ''
    });

    useEffect(() => {
        setFields({
            ...state
        })
    }, [state])

    const isChange = () => {
        Object.keys(fields).map((key) => {
            if(!(state[key] == fields[key])){
                return true;
            }
        })
        return false;
    }

    return (
        <ProfileContext.Provider value={{
            flip, setFlip, edit, setEdit,
            profileState: state, setProfileState: setState,
            fields, setFields, isChange
        }}>
            {children}
        </ProfileContext.Provider>
    )
}