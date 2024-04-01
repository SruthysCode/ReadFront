export interface Mentorinfo {
  _id: string;
  name: string;
  email: string;
  password: string;
  mobile: string;
  address: string;
  avatar: string;
  blocked: boolean;
}

export interface Mentorcred {
  username: string;
  password: string;
}

export interface Mentors {
  name: string;
  email: string;
  avatar: string;
  _id: object;
  blocked: boolean;
  address: string;
  mobile: string;
}

export interface MentorChat {
  name: string;
  avatar: string;
  _id: string;
  blocked: boolean;
}

export interface MentorList {
  name: string;
  email: string;
  // avatar: string;
  _id: object;
  // blocked: boolean;
  address: string;
  mobile: string;
}
// export interface MentorModel extends EntityState<Mentor> {
//   mentorinfo: Mentorinfo;
//   mentors: Mentors;
// }
