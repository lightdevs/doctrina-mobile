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
    GET_COURSE_MATERIALS,
    UPDATE_AVATAR,
    GET_COURSE_LINKS, GET_LESSON, GET_LESSON_LINKS
} from "./query"

import { setCash } from "../../../util";
import { USER_ID } from "../../../cashItems";
import { ListCourseContext } from "../data/listCourse/listCourseContext";
import { CourseContext } from "../data/course/courseContext";
import { ProfileContext } from "../data/profile/profileContext";
import { LessonContext } from "../data/lesson/lessonContext";

export const QueryProvider = ({children}) => {
    const { signIn } = useContext(AuthContext);
    const { addCourses } = useContext(ListCourseContext);
    const {
        setCourse,
        setTeacher,
        setCourseLessons,
        setCourseMaterials,
        setCourseLinks
    } = useContext(CourseContext);
    const { setLesson, setLessonLinks, setLessonMaterials } = useContext(LessonContext);
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
        onCompleted: async (data) => {
            setCourse(data.courseById.course);
            await getTeacherCourse({variables: {id: data.courseById.course.teacher}});
            await getCourseLessons({variables: {id: data.courseById.course._id}});
            await getCourseMaterials({variables: {id: data.courseById.course._id}});
            await getCourseLinks({variables: {id: data.courseById.course._id}});
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

    const [getCourseLinks] = useLazyQuery(GET_COURSE_LINKS, {
        onCompleted: (data) => {
            setCourseLinks(data.linksByCourse);
        }
    })

    const [getLesson] = useLazyQuery(GET_LESSON, {
        onCompleted: async (data) => {
            setLesson(data.lessonById);
            await getLessonLinks({variables: {id: data.lessonById._id}});
            await getLessonMaterials({variables: {id: data.lessonById._id}});
        }
    })

    const [getLessonLinks] = useLazyQuery(GET_LESSON_LINKS, {
        onCompleted: (data) => {
            setLessonLinks(data.linksByLesson);
        }
    })

    const [getLessonMaterials] = useLazyQuery(GET_COURSE_MATERIALS, {
        onCompleted: (data) => {
            setLessonMaterials(data.filesByLesson);
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

    const getCourseLinksQuery = async ({variables}) => {
        await getCourseLinks({variables: variables});
    }

    const updateAvatarMutation = async ({variables}) => {
        await updateAvatar({variables: variables});
    }

    const getLessonQuery = async ({variables}) => {
        await getLesson({variables: variables});
    }

    const getLessonLinksQuery = async ({variables}) => {
        await getLessonLinks({variables: variables});
    }

    const getLessonMaterialsQuery = async ({variables}) => {
        await getLessonMaterials({variables: variables});
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
            getCourseLinks: getCourseLinksQuery,
            updateAvatar: updateAvatarMutation,
            getLesson: getLessonQuery
        }}>
            {children}
        </QueryContext.Provider>
    )
}