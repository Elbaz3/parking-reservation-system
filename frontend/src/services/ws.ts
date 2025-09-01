// ws.ts
type WSCallback = (data: any) => void;

class WSService {
  private socket: WebSocket | null = null;
  private listeners: Record<string, WSCallback[]> = {};

  connect(gateId?: string) {
    if (this.socket) return; // avoid reconnect

    const url = gateId
      ? `ws://localhost:3000/ws?gateId=${gateId}`
      : `ws://localhost:3000/ws`;

    this.socket = new WebSocket(url);

    this.socket.onopen = () => {
      console.log("✅ WS Connected:", url);
    };

    this.socket.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data);
        const { event: eventName, payload } = msg;

        if (this.listeners[eventName]) {
          this.listeners[eventName].forEach((cb) => cb(payload));
        }
      } catch (err) {
        console.error("❌ WS parse error:", err);
      }
    };

    this.socket.onclose = () => {
      console.warn("⚠️ WS Disconnected");
      this.socket = null;
    };

    this.socket.onerror = (err) => {
      console.error("❌ WS Error:", err);
    };
  }

  disconnect() {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }

  subscribe(eventName: string, cb: WSCallback) {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }
    this.listeners[eventName].push(cb);
  }

  unsubscribe(eventName: string, cb: WSCallback) {
    if (!this.listeners[eventName]) return;
    this.listeners[eventName] = this.listeners[eventName].filter(
      (fn) => fn !== cb
    );
  }

  send(eventName: string, payload: any) {
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) return;
    this.socket.send(JSON.stringify({ event: eventName, payload }));
  }
}

const ws = new WSService();
export default ws;
