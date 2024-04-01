
export interface Notification {
    _id?: string;
    type: string;
    content: string;
    timestamp?: Date;
    sender: string;
    
    status?: string;
    read?: boolean;
  }
  