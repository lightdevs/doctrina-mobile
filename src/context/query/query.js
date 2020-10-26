import { gql } from '@apollo/client';

export const REGISTER = gql`
    mutation Register($email: String!, $name: String!, $password: String!){
        register(email: $email, name: $name, password: $password, accountType: "student"){
            name,
            surname,
            email,
            token
        }
    }
`

export const LOGIN = gql`
    mutation Login($email: String!, $password: String!){
        login(email: $email, password: $password){
            name,
            surname,
            email,
            token
        }
    }
`