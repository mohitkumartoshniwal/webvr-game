import { Canvas } from "@react-three/fiber";
import { GlobalProvider } from "./context/global-context";
import { Environment, Gltf, PerspectiveCamera } from "@react-three/drei";
import { createXRStore, XR } from "@react-three/xr";
import Gun from "./components/gun";
import Bullets from "./components/bullets";
import Target from "./components/target";
import Score from "./components/score";

const xrStore = createXRStore({
  controller: {
    right: Gun,
  },
});

export default function App() {
  return (
    <GlobalProvider>
      <>
        <Canvas
          style={{
            width: "100vw",
            height: "100vh",
            position: "fixed",
          }}
        >
          <color args={[0x808080]} attach={"background"} />
          <PerspectiveCamera makeDefault position={[0, 1.6, 2]} fov={75} />
          <Environment preset="warehouse" />
          <Gltf src="/spacestation.glb" />
          <XR store={xrStore} />
          <Bullets />
          <Target targetIdx={0} />
          <Target targetIdx={1} />
          <Target targetIdx={2} />
          <Score />
        </Canvas>
        <div
          style={{
            position: "fixed",
            display: "flex",
            width: "100vw",
            height: "100vh",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            color: "white",
          }}
        >
          <button
            style={{
              position: "fixed",
              bottom: "20px",
              left: "50%",
              transform: "translateX(-50%)",
              fontSize: "20px",
            }}
            onClick={() => {
              xrStore.enterVR();
            }}
          >
            Enter VR
          </button>
        </div>
      </>
    </GlobalProvider>
  );
}
