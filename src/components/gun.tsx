import { PositionalAudio, useGLTF } from "@react-three/drei";
import {
  useXRControllerButtonEvent,
  useXRInputSourceStateContext,
} from "@react-three/xr";
import { useGlobalContext } from "../context/global-context";
import { Quaternion, Vector3, PositionalAudio as PAudio } from "three";
import { useRef } from "react";

export default function Gun() {
  const { addBullet } = useGlobalContext();
  const { scene } = useGLTF("/blaster.glb");
  const state = useXRInputSourceStateContext("controller");
  const gamepad = state.inputSource.gamepad;
  const soundRef = useRef<PAudio>(null);

  const bulletPrototype = scene.getObjectByName("bullet")!;

  useXRControllerButtonEvent(
    state,
    "xr-standard-trigger",
    (controllerState) => {
      if (controllerState === "pressed") {
        addBullet(
          bulletPrototype.getWorldPosition(new Vector3()),
          bulletPrototype.getWorldQuaternion(new Quaternion())
        );

        const laserSound = soundRef.current!;
        if (laserSound.isPlaying) {
          laserSound.stop();
        }
        laserSound.play();
        gamepad?.hapticActuators[0]?.pulse(0.5, 10);
      }
    }
  );
  return (
    <>
      <primitive object={scene} />
      <PositionalAudio ref={soundRef} url="/laser.ogg" loop={false} />
    </>
  );
}
