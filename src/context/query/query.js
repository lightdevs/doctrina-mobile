import { gql } from '@apollo/client';

export const REGISTER = gql`
    mutation Register($email: String!, $name: String!, $surname: String!, $password: String!) {
        register(email: $email, name: $name, surname: $surname, password: $password, accountType: "student") {
            _id
            email
            name
            surname
            country
            city
            institution
            description
            photo {
                _id
            }
            token
        }
    }
`

export const LOGIN = gql`
    mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            _id
            email
            name
            surname
            country
            city
            institution
            description
            photo {
                fileId
            }
            token
        }
    }
`

export const GET_ALL_COURSES = gql`
    query GetAllCourses($id: String!, $page: Int!){
        personById(id: $id, page: $page, count: 20){
            courses{
                course{
                    _id
                    title
                    maxMark
                }
            }
            isEnd
        }
    }
`

export const GET_COURSE = gql`
    query GetCourse($id: String!) {
        courseById(id: $id, page: 0, count: 0) {
            course { 
                _id
                title
                teacher
                description
                dateEnd
                dateStart
            }
        }
    }
`

export const GET_TEACHER = gql`
    query GetTeacher($id: String!) {
        personById(id: $id, page: 0, count: 0){
            person {
                name
                surname
            }
        }
    }
`

export const UPDATE_PROFILE = gql`
    mutation UpdatePerson (
        $id: ID!,
        $email: String,
        $name: String,
        $surname: String,
        $country: String,
        $city: String,
        $institution: String,
        $description: String
    )
    {
        updatePerson(
            id: $id, 
            email: $email, 
            name: $name, 
            surname: $surname,
            country: $country,
            city: $city,
            institution: $institution,
            description: $description
        )
        {
            _id
            email 
            name 
            surname
            country
            city
            institution
            description
        }
    }
`

export const GET_COURSE_LESSONS = gql`
    query GetCourseLessons($id: String!){
        lessonsByCourse(courseId: $id){
            _id
            title
            type
            maxMark
            description
            dateStart
            dateEnd
        }
    }
`

export const GET_COURSE_MATERIALS = gql`
    query GetCourseMaterials($id: String!){
        filesByCourse(courseId: $id){
            _id
            title
            description
        }
    }
`

export const GET_COURSE_LINKS = gql`
    query GetCourseLinks($id: String!){
        linksByCourse(id: $id){
            description
            link
        }
    }
`

export const UPDATE_AVATAR = gql`
    mutation UpdateAvatar($id: String!, $file: Upload!){
        uploadProfilePic(personId: $id, file: $file)
    }
`

export const GET_LESSON = gql`
    query GetLesson($id: String!){
        lessonById(id: $id){
            _id
            type
            description,
            dateStart
            dateEnd
            maxMark
            title
        }
    }
`

export const GET_LESSON_LINKS = gql`
    query GetLessonLinks($id: String!){
        linksByLesson(id: $id){
            description
            link
        }
    }
`

export const GET_LESSON_MATERIALS = gql`
    query GetCourseMaterials($id: String!){
        filesByLesson(lessonId: $id){
            _id
            title
            description
        }
    }
`