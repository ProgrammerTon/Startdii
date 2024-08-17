import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

@WebSocketGateway(3002, { cors: { origin: '*' } })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  handleConnection(client: Socket) {
    console.log('Client Connect', client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('Client Disconnect', client.id);
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket, room: string) {
    client.join(room);
    console.log(`Client ${client.id} joined room ${room}`);
    client.emit('message', `Joined room ${room}`);
  }

  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(client: Socket, room: string) {
    client.leave(room);
    console.log(`Client ${client.id} left room ${room}`);
    client.emit('message', `Left room ${room}`);
  }

  @SubscribeMessage('newMessage')
  handleMessage(client: Socket, payload: any) {
    const data = JSON.parse(payload);
    console.log(data.rooms);
    this.server.to(data.rooms).emit('message', data.message);
    // this.server.emit('reply', 'This message is Boardcast');
    // return 'Hello world!';
  }
}
