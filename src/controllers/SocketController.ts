/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Server } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import AnalyticsQuery from '../queries/AnalyticsQuery';

export default class SocketController {
  static ioHandler =
    (
      socket: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
    ) =>
    (io: any) => {
      console.log(`${io.id} has connected`);

      const getSocket = async () => {
        try {
          const inStock = await AnalyticsQuery.stockAlert(100);
          console.log('Inside IO: ', inStock[0].length);

          io?.emit('sendAlert', {
            msg: `${inStock[0].length} products are running out of stock`,
            arr: inStock[0]
          });
        } catch (error) {
          console.log('Socket Error: ', error);
        }
      };
      getSocket();
    };
}
