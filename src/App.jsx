import * as React from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import { useLoader } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import { TextureLoader } from "three/src/loaders/TextureLoader";

import { Model } from "./meshes/Animations";

export default function App() {
  const [actions, setActions] = React.useState(null);

  const [actionToPlay, setActionToPlay] = React.useState(null);

  const [showModel, setShowModel] = React.useState(false);

  React.useEffect(() => {
    console.log(actions);
  }, [actions]);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "absolute",
        top: 0,
        left: 0,
        backgroundColor: "black",
      }}
    >
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        {/* cube */}
        {showModel && (
          <group scale={[0.1, 0.1, 0.1]}>
            <Model actionName={actionToPlay} setActions={setActions} />
          </group>
        )}
        <OrbitControls />
      </Canvas>
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          color: "white",
        }}
      >
        <>
          {actions &&
            actions.map((action) => (
              <button
                onClick={() => {
                  setActionToPlay(action);
                }}
              >
                {action}
              </button>
            ))}
        </>
      </div>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          color: "white",
        }}
      >
        <button
          onClick={() => {
            setShowModel(!showModel);
          }}
        >
          {showModel ? "Hide Model" : "Show Model"}
        </button>
      </div>
    </div>
  );
}
