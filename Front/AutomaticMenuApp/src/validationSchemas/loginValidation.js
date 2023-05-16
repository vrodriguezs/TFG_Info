import * as yup from 'yup'

export const logInValidationSchema = yup.object().shape({
    email: yup
        .string()
        .email('El format no és correcte')
        .required('El correu és obligatori'),
    password: yup
        .string()
        .min(5, 'La contrasenya és massa curta')
        .max(20, 'La contrasenya és massa llarga')
        .required('La contrasenya és obligatòria'),
})
export const signUpValidationSchema = yup.object().shape({
    email: yup
        .string()
        .email('El format no és correcte')
        .required('El correu és obligatori'),
    password: yup
        .string()
        .min(5, 'La contrasenya és massa curta')
        .max(20, 'La contrasenya és massa llarga')
        .required('La contrasenya és obligatòria'),
    passwordConfirmation: yup
        .string()
        .min(5, 'La contrasenya és massa curta')
        .max(20, 'La contrasenya és massa llarga')
        .required('La contrasenya és obligatòria')
        .oneOf([yup.ref('password')], 'Les contrasenyes han de coincidir')
})