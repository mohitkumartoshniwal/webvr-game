import { useGLTF } from "@react-three/drei";
import { BulletData } from "../types";
import { Mesh, Vector3 } from "three";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { bulletSpeed, useGlobalContext } from "../context/global-context";

type BulletProps = {
  bulletData: BulletData;
};

const forwardVector = new Vector3(0, 0, -1);

export function Bullet({ bulletData }: BulletProps) {
  const { targets, removeBullet, addScore } = useGlobalContext();
  const { scene } = useGLTF("/blaster.glb");
  const bulletPrototype = scene.getObjectByName("bullet")! as Mesh;
  const ref = useRef<Mesh>(null);

  useFrame(() => {
    const now = performance.now();
    const bulletObject = ref.current!;
    const directionVector = forwardVector
      .clone()
      .applyQuaternion(bulletObject.quaternion);

    bulletObject.position.addVectors(
      bulletData.initPosition,
      directionVector.multiplyScalar(
        (bulletSpeed * (now - bulletData.timestamp)) / 1000
      )
    );

    [...targets.current]
      .filter((target) => target.visible)
      .forEach((target) => {
        const distance = target.position.distanceTo(bulletObject.position);

        if (distance < 1) {
          removeBullet(bulletData.id);
          target.visible = false;
          addScore();

          setTimeout(() => {
            target.visible = true;
            target.position.x = Math.random() * 10 - 5;
            target.position.z = Math.random() * 10 - 5;
          }, 1000);
        }
      });
  });

  return (
    <mesh
      ref={ref}
      geometry={bulletPrototype.geometry}
      material={bulletPrototype.material}
      quaternion={bulletData.initQuaternion}
    ></mesh>
  );
}
