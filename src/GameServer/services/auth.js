import { sendResponse, sendPush } from "./../../gamepacket.js";
import { playerModel } from "../game/player/player.js";

const getCurrentTimestamp = () => Math.floor(Date.now() / 1000);

const sendBasicResponse = (session, resName, req, responseData) => {
    sendResponse(session, responseData, req.seqno, req.rpcid, resName);
};

const pushRoleList = (session, req) => {
    sendPush(session, "PbGetRoleListNotify", req.seqno, req.rpcid, {
        roleList: playerModel.characters,
    });
};

const pushUnlockFields = (session, req) => {
    for (let i = 1; i < 15; i++) {
        sendPush(session, "MapUnlockFieldNotify", req.seqno, req.rpcid, { fieldId: i });
    }
};

const pushBasicInfo = (session, req) => {
    const { id, attributes } = playerModel;
    const basicInfo = {
        randomSeed: 5,
        id: id,
        birthday: 0,
        attributes: [
            { key: 7, valueType: 1, stringValue: attributes.name },
            { key: 0, valueType: 0, int32Value: attributes.exp },
            { key: 1, valueType: 0, int32Value: attributes.level },
            { key: 4, valueType: 0, int32Value: attributes.headphoto },
            { key: 5, valueType: 0, int32Value: attributes.headframe },
        ],
        roleShowList: [{ level: attributes.level, roleId: playerModel.characters[0] }],
        curCardId: 80060000,
        cardUnlockList: [{ cardId: 80060000, isRead: true }],
    };

    sendPush(session, "BasicInfoNotify", req.seqno, req.rpcid, basicInfo);
};

const pushJoinScene = (session, req) => {
    const sceneInfo = {
        instanceId: 900,
        ownerId: playerModel.id,
        curContextId: playerModel.id,
        timeInfo: {
            hour: new Date().getHours(),
            minute: new Date().getMinutes(),
        },
        aoiData: {
            entities: [
                {
                    id: 1,
                    entityType: 0,
                    configType: 3,
                    entityState: 2,
                    configId: 1505,
                    pos: playerModel.position,
                    rot: playerModel.rotation,
                    playerId: playerModel.id,
                    livingStatus: 0,
                    isVisible: true,
                    initLinearVelocity: {},
                    initPos: playerModel.position,
                    componentPbs: playerModel.componentPbs,
                },
                {
                    id: 2,
                    entityType: 0,
                    configType: 3,
                    entityState: 2,
                    configId: 1106,
                    pos: playerModel.position,
                    rot: playerModel.rotation,
                    playerId: playerModel.id,
                    livingStatus: 0,
                    isVisible: true,
                    initLinearVelocity: {},
                    initPos: playerModel.position,
                    componentPbs: playerModel.componentPbs,
                },
            ],
        },
        playerInfos: [
            {
                playerId: playerModel.id,
                level: playerModel.attributes.level,
                isOffline: false,
                location: playerModel.position,
                rotation: playerModel.rotation,
                playerName: playerModel.attributes.name,
                curRole: playerModel.characters,
                groupType: 1,
                crs: [
                    {
                        groupType: 1,
                        fightRoleInfos: [
                            { entityId: 1, roleId: 1505 },
                            { entityId: 2, roleId: 1106 },
                            { entityId: 3, roleId: 1603 },
                        ],
                        curRole: playerModel.characters,
                        isRetain: true,
                        livingStatus: 0,
                        nda: false,
                    },
                ],
            },
        ],
    };

    sendPush(session, "JoinSceneNotify", req.seqno, req.rpcid, { sceneInfo });
};

export function onLogin(session, req) {
    const resName = "LoginResponse";
    const responseData = { platform: 'PC', timestamp: getCurrentTimestamp() };
    console.log(req.msgobj.data);
    sendBasicResponse(session, resName, req, responseData);
}

export async function onEnterGame(session, req) {
    const resName = "EnterGameResponse";
    console.log(req.msgobj.data);
    sendBasicResponse(session, resName, req, { code: 0 });

    pushRoleList(session, req);
    pushUnlockFields(session, req);
    pushBasicInfo(session, req);
    pushJoinScene(session, req);
    
    sendPush(session, "AfterJoinSceneNotify", req.seqno, req.rpcid, {});
}

export async function onReconnect(session, req) {
    const resName = "ReconnectResponse";
    const responseData = { errorCode: 0 };
    sendBasicResponse(session, resName, req, responseData);
}

export async function onProtoKey(session, req) {
    const resName = "ProtoKeyResponse";
    sendBasicResponse(session, resName, req, { errorCode: 0 });
}
