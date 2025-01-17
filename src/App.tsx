import { Environment, Gltf, PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { createXRStore, XR } from "@react-three/xr";
import { GlobalProvider } from "./context/global-context";
import { Target } from "./components/target";
import Gun from "./components/gun";
import Bullets from "./components/bullets";
import Score from "./components/score";

const xrStore = createXRStore({
  // emulate: {
  //   controller: {
  //     left: {
  //       position: [-0.15649, 1.43474, -0.38368],
  //       quaternion: [
  //         0.14766305685043335, -0.02471366710960865, -0.0037767395842820406,
  //         0.9887216687202454,
  //       ],
  //     },
  //     right: {
  //       position: [0.15649, 1.43474, -0.38368],
  //       quaternion: [
  //         0.14766305685043335, 0.02471366710960865, -0.0037767395842820406,
  //         0.9887216687202454,
  //       ],
  //     },
  //   },
  // },
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
            position: "fixed",
            width: "100vw",
            height: "100vh",
          }}
        >
          <color args={[0x808080]} attach={"background"}></color>
          <PerspectiveCamera makeDefault position={[0, 1.6, 2]} fov={75} />
          <Environment preset={"warehouse"} />
          <XR store={xrStore} />
          <Gltf src="/spacestation.glb" />
          <Target targetIdx={0} />
          <Target targetIdx={1} />
          <Target targetIdx={2} />
          <Bullets />
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
