import { CMD_ID } from "../protocol/cmdId.js"
import { onLogin, onEnterGame, onReconnect, onProtoKey } from "./services/auth.js";
import { onGetFormationData } from "./services/formation.js";
import { onHeartBeat,onClientCurrentRoleReport ,onPlayerMotion } from "./services/player.js";
import { onEntityOnLanded, onEntityActive, onEntityLoadComplete, onGuideInfoRequest } from "./services/misc.js"
import { onUpdateSceneDate, onSceneLoadingFinish } from "./services/scene.js";
import { onMapTraceInfo, onTeleportData, onMapUnlockFieldInfo, onEnergySync, onLordGymInfo, onExploreProgress, onDragonPool, onTowerSeasonUpdate } from "./services/map.js";

// TODO: automatic import
export const HANDLERS = {
  // Auth
  [CMD_ID.LoginRequest]: onLogin,
  [CMD_ID.EnterGameRequest]: onEnterGame,
  [CMD_ID.ReconnectRequest]: onReconnect,
  [CMD_ID.ProtoKeyRequest]: onProtoKey,


  // Formation
  [CMD_ID.GetFormationDataRequest]: onGetFormationData,

  // Inventory


  // Map
  [CMD_ID.MapTraceInfoRequest]: onMapTraceInfo,
  [CMD_ID.TeleportDataRequest]: onTeleportData,
  [CMD_ID.MapUnlockFieldInfoRequest]: onMapUnlockFieldInfo,
  [CMD_ID.EnergySyncRequest]: onEnergySync,
  [CMD_ID.LordGymInfoRequest]: onLordGymInfo,
  [CMD_ID.ExploreProgressRequest]: onExploreProgress,
  [CMD_ID.DragonPoolRequest]: onDragonPool,
  [CMD_ID.TowerSeasonUpdateRequest]: onTowerSeasonUpdate,

  // Misc
  [CMD_ID.EntityOnLandedRequest]: onEntityOnLanded,
  [CMD_ID.EntityActiveRequest]: onEntityActive,
  [CMD_ID.EntityLoadCompleteRequest]: onEntityLoadComplete,
  [CMD_ID.GuideInfoRequest]: onGuideInfoRequest,

  // Player
  [CMD_ID.HeartbeatRequest]: onHeartBeat,
  [CMD_ID.ClientCurrentRoleReportRequest]: onClientCurrentRoleReport,
  [CMD_ID.PlayerMotionRequest]: onPlayerMotion,

  // Scene
  [CMD_ID.UpdateSceneDateRequest]: onUpdateSceneDate,
  [CMD_ID.SceneLoadingFinishRequest]: onSceneLoadingFinish,


}

export const DUMMY_HANDLERS = [
  
]

export const sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));