import Experience from "./experience/Experience";

const experience = new Experience(document.querySelector("canvas.webgl"));
let counter = 0;
let numberOfSkins = 15;

// create button

for (let i = 0; i < numberOfSkins; i++) {
  const button = document.createElement("button");
  button.innerText = i;
  button.style.position = "absolute";
  button.style.top = i * 20 + "px";
  button.style.right = "20px";
  document.body.appendChild(button);

  button.addEventListener("click", () => {
    if (experience?.world?.avatar?.changeAvatar) {
      experience.world.avatar.changeAvatar(i);
    }
  });
}

setInterval(() => {
  if (experience?.world?.avatar?.changeAvatar) {
    experience.world.avatar.changeAvatar(counter % (numberOfSkins - 1));
  }
  counter++;
}, 700);
