


export interface StudentChat {
  _id: string,
  name : string,
  avatar : string,
  blocked: boolean,

}


export interface Studentinfo {    
    name: string;
    email: string;
    password: string;
    // confirmpassword: string;
    mobile: string;
    address:string;
  }
  
  export interface Studentcred{
    username : string,
    password : string
  }
  
  
  export interface Students{
    
    name : string,
    email : string,
    address : string,
    mobile: string,
    avatar:string,
  }
  
  export interface Studentprofile{
    _id: string,
    name : string,
    avatar : string,
    mobile: string;
    address:string;
    email : string,
    verified: boolean,
    password: string,
    blocked: boolean,
  }
  
  // export interface StudentModel extends EntityState<Student>{
      
  //   studentinfo: Studentinfo
  //   studentprofile : Studentprofile
  // }
  