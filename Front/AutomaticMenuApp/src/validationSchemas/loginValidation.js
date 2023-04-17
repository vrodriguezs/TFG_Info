import * as yup from 'yup'

export const logInValidationSchema = yup.object().shape({
    email: yup
        .string()
        .email('Email is badly formated')
        .required('Email is required'),
    password: yup
        .string()
        .min(5, 'Password is too short')
        .max(20, 'Password is too long')
        .required('Password is required'),
})
export const signUpValidationSchema = yup.object().shape({
    email: yup
        .string()
        .email('Email is badly formated')
        .required('Email is required'),
    password: yup
        .string()
        .min(5, 'Password is too short')
        .max(20, 'Password is too long')
        .required('Password is required'),
    passwordConfirmation: yup
        .string()
        .min(5, 'Password is too short')
        .max(20, 'Password is too long')
        .required('Password is required')
        .oneOf([yup.ref('password')], 'Passwords must match')
})