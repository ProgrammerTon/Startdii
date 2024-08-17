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

  @SubscribeMessage('newMessage')
  handleMessage(client: Socket, payload: any) {
    console.log(payload);
    this.server.emit('message', payload);
    // this.server.emit('reply', 'This message is Boardcast');
    // return 'Hello world!';
  }
}
