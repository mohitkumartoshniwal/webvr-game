import { useGLTF } from "@react-three/drei";
import { useGlobalContext } from "../context/global-context";
import { useEffect, useMemo } from "react";

type TargetProps = {
  targetIdx: number;
};

export default function Target({ targetIdx }: TargetProps) {
  const { targets } = useGlobalContext();
  const { scene } = useGLTF("/target.glb");

  const target = useMemo(() => scene.clone(), []);

  useEffect(() => {
    target.position.set(
      Math.random() * 10 - 5,
      targetIdx * 2 + 1,
      -Math.random() * 5 - 5
    );
    targets.current.add(target);
  }, []);

  return <primitive object={target} />;
}
