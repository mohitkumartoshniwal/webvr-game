import { PositionalAudio, useGLTF } from "@react-three/drei";
import {
  useXRControllerButtonEvent,
  useXRInputSourceStateContext,
} from "@react-three/xr";
import { useGlobalContext } from "../context/global-context";
import { PositionalAudio as PAudio, Quaternion, Vector3 } from "three";
import { useRef } from "react";

export default function Gun() {
  const { addBullet } = useGlobalContext();
  const state = useXRInputSourceStateContext("controller");
  const gamepad = state.inputSource.gamepad;

  const { scene } = useGLTF("/blaster.glb");
  const bulletPrototype = scene.getObjectByName("bullet")!;
  const soundRef = useRef<PAudio>(null);

  useXRControllerButtonEvent(state, "xr-standard-trigger", (state) => {
    if (state === "pressed") {
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
  });

  return (
    <>
      <primitive object={scene} />
      <PositionalAudio ref={soundRef} url="/laser.ogg" loop={false} />
    </>
  );
}
