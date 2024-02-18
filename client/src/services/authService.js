import { userLogin, userRegister, userAddDescription } from '../redux/features/user/userActions';
import store from '../redux/store'

export const handleLogin = (e, email, password, role) => {
    e.preventDefault()
    try {
        if (!role || !email || !password) {
            return alert("Please Provide all the information")
        }
        store.dispatch(userLogin({ email, password, role }))
        
    } catch (error) {
        console.log('Invalid Credentials', error)
    }
};

export const handleRegister = (
    e,
    name,
    role,
    email,
    password,
    organisationName,
    address,
    hospitalName,
    website,
    phone) => {
    e.preventDefault();
    try {
        store.dispatch(userRegister({
            name,
            role,
            email,
            password,
            organisationName,
            address,
            hospitalName,
            website,
            phone
        }))
    } catch (error) {
        console.log(error)
    }
};

export const handleAddUserDescription = (
    user,
    sex,
    birthDate,
    bloodType,
    yearLevel,
    course,
    weight
) => {
    try {
        store.dispatch(userAddDescription({
            ...user,
            sex,
            birthDate,
            bloodType,
            yearLevel,
            course,
            weight
        }));
    } catch (error) {
        console.log(error);
    }
};
