import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { Object3D, Quaternion, Vector3 } from "three";
import { BulletData } from "../types";

export interface IGlobalContext {
  score: number;
  bullets: BulletData[];
  targets: React.MutableRefObject<Set<Object3D>>;
  addScore: () => void;
  addBullet: (position: Vector3, quaternion: Quaternion) => void;
  removeBullet: (id: BulletData["id"]) => void;
}

export const bulletSpeed = 10;
export const bulletTimeToLive = 2;

const GlobalContext = createContext<IGlobalContext | undefined>(undefined);

export const GlobalProvider = ({ children }: PropsWithChildren) => {
  const [bullets, setBullets] = useState<BulletData[]>([]);
  const [score, setScore] = useState(0);
  const targets = useRef<Set<Object3D>>(new Set());

  const removeBullet = useCallback(
    (id: BulletData["id"]) => {
      const updatedBullets = bullets.filter((bullet) => bullet.id !== id);
      setBullets(updatedBullets);
    },
    [bullets]
  );

  const addBullet = useCallback(
    (position: Vector3, quaternion: Quaternion) => {
      const newBullet = {
        id: Math.random().toString(36).substring(7),
        initPosition: position,
        initQuaternion: quaternion,
        timestamp: performance.now(),
      };
      setBullets((prev) => [...prev, newBullet]);
      setTimeout(() => {
        removeBullet(newBullet.id);
      }, bulletTimeToLive * 1000);
    },
    [removeBullet]
  );

  const addScore = useCallback(() => {
    setScore((prev) => prev + 10);
  }, []);

  const value = useMemo(
    () => ({ bullets, targets, score, addBullet, removeBullet, addScore }),
    [bullets, addBullet, removeBullet, addScore]
  );

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);

  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }

  return context;
};
