import { gql } from '@apollo/client';

export const REGISTER = gql`
    mutation Register($email: String!, $name: String!, $surname: String!, $password: String!) {
        register(email: $email, name: $name, surname: $surname, password: $password, accountType: "student") {
            _id,
            name,
            surname,
            email,
            token
        }
    }
`

export const LOGIN = gql`
    mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            _id,
            name,
            surname,
            email,
            token
        }
    }
`

export const GET_ALL_COURSES = gql`
    query GetAllCourses($id: String!, $page: Int!) {
        personById(id: $id, page: $page, count: 20) {
            courses {
                _id
                title
                maxMark
            }
            isEnd
        }
    }
`

export const GET_COURSE = gql`
    query GetCourse($id: String!) {
        courseById(id: $id, page: 0, count: 0) {
            course { 
                _id,
                title,
                teacher,
                description,
                dateEnd,
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