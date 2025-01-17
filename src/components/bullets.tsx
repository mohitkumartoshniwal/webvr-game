import { useGlobalContext } from "../context/global-context";
import { Bullet } from "./bullet";

export default function Bullets() {
  const { bullets } = useGlobalContext();
  return (
    <>
      {bullets.map((bulletData) => (
        <Bullet key={bulletData.id} bulletData={bulletData} />
      ))}
    </>
  );
}
