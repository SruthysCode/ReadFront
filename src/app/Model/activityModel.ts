export interface Todo {
  name: string;
  startDate: string;
  endDate: string;
}

export interface TodoActivity{
  _id : object;
  todo_name : string;
}
export interface Book {
  title: string;
  author: string;
  startDate: string;
  endDate: string;
  sharedBy: string;
  link: string;
}

export interface Activity {
  activity_link: string;
  submitted_date: Date;
  todoname: string;
  bookname: string;
}


export interface ActivityName {
  
  todo_id: string;
  todoname: string;

}

export interface Blog {
  _id: string;
  activity_link: string;
  submitted_date: Date;
  todoname: string;
  booktitle: string;
  studentname: string;
  blocked: boolean;
  mark: number;
  likes : number;
  comments :Comment[];
}

// 

export interface Blog1 {
  _id: string;
  activity_link: string;
  submitted_date: Date;
  todoname: string;
  booktitle: string;
  studentname: string;
  blocked: boolean;
  mark: number;
  likes? : number;
  comments? : Comment[]
}

export interface Comment
{
  comment: string;
  name: string;
}
// 

export interface Rank {
  rank :number;
  name: string;
  mark: number;
}
