// export interface Messages {
//   messageId: MessagesDetails;
// }

// interface MessagesDetails {
//   text: string;
//   senderId: string;
//   senderName: string;
//   createdAt: string;
// }


export type Message = {
  id: string;
  text: string;
  senderId: string;
  senderName: string;
  createdAt: number;
};
export type ChatUser = {
  uid: string;
  username: string;
  email: string;
};
