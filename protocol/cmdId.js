// cmdId.js
export const CMD_ID = {
    LoginResponse: 104,
    EnterGameRequest: 105,
    ReconnectResponse: 108,
    PbGetRoleListNotify: 28965,
    JoinSceneNotify: 24102,
    // เพิ่มคำสั่งอื่นๆ ที่คุณต้องการ
};

export const CMD_ID_REVERSED = Object.fromEntries(
    Object.entries(CMD_ID).map(([key, value]) => [value, key])
);
