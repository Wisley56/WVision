export class Ticket {
    constructor(id, sessionId, clientName, cpf, seat, paymentType) {
      this.id = id;
      this.sessionId = sessionId;
      this.clientName = clientName;
      this.cpf = cpf;
      this.seat = seat;
      this.paymentType = paymentType;
    }
  
    getId() { return this.id; }
    getSessionId() { return this.sessionId; }
    getClientName() { return this.clientName; }
    getCpf() { return this.cpf; }
    getSeat() { return this.seat; }
    getPaymentType() { return this.paymentType; }
  
    toJSON() {
      return {
        id: this.id,
        sessionId: this.sessionId,
        clientName: this.clientName,
        cpf: this.cpf,
        seat: this.seat,
        paymentType: this.paymentType
      };
    }
  }
  