import Experience from "./experience/Experience";

const experience = new Experience(
  document.querySelector("canvas.webgl"),
  document.querySelector("#tex-canvas")
);

// create upload box

let uploadBox = document.createElement("input");
uploadBox.type = "file";
uploadBox.accept = ".glb, .gltf";

uploadBox.addEventListener("change", (e) => {
  // get the file as a gltf
  let file = e.target.files[0];

  const url = typeof rootFile === "string" ? file : URL.createObjectURL(file);
  experience.resources.loadGLTF(url, (gltf) => {
    experience.world.addModelView(gltf);
  });
});

document.querySelector(".upload-holder").appendChild(uploadBox);
