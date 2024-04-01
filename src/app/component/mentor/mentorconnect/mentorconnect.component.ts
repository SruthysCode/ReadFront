import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Mentors } from 'src/app/Model/mentorModel';
import { ChatService } from 'src/app/Service/chat.service';
import { MentorService } from 'src/app/Service/mentor.service';
import { PeerService } from 'src/app/Service/peer.service';
// import { SocketService } from 'src/app/Service/socket.service';
import Swal from 'sweetalert2';

const mediaConstraints = {
  audio: true,
  video: { width: 720, height: 540 },
};

@Component({
  selector: 'app-mentorconnect',
  templateUrl: './mentorconnect.component.html',
  styleUrls: ['./mentorconnect.component.css'],
})
export class MentorconnectComponent implements OnInit, OnDestroy {
  remoteSocketId: string = '';

  myStream!: MediaStream;
  remoteStream!: MediaStream;
  @ViewChild('myVideo') myVideo!: ElementRef;
  @ViewChild('remoteVideo') remoteVideo!: ElementRef;
  myVideoActive: boolean = false;
  callActive: boolean = false;
  callEnd : boolean =false;
  muted: boolean = true;
  accepted: boolean = false;
  value: string = 'Mentor';
  appId!: string;
  myPeerConnection!: RTCPeerConnection | null;
  mentor!: Mentors;

  available: string = '';

  constructor(
    // private socketService: SocketService,
    private peerService: PeerService,
    private mentorService: MentorService,
    private route: ActivatedRoute,
    private chatservice: ChatService,

    private router: Router
  ) {}

  ngOnInit(): void {
    this.mentorService.LoadProfile().subscribe((res: any) => {
      this.mentor = res.data;
      const name = this.mentor.name;
      const room = String(this.mentor._id);

      this.chatservice.onlineVMentor(name, room);
      this.chatservice.getOnlineStudent(room);
      this.chatservice.onStudentJoined().subscribe((data) => {
        console.log('stud joined', data);
        this.callActive=true;
        this.remoteSocketId = data;
      });
    });

    this.chatservice.listenCallAccepted().subscribe(async (data) => {
      const { from, ans } = data;
      console.log(6333, data.ans);
      this.peerService.setLocalDescription(data.ans);
      console.log('call accepted!!!');
      this.callActive = false;
      this.callEnd=true;
      this.sendStreams();
    });

    this.peerService.peer.addEventListener('track', async (ev) => {
      console.log('GOT TRACKSS!!!');

      this.remoteStream = ev.streams[0]; // ev.streams
      this.remoteVideo.nativeElement.srcObject = this.remoteStream;
    });

    this.peerService.peer.addEventListener('negotiationneeded', async () => {
      const offer = await this.peerService.getOffer();
      this.chatservice.emitNegoNeeded({ offer, to: this.remoteSocketId });
    });

    this.chatservice.listenToNegoNeeded().subscribe(async (data) => {
      const { from, offer } = data;
      console.log(83, from, offer);
      const ans = await this.peerService.getAnswer(offer);
      this.chatservice.emitNegoDone({ to: from, ans });
    });

    this.chatservice.listenToNegoFinal().subscribe(async (data) => {
      const { from, ans } = data;
      await this.peerService.setLocalDescription(ans);
    });
  }

  ngAfterViewInit(): void {
    this.requestMediaDevices();
    if (!this.myVideoActive) {
      this.startLocalVideo();
    }
  }

  private async requestMediaDevices(): Promise<void> {
    try {
      this.myStream = await navigator.mediaDevices.getUserMedia(
        mediaConstraints
      );
      this.myVideo.nativeElement.srcObject = this.myStream;
      this.pauseLocalVideo(); // pause all tracks

      console.log('Media stream acquired successfully');
    } catch (e: any) {
      console.error('getUserMedia() error:', e.name, e.message);

      if (e.name === 'NotAllowedError') {
        alert('Permission to access camera/microphone denied.');
      } else if (
        e.name === 'NotReadableError' ||
        e.name === 'OverconstrainedError'
      ) {
        alert(
          'Error accessing camera/microphone. Please check device availability.'
        );
      } else {
        alert(`getUserMedia() error: ${e.name}`);
      }
    }
  }

  async handleCallStudent() {
    try {
      const offer = await this.peerService.getOffer();
      console.log('offer is ', offer);
console.log("remotesocketid ", this.remoteSocketId);

      this.callEnd=true;
      this.chatservice.emitstudentCall({
        to: this.remoteSocketId,
        offer: offer,
      });
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
  startLocalVideo(): void {
    console.log('starting local stream');
    // if (this.myStream) {

    this.myStream.getTracks().forEach((track) => {
      track.enabled = true;
    });
    this.myVideo.nativeElement.srcObject = this.myStream;

    this.myVideoActive = true;
    // }
  }
  async handleCallstudent() {
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
    this.accepted = true;
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
