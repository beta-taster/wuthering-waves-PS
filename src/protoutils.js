// protoutils.js
import protobuf from "protobufjs";

const root = await protobuf.load("./protocol/gameserver.proto");

/**
 * Decodes a protobuf message from a buffer.
 * @param {string} messageName - The name of the message type to decode.
 * @param {Buffer} buffer - The buffer containing the encoded message.
 * @returns {Object|null} - The decoded message object, or null if decoding fails.
 */
export function decodeProto(messageName, buffer) {
    const Message = getMessage(messageName);
    if (!Message) {
        console.error(`Message type "${messageName}" not found.`);
        return null;
    }
    return Message.decode(buffer);
}

/**
 * Encodes a message object into a protobuf buffer.
 * @param {string} messageName - The name of the message type to encode.
 * @param {Object} obj - The message object to encode.
 * @returns {Buffer|null} - The encoded message buffer, or null if encoding fails.
 */
export function encodeProto(messageName, obj) {
    const Message = getMessage(messageName);
    if (!Message) {
        console.error(`Message type "${messageName}" not found.`);
        return null;
    }
    return Message.encode(obj).finish();
}

/**
 * Retrieves the message type from the protobuf root.
 * @param {string} messageName - The name of the message type to retrieve.
 * @returns {Object|null} - The message type object, or null if not found.
 */
function getMessage(messageName) {
    try {
        return root.lookupType(messageName);
    } catch (e) {
        console.error(`Error retrieving message "${messageName}":`, e);
        return null;
    }
}
