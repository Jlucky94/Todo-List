import * as yup from 'yup'

export const loginSchema = yup.object().shape({
    email: yup.string().email('Enter valid email address').required('This field is required'),
    password: yup.string().required('This field is required')
})
export const registrationSchema = yup.object().shape({
    email: yup.string().email('Enter valid email address').required('This field is required'),
    password: yup.string().required('This field is required').min(8, 'Password must have at least 8 symbols'),
    passwordConfirmation: yup.string().required('This field is required').oneOf([yup.ref('password')],'Your passwords do not match')
})
export const recoveryPassSchema = yup.object().shape({
    password: yup.string().required('This field is required').min(8, 'Password must have at least 8 symbols'),
    passwordConfirmation: yup.string().required('This field is required').oneOf([yup.ref('password')],'Your passwords do not match')
})

export const forgotSchema = yup.object().shape({
    email: yup.string().email('Enter valid email address').required('This field is required'),
})