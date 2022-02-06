export class LoggingService {
  logStatusChange(status: string){
    console.log('A server status changed, new status: ' + status);
  }
  logMessage(message: string){
    console.log('ebd-log: ' + message);
  }
}
