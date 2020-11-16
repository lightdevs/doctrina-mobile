import React, { useContext } from 'react';
import { useLazyQuery, useMutation } from "@apollo/client";

import { QueryContext } from "./queryContext";
import { AuthContext } from "../auth/authContext";
import {
    REGISTER,
    LOGIN,
    GET_ALL_COURSES,
    GET_COURSE,
    GET_TEACHER,
    UPDATE_PROFILE,
    GET_COURSE_LESSONS,
    GET_COURSE_MATERIALS, UPDATE_AVATAR
} from "./query"

import { setCash } from "../../../util";
import { USER_ID } from "../../../cashItems";
import { ListCourseContext } from "../data/listCourse/listCourseContext";
import { CourseContext } from "../data/course/courseContext";
import { ProfileContext } from "../data/profile/profileContext";

export const QueryProvider = ({children}) => {
    const { signIn } = useContext(AuthContext);
    const { addCourses } = useContext(ListCourseContext);
    const { setCourse, setTeacher, setCourseLessons, setCourseMaterials } = useContext(CourseContext);
    const { setProfileState } = useContext(ProfileContext);

    const [register] = useMutation(REGISTER, {
        onCompleted: async (data) => {
            if(data.register){
                await setCash(USER_ID, data.register._id)
                setProfileState(data.register);
                signIn(data.register.token)
                    .catch((e) => {
                        return e;
                    });
            }
        }
    });

    const [login] = useMutation(LOGIN, {
        onCompleted: async (data) => {
            if(data.login){
                await setCash(USER_ID, data.login._id);
                setProfileState(data.login);
                signIn(data.login.token);
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
            getCourseMaterials({variables: {id: data.courseById.course._id}});
            getCourseLessons({variables: {id: data.courseById.course._id}})
        }
    })

    const [getTeacherCourse] = useLazyQuery(GET_TEACHER, {
        onCompleted: (data) => {
            setTeacher(data.personById.person);
        }
    })

    const [updatePerson] = useMutation(UPDATE_PROFILE, {
        onCompleted: (data) => {
            setProfileState(data.updatePerson);
        }
    })

    const [getCourseLessons] = useLazyQuery(GET_COURSE_LESSONS, {
        onCompleted: (data) => {
            setCourseLessons(data.lessonsByCourse);
        }
    })

    const [getCourseMaterials] = useLazyQuery(GET_COURSE_MATERIALS, {
        onCompleted: (data) => {
            setCourseMaterials(data.filesByCourse);
        }
    })

    const [updateAvatar] = useMutation(UPDATE_AVATAR)

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

    const updatePersonMutation = async ({variables}) => {
        await updatePerson({variables: variables});
    }

    const getCourseLessonsQuery = async ({variables}) => {
        await getCourseLessons({variables: variables});
    }

    const getCourseMaterialsQuery = async ({variables}) => {
        await getCourseMaterials({variables: variables});
    }

    const updateAvatarMutation = async ({variables}) => {
        await updateAvatar({variables: variables});
    }

    return (
        <QueryContext.Provider value={{
            login: loginMutation,
            register: registerMutation,
            getAllCourses: getAllCoursesQuery,
            getCourse: getCourseQuery,
            updatePerson: updatePersonMutation,
            getCourseLessons: getCourseLessonsQuery,
            getCourseMaterials: getCourseMaterialsQuery,
            updateAvatar: updateAvatarMutation
        }}>
            {children}
        </QueryContext.Provider>
    )
}