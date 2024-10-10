import { sendResponse } from "./../../gamepacket.js";

/**
 * Updates the scene date by adding days and setting the time.
 * @param {number} addDays - Number of days to add to the current date.
 * @param {number} hour - The hour to set the new date.
 * @param {number} minute - The minute to set the new date.
 * @returns {Object} An object containing the error code and updated date in seconds.
 */
function updateSceneDate(addDays, hour, minute) {
    let errorCode = 0;
    let updatedDate;

    try {
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + addDays);
        currentDate.setHours(hour);
        currentDate.setMinutes(minute);
        updatedDate = Math.floor(currentDate.getTime() / 1000); // Convert to seconds
    } catch (error) {
        errorCode = 1; // Error occurred during date update
        updatedDate = null; // Indicate failure with a null date
    }

    return { errorCode, updatedDate };
}

/**
 * Handles the request to update the scene date.
 * @param {Object} session - The session object representing the user session.
 * @param {Object} req - The request object containing parameters for the update.
 */
export function onUpdateSceneDate(session, req) {
    const resName = "UpdateSceneDateResponse";
    const { addDays, hour, minute } = req.msgobj;

    const { errorCode, updatedDate } = updateSceneDate(addDays, hour, minute);

    const resObj = {
        errorCode: errorCode,
        currDate: updatedDate, // This will be null if errorCode is 1
    };
    
    sendResponse(session, resObj, req.seqno, req.rpcid, resName);
}

/**
 * Handles the request indicating that scene loading has finished.
 * @param {Object} session - The session object representing the user session.
 * @param {Object} req - The request object.
 */
export function onSceneLoadingFinish(session, req) {
    const resName = "SceneLoadingFinishResponse";
    const resObj = {}; // No additional data required for this response
    sendResponse(session, resObj, req.seqno, req.rpcid, resName);
}
