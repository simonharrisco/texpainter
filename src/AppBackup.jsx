import * as React from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import { useLoader } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import { TextureLoader } from "three/src/loaders/TextureLoader";

export function Model(props) {
  const group = React.useRef();
  const { nodes, materials, animations } = useGLTF("/animations.gltf");
  const { actions } = useAnimations(animations, group);

  React.useEffect(() => {
    console.log("props.actionName", props.actionName);

    if (props?.setActions) {
      props.setActions(Object.keys(actions));
    }

    if (props?.actionName && actions?.[props.actionName]) {
      actions?.[props.actionName].reset().fadeIn(0.1).play();
    }
    return () => actions?.[props.actionName]?.fadeOut(0.1);
  }, [actions, props.actionName, props.setActions]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="AuxScene">
        <group position={[0, -58.009, 1.14]}>
          <skinnedMesh
            name="SK_Chr_Kid_Superhero_01"
            geometry={nodes.SK_Chr_Kid_Superhero_01.geometry}
            material={materials.lambert2}
            skeleton={nodes.SK_Chr_Kid_Superhero_01.skeleton}
          />
          <group
            name="Root"
            position={[-6.725, 0.329, 10.934]}
            rotation={[-0.153, -0.096, -0.041]}
          >
            <primitive object={nodes.Pelvis} />
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/animations.gltf");

export default function App() {
  const [actions, setActions] = React.useState(null);

  const [actionToPlay, setActionToPlay] = React.useState(null);

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
        <group scale={[0.1, 0.1, 0.1]}>
          <Model actionName={actionToPlay} setActions={setActions} />
        </group>
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
    </div>
  );
}
