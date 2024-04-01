import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as SimplePeer from 'simple-peer';
import { PeerService } from 'src/app/Service/peer.service';
import { SocketService } from 'src/app/Service/socket.service';
import Swal from 'sweetalert2';

const mediaConstraints = {
  audio: true,
  video: {
    width: 720,
    height: 540,
  },
};


@Component({
  selector: 'app-studentvideo',
  templateUrl: './studentvideo.component.html',
  styleUrls: ['./studentvideo.component.css']
})
export class StudentvideoComponent  {

  role : string= 'student';
  
  remoteSocketId!: string;
  localStream!: MediaStream;
  remoteStream!: MediaStream;
  videoCamera: boolean = true;
  mentorCallStarted: boolean = false;
  callAccepted: boolean = false;
  callPending : boolean = false

  @ViewChild('local_video') localVideo!: ElementRef
  @ViewChild('received_video') remoteVideo!: ElementRef;
  bookingId!: string;
  studentId!: string;
  
  counter: string = '59:59';
  interval!: any;
  // decodedToken!: tokenData
  constructor(
              private socketService: SocketService,
              private peerService: PeerService,
              private router: Router,
              // private showMessage: MessageToastrService,
              private route: ActivatedRoute
              ){}
              ngOnInit(): void {

    
               // this.decodedToken = jwtDecode(localStorage.getItem('token') as string)
                // this.role = this.route.snapshot.paramMap.get('role')!
                console.log("url role: "+ this.role)
                this.bookingId = history.state.bookingId;
                this.studentId = this.route.snapshot.paramMap.get('mentorId')!;

               
                 console.log(this.role);
                 this.socketService.onstudentJoined().subscribe((data) => {
                  console.log('Remote Socket Id', data);
                  this.remoteSocketId = data;
                  console.log("remoteId: " + this.remoteSocketId); // Move this line here
                });
                // Incomming call
                this.socketService.onIncommingCall().subscribe(async (data) => {
                  const { from, offer } = data;
                  this.remoteSocketId = from;
                   console.log('Incoming call from', from, 'and offer ', offer);
                  const ans = await this.peerService.getAnswer(offer);
                   console.log('Answer is :',ans);
                  this.mentorCallStarted = true;
                  this.socketService.emitCallAccepted({ to: from, ans: ans });
                });
            
                // Listening acceptance
                this.socketService.listenCallAccepted().subscribe(async (data) => {
                  const { from, ans } = data;
                  console.log('Socket service listen call accepting ');
                  // set local description
                  this.peerService.setLocalDescription(ans);
                  this.callAccepted = true;
                   console.log('Call Accepted!');
                  // counter starts
                  this.sendStream();
                  this.startCounter();
                });
            
                // Set remote stream
                this.peerService.peer.addEventListener('track', async (ev) => {
                  console.log('Got tracks');
            
                  this.remoteStream = ev.streams[0];
                  this.remoteVideo.nativeElement.srcObject = this.remoteStream;
                });
            
                // Negositation
                this.peerService.peer.addEventListener('negotiationneeded', async () => {
                  const offer = await this.peerService.getOffer();
                  console.log("offer: "+ offer)
                  this.socketService.emitNegotiationNeeded({
                    offer: offer,
                    to: this.remoteSocketId,
                  });
                });
            
                // Listen negotiation needed
                this.socketService.listenNegoNeeded().subscribe(async (data) => {
                  const { from, offer } = data;
                  const ans = await this.peerService.getAnswer(offer);
                  this.socketService.emitNegotiationDone({ to: from, ans: ans });
                });
            
                // final nego
                this.socketService.listenToNegoFinal().subscribe(async (data) => {
                  const { from, ans } = data;
                  await this.peerService.setLocalDescription(ans);
                });
              }
            
              ngAfterViewInit(): void {
                this.requestMediaDevices();
              }
            
              // Activating the local student camera and audio
              private async requestMediaDevices(): Promise<void> {
                this.localStream = await navigator.mediaDevices.getUserMedia(
                  mediaConstraints
                );
                this.pauseLocalVideo();
              }
            
              // Pause the local video
              pauseLocalVideo(): void {
                this.localStream.getTracks().forEach((track) => {
                  track.enabled = false;
                });
                this.localVideo.nativeElement.srcObject = undefined;
                this.videoCamera = false;
              }
            
              // Starting the local video
              startLocalVideo(): void {
                this.localStream.getTracks().forEach((track) => {
                  track.enabled = true;
                });
                this.localVideo.nativeElement.srcObject = this.localStream;
                this.videoCamera = true;
              }
            
              // Handling the calling
              async handleCallstudent() {
                try {
                    if (!this.callPending) { // Check if call is not pending
                        const offer = await this.peerService.getOffer();
                        this.socketService.emitstudentCall({
                            to: this.remoteSocketId,
                            offer: offer,
                        });
                        this.callPending = true; // Set callPending to true
                        console.log('Call offer sent successfully');
                    } else {
                        console.log('Call is already pending or ongoing');
                    }
                } catch (error) {
                    console.error('Handle call error:', error);
                }
            }
            async answerCall() {
              try {
                 
                      const offer = await this.peerService.getOffer();
                      this.socketService.emitstudentCall({
                          to: this.remoteSocketId,
                          offer: offer,
                      });
                      this.callPending = true; // Set callPending to true
                      console.log('Call offer sent successfully');
                 
              } catch (error) {
                  console.error('Handle call error:', error);
              }
          }
            
            
              sendStream(): void {
                for (const track of this.localStream.getTracks()) {
                  this.peerService.peer.addTrack(track, this.localStream); // for add track
                }
              }
            
              // Hang up the call / disconnect the call
              disconnectCall(): void {
                this.peerService.peer.close();
                this.localStream.getTracks().forEach((track) => track.stop());
                this.localVideo.nativeElement.srcObject = null;
                this.remoteVideo.nativeElement.srcObject = null;
            
                // Emit disconnect
                this.socketService.emitDisconnect({ to: this.remoteSocketId });
                this.afterDisconnect();
              }
            
              afterDisconnect(): void {
                if (this.role === 'student') {
                  Swal.fire('Call Disconnected');
                  // this.showMessage.showWarningToastr('Call Disconnected');
                } else if (this.role === 'mentor') {
                  this.router.navigate(['/dashboard/bookings']);
                  Swal.fire('Call Disconnected');
                  // this.showMessage.showWarningToastr('Call Disconnected');
                }
              }
            
              // Counter function
              startCounter() {
                const endTime = new Date().getTime() + 59 * 60 * 1000 + 59 * 1000; // Set the end time (59 minutes and 59 seconds from now)
            
                this.interval = setInterval(() => {
                  const now = new Date().getTime();
                  const remainingTime = endTime - now;
            
                  if (remainingTime <= 0) {
                    this.counter = '00:00';
                    this.stopCounter();
                    this.disconnectCall();
                  } else {
                    const minutes = Math.floor(
                      (remainingTime % (1000 * 60 * 60)) / (1000 * 60)
                    );
                    const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
                    this.counter = `${this.padZero(minutes)}:${this.padZero(seconds)}`;
                  }
                }, 1000);
              }
            
              stopCounter() {
                clearInterval(this.interval);
              }
            
              padZero(value: number): string {
                return value < 10 ? `0${value}` : `${value}`;
              }
     ngOnDestroy(): void {
    this.disconnectCall();
  }


}
