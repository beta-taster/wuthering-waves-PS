import { sendResponse, sendPush } from "./../../gamepacket.js";

// Helper function to send a response
const sendBasicResponse = (session, resName, req, responseData) => {
    sendResponse(session, responseData, req.seqno, req.rpcid, resName);
};

// Handler for Map Trace Info
export function onMapTraceInfo(session, req) {
    const resName = "MapTraceInfoResponse";
    sendBasicResponse(session, resName, req, { errorCode: 0 });
}

// Handler for Teleport Data
export function onTeleportData(session, req) {
    const resName = "TeleportDataResponse";
    sendBasicResponse(session, resName, req, { errorCode: 0 });
}

// Handler for Map Unlock Field Info
export function onMapUnlockFieldInfo(session, req) {
    const resName = "MapUnlockFieldInfoResponse";
    sendBasicResponse(session, resName, req, { errorCode: 0 });
}

// Handler for Energy Sync
export function onEnergySync(session, req) {
    const resName = "EnergySyncResponse";
    sendBasicResponse(session, resName, req, { errorCode: 0 });
}

// Handler for Lord Gym Info
export function onLordGymInfo(session, req) {
    const resName = "LordGymInfoResponse";
    sendBasicResponse(session, resName, req, { errorCode: 0 });
}

// Handler for Explore Progress
export function onExploreProgress(session, req) {
    const resName = "ExploreProgressResponse";
    sendPush(session, resName, req.seqno, req.rpcid, {
        areaIds: [
            122000005, 118000002, 106000002, 134000003, 134000004,
            106000000, 134000000, 134000001, 134000002, 109000000,
            109000001, 136000001, 133000008, 135000005, 136000000,
            109000006, 135000002, 142000001, 146000000, 146900000,
            142000002, 135000003, 898900004, 898900005, 11900016,
            134800000, 151000000, 134750002, 151000001, 133000010,
            151750000,
        ],
    });
}

// Handler for Dragon Pool
export function onDragonPool(session, req) {
    const resName = "DragonPoolResponse";
    sendBasicResponse(session, resName, req, { errorCode: 0 });
}

// Handler for Tower Season Update
export function onTowerSeasonUpdate(session, req) {
    const resName = "TowerSeasonUpdateResponse";
    sendBasicResponse(session, resName, req, { errorCode: 0 });
}
