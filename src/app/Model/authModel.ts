
export interface Login{
    email : string,
    password : string   
}

export interface LoginResponse {
    // status: boolean,
    // data? :any,
    token: string
}

export interface SignUp{
    name : string,
    email : string,
    password : string,
    confirmpassword : string   
}

export interface ResponseData{
    success: boolean,
    message?: string,
    data?: any 
}

