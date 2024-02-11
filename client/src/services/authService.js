export const handleLogin = (e, email, password, role) => {
    e.preventDefault()
    try {
        if(!role || !email || !password){
            return alert("Please Provide all the information")
        }
        console.log("login", e, email, password, role)
    } catch (error) {
        console.log(error)
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
        console.log("Register => ",
        name,
        role,
        email,
        password,
        organisationName,
        address,
        hospitalName,
        website,
        phone)
    } catch (error) {
        console.log(error)
    }
};