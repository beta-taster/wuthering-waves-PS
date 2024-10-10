import { sendResponse } from "./../../gamepacket.js";

/**
 * Handles heartbeat requests from the client.
 * @param {Object} session - The session object representing the user session.
 * @param {Object} req - The request object containing parameters for the heartbeat.
 */
export function onHeartBeat(session, req) {
    const resName = "HeartbeatResponse";
    const resObj = { errorCode: 0 }; // Directly include error code in response
    sendResponse(session, resObj, req.seqno, req.rpcid, resName);
}

/**
 * Handles reports of the client's current role.
 * @param {Object} session - The session object representing the user session.
 * @param {Object} req - The request object containing parameters for the role report.
 */
export function onClientCurrentRoleReport(session, req) {
    const resName = "ClientCurrentRoleReportResponse";
    const resObj = { errorCode: 0 }; // Directly include error code in response
    sendResponse(session, resObj, req.seqno, req.rpcid, resName);
}

/**
 * Handles player motion requests.
 * @param {Object} session - The session object representing the user session.
 * @param {Object} req - The request object containing parameters for player motion.
 */
export function onPlayerMotion(session, req) {
    const resName = "PlayerMotionResponse";
    const resObj = { errorCode: 0 }; // Directly include error code in response
    sendResponse(session, resObj, req.seqno, req.rpcid, resName);
}
