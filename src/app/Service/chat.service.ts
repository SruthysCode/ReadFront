import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import {
  BehaviorSubject,
  map,
  Observable,
  Observer,
  of,
  Subject,
  switchMap,
} from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Chat } from '../Model/chatModel';
import { StudentService } from './student.service';
import { MentorService } from './mentor.service';
import { ApiResponse } from '../Model/responseModel';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  APIBaseUrl: string = environment.APIBASEURL + `student/`;
  APIBaseUrlM: string = environment.APIBASEURL + `mentor/`;

  private availableOnlineSubject = new Subject<string[]>();
  availableOnline$ = this.availableOnlineSubject.asObservable();
  private availableOnline: string[] = [];
  // availableOnline : string[]=[]
  studentOnline ! : string;

  //mentor
  private availableOnlineMentorSubject = new Subject<string[]>();
  availableOnlineMentor$ = this.availableOnlineMentorSubject.asObservable();
  private availableOnlineMentor: string[] = [];

  //student
  private availableOnlineStudentSubject = new Subject<string[]>();
  availableOnlineStudent$ = this.availableOnlineStudentSubject.asObservable();
  private availableOnlineStudent: string[] = [];

  constructor(
    private socket: Socket,
    private http: HttpClient,
    private studentservice: StudentService,
    private mentorservice: MentorService
  ) {}

  sendMessage(msg: Chat) {
    this.socket.emit('msg', msg);
  }
  saveMessage(msg: Chat) {
    return this.http.post(this.APIBaseUrl + `storechatmessage`, { msg }).pipe(
      switchMap((res: any) => {
        return of(res.details);
      })
    );
  }

  saveMentorMessage(msg: Chat) {
    return this.http.post(this.APIBaseUrlM + `storechatmessage`, { msg }).pipe(
      switchMap((res: any) => {
        return of(res.details);
      })
    );
  }

  recieveMessage(msg: string) {
    this.socket.on('msg', (message: string) => {
      console.log('incomiing ...', message);

      return { text: message, incoming: true };
    });

    this.socket.on('from', (message: string) => {
      console.log('incomiing from server FROM...', message);

      return { text: message, incoming: true };
    });
  }

  listMessage() {
    return this.socket.fromEvent('msg').pipe(
      map((data: any) => {
        console.log('msdss frm server ', data);
        return { text: data, incoming: true };
      })
    );
  }

  join(studentID: string) {
    console.log('Joinnnnnnnnn', studentID);
    this.socket.emit('join', studentID);
  }

  mentorJoin(mentorID: string) {
    console.log('mentor JJoining', mentorID);
    this.socket.emit('mentorjoin', mentorID);
  }

  leave(studentID: string) {
    this.socket.emit('leave', studentID);
  }

  online() {
    return this.socket.fromEvent('online').pipe(
      map((studentID: any) => {
        console.log('Online is ', studentID);
        return studentID;
      })
    );
  }

  onlineMentor() {
    return this.socket.fromEvent('online').pipe(
      map((studentID: any) => {
        console.log('Online mentor is ', studentID);
        return studentID;
      })
    );
  }

  getOn() {
    return new Observable((observer: Observer<any>) => {
      this.socket.on('online', (notification: any) => {
        console.log('in new getONLINe', notification);
        observer.next(notification);
      });
    });
  }

  getOnlineMentor() {
    return new Observable((observer: Observer<any>) => {
      this.socket.on('mentoronline', (notification: any) => {
        console.log('in new getMENTORONLINe', notification);
        observer.next(notification);
      });
    });
  }

  // video codes starts here

  onlineVMentor(name: string, room: string) {
  
    
    this.socket.emit('room:join', {name, room});
   
  }

onlineVStudent(name: string){
  this.socket.emit('student:online', name);
}

getOnlineStudent(room : string){
  this.socket.on('mentor:studentOnline', (data: {name : string, socketID : string}) => {
  console.log(`Student ${data.name} is online on Socket ${data.socketID}`, room);

  let datas={
    name : data.name,
    room : room,
  }
  const name =data.name
  
  // Ask student to join room
  this.socket.emit('student:joinRoom',{name, room} );
});
}

onStudentJoined(): Observable<any> {
  return new Observable((observer) => {
    this.socket.on('student:joined', (data: any) => {
      console.log(data, 'Joined');
this.studentOnline=data;

      observer.next(data);
    });
    // this.socket.off('user:joined', (data: any) => {});
    return () => {
      this.socket.off('user:joined', );
    };
  });
}


  //call from mentor to student
  emitstudentCall(data: { to: string; offer: any }): void {
    if (this.socket) {
      console.log("yes soc emit call std", data)
      this.socket.emit('student:call', data);
    }
  }

  
  //listening to incoming call event
  onIncomingCall(): Observable<any> {
    return new Observable(observer => {
      console.log("incoming call");
      
      this.socket.on('incoming:call', (data: any) => {
        observer.next(data)
      })
    })
  }
  //emitting that call accepted
  emitCallAccepted(data: { to: string, ans: any }) :void{
    if (this.socket) {
      console.log("inside oncall accepted data sending:to:",data);
      
      this.socket.emit('call:accepted', { data })
    }
  }

  //listening to call accepted event
  listenCallAccepted(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('call:accepted', (data: any) => {
        observer.next(data)
      })
    })
  }

  //negotiation offer emitting
  emitNegoNeeded(data:{offer:any,to:string}){
    this.socket.emit('peer:nego:needed',data)
  }

  //listening to negotiation
  listenToNegoNeeded():Observable<any>{
    return new Observable(observer=>{
      this.socket.on('peer:nego:needed',(data:any)=>{
        observer.next(data)
      })
    })
  }

  //emitting nego:done
  emitNegoDone(data:{to:string,ans:any}){
    this.socket.emit('peer:nego:done',data);
  }

  //listening to nego:final

  listenToNegoFinal():Observable<any>{
    return new Observable(observer=>{
      this.socket.on('peer:nego:final',(data:any)=>{
        observer.next(data)
      })
    })
  }



  //************************ */
  

  emitDisconnect(data: { to: string }): void {
    if (this.socket) {
      this.socket.emit('disconnect:call', data);
    }
  }


}
