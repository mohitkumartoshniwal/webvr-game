/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useEffect, useMemo } from "react";

// import { Object3D } from "three";
import { useGLTF } from "@react-three/drei";
import { useGlobalContext } from "../context/global-context";

// export const targets = new Set<Object3D>();

type TargetProps = {
  targetIdx: number;
};
export const Target = ({ targetIdx }: TargetProps) => {
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
};
