export interface Auth {
  token: string;
}

export interface Connection {
  connected: boolean;
}

export interface Event {
  eventName: string;
  emitted: boolean;
}

export interface Room {
  roomId: string;
  token: string;
}
