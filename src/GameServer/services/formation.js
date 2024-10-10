import { sendResponse } from "./../../gamepacket.js";
import { playerModel } from "../game/player/player.js"; // Ensure to import playerModel for character data

/**
 * Handles the request to get formation data.
 * @param {Object} session - The session object representing the user session.
 * @param {Object} req - The request object containing parameters for the formation data request.
 */
export function onGetFormationData(session, req) {
    const resName = "GetFormationDataResponse";
    
    const resObj = {
        formations: [
            {
                curRole: playerModel.characters, // Current roles based on player model
                formationId: 1,
                isCurrent: true,
                roleIds: [1505, 1106], // Example role IDs
            },
        ],
    };

    sendResponse(session, resObj, req.seqno, req.rpcid, resName);
}
