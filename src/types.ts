import { Quaternion, Vector3 } from "three";

export type BulletData = {
  id: string;
  initPosition: Vector3;
  initQuaternion: Quaternion;
  timestamp: number;
};
