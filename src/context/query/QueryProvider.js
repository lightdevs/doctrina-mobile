import React, { useContext } from 'react';
import { useLazyQuery, useMutation } from "@apollo/client";

import { QueryContext } from "./queryContext";
import { AuthContext } from "../auth/authContext";
import {REGISTER, LOGIN, GET_ALL_COURSES, GET_COURSE, GET_TEACHER} from "./query"

import {setCash} from "../../../util";
import {USER_ID} from "../../../cashItems";
import {ListCourseContext} from "../data/listCourse/listCourseContext";
import {CourseContext} from "../data/course/courseContext";

export const QueryProvider = ({children}) => {
    const { signIn } = useContext(AuthContext);
    const { addCourses } = useContext(ListCourseContext);
    const { setCourse, setTeacher } = useContext(CourseContext);

    const [register] = useMutation(REGISTER, {
        onCompleted: ((data) => {
            if(data.register){
                Promise.all(
                    [
                        setCash(USER_ID, data.register._id)
                    ]
                )
                    .catch();

                signIn(data.register.token)
                    .catch((e) => {
                        return e;
                    });
            }
        })
    });

    const [login] = useMutation(LOGIN, {
        onCompleted: async (data) => {
            if(data.login){
                await setCash(USER_ID, data.login._id),
                signIn(data.login.token)
            }
        }
    });

    const [getAllCourses] = useLazyQuery(GET_ALL_COURSES, {
        onCompleted: (data) => {
            addCourses(data.personById.courses, data.personById.isEnd);
        }
    });

    const [getCourse] = useLazyQuery(GET_COURSE, {
        onCompleted: (data) => {
            setCourse(data.courseById.course);
            getTeacherCourse({variables: {id: data.courseById.course.teacher}});
        }
    })

    const [getTeacherCourse] = useLazyQuery(GET_TEACHER, {
        onCompleted: (data) => {
            setTeacher(data.personById.person);
        }
    })

    const registerMutation = async ({variables}) => {
        await register({variables: variables});
    }

    const loginMutation = async ({variables}) => {
        await login({variables: variables});
    }

    const getAllCoursesQuery = async ({variables}) => {
        await getAllCourses({variables: variables});
    }

    const getCourseQuery = async ({variables}) => {
        await getCourse({variables: variables});
    }

    return (
        <QueryContext.Provider value={{
            login: loginMutation,
            register: registerMutation,
            getAllCourses: getAllCoursesQuery,
            getCourse: getCourseQuery
        }}>
            {children}
        </QueryContext.Provider>
    )
}