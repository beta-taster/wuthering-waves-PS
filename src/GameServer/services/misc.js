import { sendResponse } from "./../../gamepacket.js";

// Helper function to send a basic response
const sendBasicResponse = (session, resName, req, responseData) => {
    sendResponse(session, responseData, req.seqno, req.rpcid, resName);
};

/**
 * Handles the event when an entity lands.
 * @param {Object} session - The session object representing the user session.
 * @param {Object} req - The request object containing parameters for the landed event.
 */
export function onEntityOnLanded(session, req) {
    const resName = "EntityOnLandedResponse";
    sendBasicResponse(session, resName, req, { errorCode: 0 });
}

/**
 * Handles the event when an entity becomes active.
 * @param {Object} session - The session object representing the user session.
 * @param {Object} req - The request object containing parameters for the active event.
 */
export function onEntityActive(session, req) {
    const resName = "EntityActiveResponse";
    sendBasicResponse(session, resName, req, { errorCode: 0 });
}

/**
 * Handles the event when entity loading is complete.
 * @param {Object} session - The session object representing the user session.
 * @param {Object} req - The request object containing parameters for the load complete event.
 */
export function onEntityLoadComplete(session, req) {
    const resName = "EntityLoadCompleteResponse";
    sendBasicResponse(session, resName, req, { errorCode: 0 });
}

/**
 * Handles guide information requests.
 * @param {Object} session - The session object representing the user session.
 * @param {Object} req - The request object containing parameters for the guide info request.
 */
export function onGuideInfoRequest(session, req) {
    const resName = "GuideInfoResponse";
    const resObj = {
        guideGroupFinishList: [
            60001, 60002, 60003, 60004, 60005, 60006, 60007, 60008, 60009, 60010,
            60011, 60012, 60013, 60014, 60015, 60016, 60017, 60018, 60019, 60020,
            60021, 60101, 60102, 60103, 62002, 62004, 62005, 62006, 62007, 62009,
            62010, 62011, 62012, 62013, 62014, 62015, 62016, 62017, 62022, 62027,
            62028, 62029, 62030, 62031, 62032, 62033, 62034, 62036, 65001, 67001,
            67002, 67003, 67004, 67005, 67006, 67007, 67008, 67009, 67010, 67011,
            67012, 67013, 67014, 67015, 67016, 67017, 67018, 67019, 67022, 62001,
            62008, 62018, 62019, 62020, 62021, 62023, 62024, 62025, 62026, 62035,
            65002, 65003, 65004, 65005,
        ],
    };
    sendBasicResponse(session, resName, req, { errorCode: 0, ...resObj });
}
