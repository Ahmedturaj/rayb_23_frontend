import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export function initSocket() {
    if (!socket) {
        socket = io(process.env.NEXT_PUBLIC_SOCKET_URL);
    }
    return socket;
}

export function getSocket() {
    if (!socket) {
        throw new Error("Socket not initialized");
    }
    return socket;
}
