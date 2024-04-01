
export interface Chat {
    roomid: string,        
    message:string,        
    sender: string,
    receiver:  string,
    time:  Date,
    hasread: boolean
}
  
export interface Chatmsg {
    roomid: string,        
    message:string,        
    sender: string,
    
    time:  Date,
    hasread: boolean
}
