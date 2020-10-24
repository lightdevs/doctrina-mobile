import { gql } from '@apollo/client';

export const REGISTER = gql`
    mutation Register($email: String!, $name: String!, $surname: String!, $password: String!){
        register(email: $email, name: $name, surname: $surname, password: $password, accountType: "student"){
            name,
            surname,
            email,
            token
        }
    }
`

export const LOGIN = gql`
    mutation Login($email: String!, $password: String!, accountType: "student"){
        login(email: $email, password: $password){
            name,
            surname,
            email,
            token
        }
    }
`