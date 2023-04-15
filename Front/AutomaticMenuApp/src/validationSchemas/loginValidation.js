import * as yup from 'yup'

export const loginValidationSchema = yup.object().shape({
    email: yup
        .string()
        .email('Not a fool, that is not an email')
        .required('Email is required'),
    password: yup
        .string()
        .min(5, 'Ok, write a bit more')
        .max(20, 'Calm down, too many characters')
        .required('Password is required'),
    passwordConfirmation: yup
        .string()
        .min(5, 'Ok, write a bit more')
        .max(20, 'Calm down, too many characters')
        .required('Password is required')
        .oneOf([yup.ref('password')], 'Passwords must match')
})