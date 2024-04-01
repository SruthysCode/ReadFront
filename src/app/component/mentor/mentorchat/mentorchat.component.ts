import { Component, OnDestroy, OnInit } from '@angular/core';
import { MentorChat } from 'src/app/Model/mentorModel';
import { ApiResponse } from 'src/app/Model/responseModel';
import { StudentChat, Students } from 'src/app/Model/studentModel';
import { ChatService } from 'src/app/Service/chat.service';
import { MentorService } from 'src/app/Service/mentor.service';
import { StudentService } from 'src/app/Service/student.service';

@Component({
  selector: 'app-mentorchat',
  templateUrl: './mentorchat.component.html',
  styleUrls: ['./mentorchat.component.css'],
})
export class MentorchatComponent implements OnInit, OnDestroy {
  chatmsg: string = '';

  students: StudentChat[] = [];
  mentor!: MentorChat;
  mentorID!: string;
  onlineMentorID!: string;
  studentID!: string;
  selectedstudents: StudentChat = {
    name: '',
    avatar: '',
    _id: Object(''),
    blocked: false,
  };
  roomID!: string;

  chatMessages: {
    roomid: string;
    message: string;
    sender: string;
    receiver: string;
    time: Date;
    hasread: boolean;
  }[] = [];

  constructor(
    private chatservice: ChatService,
    private mentorservice: MentorService,
    private studentservice: StudentService
  ) {}

  async ngOnInit() {
    await this.GetMentor();
    this.GetStudents();
    //check  online
    this.listMessage();
    this.onlineStatus();
  }


  ngAfterViewInit(){
    this.onlineStatus()
  }

  GetMentor() {
    this.mentorservice.LoadProfile().subscribe((res: any) => {
      this.mentor = res.data;
      // console.log('res', res.data);
      this.mentorID = String(this.mentor._id);
      console.log(this.mentorID, 'asdfghjkl');
      this.joinChat(this.mentorID);
    });
  }

  GetStudents() {
    this.studentservice.GetStudents().subscribe((res: any) => {
      this.students = res;
    });
  }
  selectStudent(student: StudentChat) {
    this.selectedstudents = student;
    const studentid = Object(this.selectedstudents._id);
    this.checkForRoomID(studentid);
  }

  checkForRoomID(studentID: object) {
    this.mentorservice.checkForRoomID(studentID).subscribe((res: any) => {
      if (res.status == false) {
      }
      this.roomID = res.room._id;
      this.chatMessages = res.chat;
    });
  }

  send() {
    const msg = {
      roomid: this.roomID,
      message: this.chatmsg.trim(),
      sender: this.mentorID,
      receiver: String(this.selectedstudents._id),
      time: new Date(),
      hasread: false,
    };

    this.chatservice.sendMessage(msg);
    this.chatservice.saveMentorMessage(msg).subscribe((res) => {
      this.chatMessages.push(res);
    });

    this.chatmsg = '';
  }

  listMessage() {
    this.chatservice.listMessage().subscribe((msg: any) => {
      this.chatMessages.push(msg.text);
    });
  }

  joinChat(studentID: string) {
    this.chatservice.mentorJoin(studentID);
  }

  leaveChat(studentID: string) {
    this.chatservice.leave(studentID);
  }

  onlineStatus() {
    this.chatservice.getOn().subscribe((studentID: string) => {
      this.studentID = studentID;
      // Update the online status of the student in your component
    });
    // this.chatservice.getOnlineMentor().subscribe((mentorID: string) => {
    //   this.onlineMentorID = mentorID;
    //   // Update the online status of the student in your component
    // });

    // this.chatservice.online().subscribe((studentID: string) => {
    //   console.log('onnnnn');

    //   this.studentID = studentID;
    //   // Update the online status of the student in your component
    // });

    console.log('online ');
    console.log('men ', this.onlineMentorID, 'st', this.studentID);
  }

  ngOnDestroy(): void {
    this.leaveChat(this.mentorID);
  }
}
