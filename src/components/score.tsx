import { PositionalAudio, Text } from "@react-three/drei";
import { useGlobalContext } from "../context/global-context";
import { useEffect, useRef } from "react";
import { PositionalAudio as PAudio } from "three";

function formatScoreText(score: number) {
  return score.toString().padStart(4, "0");
}
export default function Score() {
  const { score } = useGlobalContext();
  const soundRef = useRef<PAudio>(null);

  useEffect(() => {
    if (score > 0) {
      const scoreSound = soundRef.current!;
      if (scoreSound.isPlaying) scoreSound.stop();
      scoreSound.play();
    }
  }, [score]);

  return (
    <Text
      color={0xffa276}
      font="assets/SpaceMono-Bold.ttf"
      fontSize={0.52}
      anchorX="center"
      anchorY="middle"
      position={[0, 0.67, -1.44]}
      quaternion={[-0.4582265217274104, 0, 0, 0.8888354486549235]}
    >
      {formatScoreText(score)}
      <PositionalAudio ref={soundRef} url="assets/score.ogg" loop={false} />
    </Text>
  );
}
