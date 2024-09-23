import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { Logger } from '@nestjs/common';
import { ChatService } from './chat.service';
import { messageType } from './entities/chat.entity';

@WebSocketGateway(3002, { cors: { origin: '*' } })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  constructor(private chatService: ChatService) {}
  private logger: Logger = new Logger('MessageGateway');

  handleConnection(client: Socket) {
    return this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    return this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket, room: string) {
    client.join(room);
    // client.emit('message', `Joined room ${room}`);
    return this.logger.log(`Client ${client.id} joined room ${room}`);
  }

  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(client: Socket, room: string) {
    client.leave(room);
    // client.emit('message', `Left room ${room}`);
    return this.logger.log(`Client ${client.id} left room ${room}`);
  }

  @SubscribeMessage('newMessage')
  async handleMessage(client: Socket, payload: any) {
    const data = JSON.parse(payload);
    if (payload.type == messageType.text) {
      this.server.to(data.rooms).emit('message', payload);
      await this.chatService.create(data);
      return;
    } else {
      const newMessage: any = await this.chatService.create(data);
      console.log('Hello', newMessage);
      const formattedChat = {
        source: {
          _id: newMessage.sourceId._id.toString(),
          ownerId: {
            _id: newMessage.sourceId.ownerId._id.toString(),
            username: newMessage.sourceId.ownerId.username,
          },
          title: newMessage.sourceId.title,
          tags: newMessage.sourceId.tags,
          avg_rating_score: newMessage.sourceId.avg_rating_score,
        },
        sender: newMessage.userId.username,
        type: newMessage.msgType,
        time: data.time,
      };
      console.log('Nah', formattedChat);
      this.server.to(data.rooms).emit('message', formattedChat);
      return;
    }
  }
}
