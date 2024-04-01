import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SignalingService {

 
  private socket: Socket;

  constructor() {
    this.socket = io('http://localhost:3000'); // Replace with your signaling server URL
  }

  // Emit an event to join a room
  joinRoom(roomId: string) {
    this.socket.emit('join-room', roomId);
  }

  // Emit an event to initiate a call
  initiateCall(calleeId: string) {
    this.socket.emit('initiate-call', calleeId);
  }

  // Listen for incoming call
  onIncomingCall(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('incoming-call', (data: any) => {
        observer.next(data);
      });
    });
  }

  // Emit an event to answer a call
  answerCall(callerId: string) {
    this.socket.emit('answer-call', callerId);
  }

  // Listen for call accepted event
  onCallAccepted(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('call-accepted', (data: any) => {
        observer.next(data);
      });
    });
  }

  // Emit an event to send ICE candidate
  sendICECandidate(candidate: any, to: string) {
    this.socket.emit('send-ice-candidate', { candidate, to });
  }

  // Listen for ICE candidate event
  onReceiveICECandidate(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('receive-ice-candidate', (data: any) => {
        observer.next(data);
      });
    });
  }

  // Emit an event to send SDP offer or answer
  sendSDP(sdp: any, to: string) {
    this.socket.emit('send-sdp', { sdp, to });
  }

  // Listen for SDP offer or answer event
  onReceiveSDP(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('receive-sdp', (data: any) => {
        observer.next(data);
      });
    });
  }

}
