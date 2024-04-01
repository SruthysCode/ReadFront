import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentChat } from 'src/app/Model/studentModel';
import { ChatService } from 'src/app/Service/chat.service';
import { MentorService } from 'src/app/Service/mentor.service';
import { PeerService } from 'src/app/Service/peer.service';
import { SocketService } from 'src/app/Service/socket.service';
import { StudentService } from 'src/app/Service/student.service';
import Swal from 'sweetalert2';

const mediaConstraints = {
  audio: true,
  video: { width: 720, height: 540 },
};

@Component({
  selector: 'app-studentconnect',
  templateUrl: './studentconnect.component.html',
  styleUrls: ['./studentconnect.component.css'],
})
export class StudentconnectComponent implements OnInit, OnDestroy {
  remoteSocketId: string = 'room1';
  myStream!: MediaStream;
  remoteStream!: MediaStream;
  @ViewChild('myVideo') myVideo!: ElementRef;
  @ViewChild('remoteVideo') remoteVideo!: ElementRef;
  myVideoActive: boolean = false;
  callActive: boolean = false;
  muted: boolean = true;
  accepted: boolean = false;
  callEnd : boolean = false;
  option : boolean = false;

  value: string = 'Student';
  appId!: string;
  myPeerConnection!: RTCPeerConnection | null;
  counter: number = 20;
  mentorname!: string;
  student!: StudentChat;
  available: boolean = false;

  constructor(
    // private socketService: SocketService,
    private peerService: PeerService,
    private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router,
    private chatservice: ChatService
  ) {}

  ngOnInit(): void {
    this.studentService.LoadProfile().subscribe((res: any) => {
      this.student = res.data;
      const name = this.student.name;
      this.available = true;
      this.chatservice.onlineVStudent(name);
    });

    this.chatservice.onStudentJoined().subscribe((data: any) => {
      this.remoteSocketId = data;
    });

    this.chatservice.onIncomingCall().subscribe(async (data) => {
      const { from, offer } = data;
      this.remoteSocketId = from;
      this.accepted=true;
      this.option= true;
      console.log('Incoming call from', from, 'and offer ', offer);

      const ans = await this.peerService.getAnswer(offer);
      console.log("ok answer is",ans);      
      this.chatservice.emitCallAccepted({ to: from, ans: ans });
    })
   
    this.peerService.peer.addEventListener('track',async (ev)=>{
      console.log('GOT TRACKSS!!!');
      
       this.remoteStream = ev.streams[0] ; // ev.streams
       this.remoteVideo.nativeElement.srcObject = this.remoteStream;
    })

    this.peerService.peer.addEventListener('negotiationneeded',async ()=>{
      const offer = await this.peerService.getOffer();
      this.chatservice.emitNegoNeeded({offer,to:this.remoteSocketId});
    })

    this.chatservice.listenToNegoNeeded().subscribe(async (data)=>{
      const {from,offer} = data;
      console.log(83,from,offer);
      const ans = await this.peerService.getAnswer(offer);
      this.chatservice.emitNegoDone({to:from,ans})
      
    })

    this.chatservice.listenToNegoFinal().subscribe(async (data)=>{
      const {from,ans} = data;
      await this.peerService.setLocalDescription(ans)
    })





  }

  ngAfterViewInit(): void {
    this.requestMediaDevices();
   }

  private async requestMediaDevices(): Promise<void> {
    try {
      this.myStream = await navigator.mediaDevices.getUserMedia(mediaConstraints);
      this.myVideo.nativeElement.srcObject = this.myStream;
      this.pauseLocalVideo(); // pause all tracks
  
      console.log('Media stream acquired successfully');
    } catch (e: any) {
      console.error('getUserMedia() error:', e.name, e.message);
      
      if (e.name === 'NotAllowedError') {
        alert('Permission to access camera/microphone denied.');
      } else if (e.name === 'NotReadableError' || e.name === 'OverconstrainedError') {
        alert('Error accessing camera/microphone. Please check device availability.');
      } else {
        alert(`getUserMedia() error: ${e.name}`);
      }

      if (!this.myVideoActive) {
        this.startLocalVideo();
      }
    
    }
  }

  
  
  startCall() {
    console.log('asd', this.student.name);
  }

  startLocalVideo(): void {
    console.log('starting local stream');
    if (this.myStream) {
      this.myStream.getTracks().forEach((track) => {
        track.enabled = true;
      });
      this.myVideo.nativeElement.srcObject = this.myStream;

      this.myVideoActive = true;
    }
  }

  async handleCallStudent() {
    try {
      const offer = await this.peerService.getOffer();
      this.chatservice.emitstudentCall({ to: this.remoteSocketId, offer: offer });
      console.log('Call offer sent successfully');
    } catch (error) {
      console.error('Error handling call:', error);
    }
  }


  pauseLocalVideo(): void {
    if (this.myStream) {
      this.myStream.getTracks().forEach((track) => {
        track.enabled = false;
      });
      this.myVideo.nativeElement.srcObject = undefined;

      this.myVideoActive = false;
    }
  }

  async handleCallUser() {
    try {
      const offer = await this.peerService.getOffer();
      this.chatservice.emitstudentCall({
        to: this.remoteSocketId,
        offer: offer,
      });
      console.log('Call offer sent successfully');
    } catch (error) {
      console.error('Error handling call:', error);
    }
  }

  handleMute() {
    this.muted = !this.muted;
  }

  disConnectCall(): void {
    this.peerService.peer.close();
    this.myStream.getTracks().forEach((track) => track.stop());
    this.myVideo.nativeElement.srcObject = null;
    this.remoteVideo.nativeElement.srcObject = null;
    this.accepted = false;
    this.callActive = false;
    this.option= false;
    // Emit a disconnect event to notify the other party
    this.chatservice.emitDisconnect({ to: this.remoteSocketId });
    this.afterDisconnect();
  }

  afterDisconnect() {
    console.log('after disconnection');
    Swal.fire({
      title: 'Call Disconnected',
      timer: 3000,
      timerProgressBar: true,
      icon: 'success',
      showConfirmButton: false,
    });
  }

  sendStreams(): void {
    this.accepted = false;
    this.callEnd=true;
    for (const track of this.myStream.getTracks()) {
      this.peerService.peer.addTrack(track, this.myStream);
    }
  }

  ngOnDestroy(): void {
     // Release the media stream tracks
  if (this.myStream) {
    this.myStream.getTracks().forEach(track => track.stop());
  }
  }
}
