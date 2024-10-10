import kcp from "./node-kcp/index.js";
import dgram from "dgram";
import { readRequest } from "./gamepacket.js";
import { HANDLERS } from "./GameServer/handler.js";

// ค่าพอร์ตที่เซิร์ฟเวอร์จะฟัง
const PORT = 1337;
const server = dgram.createSocket('udp4');
const clients = {};

// การจัดการข้อผิดพลาดของเซิร์ฟเวอร์
server.on('error', (err) => {
    console.error(`Server error: ${err.stack}`);
    server.close();
});

// การจัดการข้อความที่เข้ามา
server.on('message', (msg, rinfo) => {
    const clientSig = getClientSig(rinfo.address, rinfo.port);
    
    if (msg.length === 1) { // SYN handshake
        handleSYNHandshake(msg, rinfo, clientSig);
    } else { // Handle KCP packets
        const kcp = getKcp(rinfo);
        if (kcp) {
            processKcpMessage(kcp, msg);
        } else {
            console.warn("Invalid session detected, packet was ignored");
        }
    }
});

// Log เมื่อเซิร์ฟเวอร์เริ่มฟัง
server.on('listening', () => {
    const address = server.address();
    console.log(`Game Server is running on port ${address.port}`);
});
server.bind(PORT);

// ฟังก์ชันในการจัดการ SYN handshake
function handleSYNHandshake(msg, rinfo, clientSig) {
    const context = createKcpContext(rinfo.address, rinfo.port);
    const kcp = clients[clientSig] = new kcp.KCP(context.convid, context);
    
    kcp.output((data, size, context) => {
        server.send(data, 0, size, context.port, context.address);
    });
    
    const SYN = msg.readUInt8();
    const ACK = writeACK(kcp, SYN);
    console.log(`Received SYN: ${SYN}, sent ACK: ${ACK}`);
    server.send(ACK, 0, ACK.length, kcp.context().port, kcp.context().address);
}

// ฟังก์ชันในการประมวลผลข้อความ KCP
function processKcpMessage(kcp, msg) {
    const gameRequest = readRequest(kcp, msg);
    if (gameRequest) {  // Valid KCP packet
        if (gameRequest.type === 1) { // Request
            const handler = HANDLERS[gameRequest.msgid];
            if (handler) {
                handler(kcp, gameRequest);
            }
        } else if (gameRequest.type === 4) {
            // Handle push notifications if necessary
        }
    } else {
        console.warn("Invalid packet:", msg);
    }
}

// ฟังก์ชันในการเขียน ACK response
function writeACK(kcp, syn) {
    const ACK = Buffer.alloc(5);
    ACK.writeUInt8(syn + 1, 0);
    ACK.writeInt32LE(kcp.context().convid, 1);
    return ACK;
}

// ฟังก์ชันในการดึง KCP context
function getKcp(rinfo) {
    const clientSig = getClientSig(rinfo.address, rinfo.port);
    return clients[clientSig] ?? false;
}

// ฟังก์ชันในการสร้าง client signature
function getClientSig(ip, port) {
    return `${ip}_${port}`;
}

// ฟังก์ชันในการสร้าง KCP context
function createKcpContext(ip, port) {
    return {
        address: ip,
        port: port,
        convid: 1,
        serverseq: 0,
    };
}
