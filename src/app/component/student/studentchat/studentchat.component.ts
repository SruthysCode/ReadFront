import { Component, OnDestroy, OnInit } from '@angular/core';
import { MentorChat, MentorList, Mentors } from 'src/app/Model/mentorModel';
import { ApiResponse } from 'src/app/Model/responseModel';
import { Studentprofile } from 'src/app/Model/studentModel';
import { ChatService } from 'src/app/Service/chat.service';
import { MentorService } from 'src/app/Service/mentor.service';
import { StudentService } from 'src/app/Service/student.service';

@Component({
  selector: 'app-studentchat',
  templateUrl: './studentchat.component.html',
  styleUrls: ['./studentchat.component.css'],
})
export class StudentchatComponent implements OnInit, OnDestroy {
  chatmsg: string = '';

  mentors: MentorChat[] = [];
  student!: Studentprofile;
  studentID!: string;
  selectedMentor: MentorChat = {
    name: '',
    avatar: '',
    _id: '',
    blocked: false,
  };
  roomID!: string;
  mentorID!: string;

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

  ngOnInit(): void {
    this.listMessage();
    this.GetMentors();
    this.GetStudent();
    //check  online
    this.onlineStatus();
  }

  ngAfterViewInit() {
    this.onlineStatus();
  }

  GetMentors() {
    this.mentorservice.GetMentors().subscribe((res: any) => {
      console.log('M ', res);
      this.mentors = res;
    });
  }

  GetStudent() {
    this.studentservice.LoadProfile().subscribe((res: any) => {
      // console.log(res, 'student det');
      this.student = res.data;
      this.studentID = this.student._id;

      console.log('qwert', this.student._id);

      this.joinChat(this.student._id);
    });
  }
  selectMentor(mentor: MentorChat) {
    this.selectedMentor = mentor;
    this.checkForRoomID(this.selectedMentor._id);
    // get all msgs and display it
  }

  checkForRoomID(mentorID: string) {
    this.studentservice.checkForRoomID(mentorID).subscribe((res: any) => {
      if (res.status == false) {
        // console.log('Nooooooooooooooooooooooooooo');
      }
      // console.log('whole res room id + chat', res.room, res.chat);
      // console.log(res._id, res.studentid);
      this.roomID = res.room._id;
      // console.log(res.chat, 'chat');
      this.chatMessages = res.chat;
      // console.log('chatsssssssss', this.chatMessages);
    });
  }

  send() {
    // console.log('hl');
    const msg = {
      roomid: this.roomID,
      message: this.chatmsg.trim(),
      sender: this.student._id,
      receiver: String(this.selectedMentor._id),
      time: new Date(),
      hasread: false,
    };

    this.chatservice.sendMessage(msg);
    const savedmsg = this.chatservice.saveMessage(msg).subscribe((res) => {
      this.chatMessages.push(res);
    });
    //  console.log("saved msg from ", savedmsg);
    // this.chatMessages.push(msg);

    this.chatmsg = '';
  }

  listMessage() {
    this.chatservice.listMessage().subscribe((msg: any) => {
      // console.log('fgh', msg.text);
      this.chatMessages.push(msg.text);
    });
  }

  joinChat(studentID: string) {
    this.chatservice.join(studentID);
  }

  leaveChat(studentID: string) {
    this.chatservice.leave(studentID);
  }

  onlineStatus() {
    console.log('in online ststus');

    this.chatservice.getOnlineMentor().subscribe((mentorID: string) => {
      console.log("in online ststusssss", mentorID);

      this.mentorID = mentorID;
      // Update the online status of the student in your component
    });

    // this.chatservice.onlineMentor().subscribe((studentID: string) => {
    //   this.mentorID = studentID;
    //   // Update the online status of the student in your component
    // });
  }

  ngOnDestroy(): void {
    this.leaveChat(this.student._id);
  }
}
