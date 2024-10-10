// gamepacket.js
import { decodeProto, encodeProto } from "./protoutils.js";
import { CMD_ID_REVERSED, CMD_ID } from "./protocol/cmdId.js";

export function readRequest(kcp, msg) {
    kcp.input(msg);
    const buffer = kcp.recv();
    
    if (!buffer || buffer.length < 16) return false; // Not a valid KCP message

    const size = buffer.slice(0, 2);
    const type = buffer.readUInt8(3);
    const seqno = buffer.readUInt32LE(4);
    const rpcid = buffer.readUInt16LE(8);
    const msgid = buffer.readUInt16LE(10);
    const crc = buffer.readUInt32LE(12);
    const msgraw = buffer.slice(16);
    const msgname = CMD_ID_REVERSED[msgid];

    try {
        const msgobj = decodeProto(msgname, msgraw);
        const logIgnoreList = ["HeartbeatRequest", "CombatSendPackRequest", "UpdateSceneDateRequest", "TimeCheckRequest", "FormationAttrRequest"];
        
        if (!logIgnoreList.includes(msgname)) {
            console.log("Client sent request with messageId:", msgid, msgname);
        }
        
        return { size, type, seqno, rpcid, msgid, crc, msgraw, msgobj, msgname };
    } catch (e) {
        console.log("Client sent request with unsupported message with messageId:", msgid, msgname);
        return false; // Return false on decoding failure
    }
}

export function sendResponse(kcp, objMsg, seqno, rpcid, messageName) {
    const msgid = CMD_ID[messageName];
    if (!msgid) {
        console.error("Server tried to respond with unsupported message:", messageName);
        return false;
    }

    let protomsg;
    try {
        protomsg = encodeProto(messageName, objMsg);
    } catch (e) {
        console.error("Error encoding proto message:", e);
        return false;
    }

    const header = Buffer.alloc(16);
    header.writeUInt16LE(protomsg.length + header.length - 3, 0); // msg length + header length minus uint24 "size"
    header.writeUInt8(0, 2);
    header.writeUInt8(2, 3); // Type 2 = response
    header.writeUInt32LE(kcp.context().serverseq, 4);
    header.writeUInt16LE(rpcid, 8);
    header.writeUInt16LE(msgid, 10);
    header.writeUInt32LE(crc32.buf(protomsg) >>> 0, 12); // CRC

    const msg = Buffer.concat([header, protomsg]);
    kcp.send(msg);
    console.log("Server sent response with messageId:", msgid, messageName);
    return true; // Return true on success
}

export function sendPush(kcp, messageName, seqno, rpcid, objMsg) {
    const msgid = CMD_ID[messageName];
    if (!msgid) {
        console.error("Server tried to respond with unsupported message:", messageName);
        return false;
    }

    let protomsg;
    try {
        protomsg = encodeProto(messageName, objMsg);
    } catch (e) {
        console.error("Error encoding proto message for push:", e);
        return false;
    }

    const header = Buffer.alloc(14);
    header.writeUInt16LE(protomsg.length + header.length - 3, 0); // msg length + header length minus uint24 "size"
    header.writeUInt8(0, 2);
    header.writeUInt8(4, 3); // Type 4 = push
    header.writeUInt32LE(kcp.context().serverseq, 4);
    header.writeUInt16LE(msgid, 8);
    header.writeUInt32LE(crc32.buf(protomsg) >>> 0, 10); // CRC

    const msg = Buffer.concat([header, protomsg]);
    kcp.send(msg);
    console.log("Server sent push with messageId:", msgid, messageName);
    return true; // Return true on success
}
