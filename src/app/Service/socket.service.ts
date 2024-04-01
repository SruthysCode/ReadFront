import { Injectable } from '@angular/core';
import { SocketIoConfig } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { Socket, io } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: Socket;

  constructor() {
    const config: SocketIoConfig = {
      url: 'https://localhost:3000',
      options: {},
    };
    this.socket = io(config.url, config.options);

    this.socket.on('connect', () => {
      console.log('Socket connected');
    });

    this.socket.on('connect_error', (error) => {
      console.log('Socket connection error:', error);
    });
  }

  // Mentor Joining the room
  mentorJoinRoom(data: { email: string }) {
    console.log(data, this.socket);
    if (this.socket) {
      console.log('yes socket', this.socket);
      this.socket.emit('mentor-room:join', data);
      console.log("after m log");
      
    } else {
      console.log('no socket');
    }
  }

  // Mentee joining the room
  studentJoinRoom(data: { email: string }) {
    if (this.socket) {
      this.socket.emit('mentee-room:join', data);
    }
  }

  // If student joined in the room
  onstudentJoined(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('student:joined', (data: any) => {
        console.log(data, 'Joined');
        observer.next(data);
      });
      this.socket.off('student:joined', (data: any) => {});
    });
  }

  // call from mentor to mentee
  emitstudentCall(data: { to: string; offer: any }): void {
    if (this.socket) {
      console.log(`Mentor emited the call:`, data);
      this.socket.emit('student:call', data);
    }
  }

  // Listening for incomming call event
  onIncommingCall(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('incoming:call', (data: any) => {
        console.log('call data: ' + data);
        observer.next(data);
      });
    });
  }

  // Emitting call accepting
  emitCallAccepted(data: { to: string; ans: any }): void {
    if (this.socket) {
      // Accepted the call
      this.socket.emit('call:accepted', { data });
    }
  }

  // Listening the call accepted event
  listenCallAccepted(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('call:accepted', (data: any) => {
        observer.next(data);
      });
    });
  }

  // Peer negotiation needed
  emitNegotiationNeeded(data: { offer: any; to: string }) {
    this.socket.emit('peer:nego:needed', data);
  }

  // Listening the nego needed
  listenNegoNeeded(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('peer:nego:needed', (data) => {
        observer.next(data);
      });
    });
  }
  // Emit nego done
  emitNegotiationDone(data: { to: string; ans: any }) {
    this.socket.emit('peer:nego:done', data);
  }

  // Listening the nego final
  listenToNegoFinal(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('peer:nego:final', (data: any) => {
        observer.next(data);
      });
    });
  }

  // Emit disconnect
  emitDisconnect(data: { to: string }): void {
    if (this.socket) {
      this.socket.emit('disconnect:call', data);
    }
  }

  // previoous code****************************************

  listenToMentorOnline(): Observable<any> {
    return new Observable((observer) => {});
  }

  emitNegoDone(data: { to: string; ans: any }): Observable<any> {
    return new Observable((observer) => {});
  }
  emitNegoNeeded(data: { offer: any; to: string }): Observable<any> {
    return new Observable((observer) => {});
  }

  listenToNegoNeeded(): Observable<any> {
    return new Observable((observer) => {});
  }
  onIncomingCall(): Observable<any> {
    return new Observable((observer) => {});
  }

  //   private socket: Socket;
  //   private message: string = '';

  //   constructor() {
  //     const config: SocketIoConfig = {
  //       url: 'http://localhost:3000',
  //       options: {},
  //     };
  //     this.socket = io(config.url, config.options);
  //   }

  //   // mentor online **
  //   emitMentorOnline(mentorname: string): void {
  //     if (this.socket) {
  //       console.log("emit onliine ", mentorname)
  //       this.socket.emit('mentor:online', { mentorname });
  //     }
  //   }

  //   listenToMentorOnline(): Observable<any> {
  //     return new Observable((observer) => {
  //       console.log("mentor onliine fn", observer)

  //       this.socket.on('mentor:online', (data: any) => {
  //         console.log("mentor online", data,"data")
  //         observer.next(data);
  //       });
  //     });
  //   }

  // // *********

  //   //mentor joining
  //   joinRoom(data: { email: string; room: string }) {
  //     if (this.socket) {
  //       this.socket.emit('room:join', data);
  //     }
  //   }
  //   //student joining
  //   studentRoomJoin(data: { email: string; room: string }): void {
  //     if (this.socket) {
  //       this.socket.emit('student-room:join', data);
  //     }
  //   }

  //   //listening to the event from backend on student joining
  //   onstudentJoined(): Observable<any> {
  //     console.log('Frm socketseervice ');
  //     return new Observable((observer) => {
  //       this.socket.on('student:joined', (data: any) => {
  //         console.log('Frm socketseervice usrjoind', data );

  //         observer.next(data);
  //       });
  //       this.socket.off('student:joined', (data: any) => {});
  //     });
  //   }

  //   //call from mentor to student
  //   emitstudentCall(data: { to: string; offer: any }): void {
  //     if (this.socket) {
  //       this.socket.emit('student:call', data);
  //     }
  //   }
  //   //listening to incoming call event
  //   onIncomingCall(): Observable<any> {
  //     return new Observable((observer) => {
  //       this.socket.on('incoming:call', (data: any) => {
  //         observer.next(data);
  //       });
  //     });
  //   }
  //   //emitting that call accepted
  //   emitCallAccepted(data: { to: string; ans: any }): void {
  //     if (this.socket) {
  //       console.log('inside oncall accepted data sending:to:', data);

  //       this.socket.emit('call:accepted', { data });
  //     }
  //   }

  //   //listening to call accepted event
  //   listenCallAccepted(): Observable<any> {
  //     return new Observable((observer) => {
  //       this.socket.on('call:accepted', (data: any) => {
  //         observer.next(data);
  //       });
  //     });
  //   }

  //   //negotiation offer emitting
  //   emitNegoNeeded(data: { offer: any; to: string }) {
  //     this.socket.emit('peer:nego:needed', data);
  //   }

  //   //listening to negotiation
  //   listenToNegoNeeded(): Observable<any> {
  //     return new Observable((observer) => {
  //       this.socket.on('peer:nego:needed', (data: any) => {
  //         observer.next(data);
  //       });
  //     });
  //   }

  //   //emitting nego:done
  //   emitNegoDone(data: { to: string; ans: any }) {
  //     this.socket.emit('peer:nego:done', data);
  //   }

  //   //listening to nego:final

  //   listenToNegoFinal(): Observable<any> {
  //     return new Observable((observer) => {
  //       this.socket.on('peer:nego:final', (data: any) => {
  //         observer.next(data);
  //       });
  //     });
  //   }

  //   //emitting the disconnection

  //   emitDisconnect(data: { to: string }): void {
  //     if (this.socket) {
  //       this.socket.emit('disconnect:call', data);
  //     }
  //   }

  //   // New methods for student part

  //   emitStudentOnline(data: { studentId: string }): void {
  //     if (this.socket) {
  //       this.socket.emit('student:online', data);
  //     }
  //   }

  //   listenToStudentOnline(): Observable<any> {
  //     return new Observable((observer) => {
  //       this.socket.on('student:online', (data: any) => {
  //         observer.next(data);
  //       });
  //     });
  //   }

  //   emitStudentCallAccepted(data: { studentId: string; offer: any }): void {
  //     if (this.socket) {
  //       this.socket.emit('student:call:accepted', data);
  //     }
  //   }

  //   listenToStudentCallAccepted(): Observable<any> {
  //     return new Observable((observer) => {
  //       this.socket.on('student:call:accepted', (data: any) => {
  //         observer.next(data);
  //       });
  //     });
  //   }

  //   emitStudentCallRejected(data: { studentId: string }): void {
  //     if (this.socket) {
  //       this.socket.emit('student:call:rejected', data);
  //     }
  //   }

  //   listenToStudentCallRejected(): Observable<any> {
  //     return new Observable((observer) => {
  //       this.socket.on('student:call:rejected', (data: any) => {
  //         observer.next(data);
  //       });
  //     });
  //   }
}
