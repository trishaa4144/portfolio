import './style.css';
import * as THREE from 'three';

// Setup scene, camera, renderer

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

// Torus
const geometry = new THREE.TorusGeometry(10, 3, 15, 100);
const material = new THREE.MeshStandardMaterial({ color: 0x8d5aad });
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);


function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xfa98b6 });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

// Background

const forestTexture = new THREE.TextureLoader().load('assets/forest.png');
scene.background = forestTexture;

// Avatar

const frogTexture = new THREE.TextureLoader().load('assets/frog.jpg');

const frog = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 1), new THREE.MeshBasicMaterial({ map: frogTexture }, {side: THREE.DoubleSide}), new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('canvas.jpeg')}));

scene.add(frog);

// Art2

const artTexture = new THREE.TextureLoader().load('assets/art.jpeg');

const art = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 1), new THREE.MeshBasicMaterial({ map: artTexture }));
scene.add(art);

art.position.z = 30;
art.position.x = -10;
frog.position.z = -5;
frog.position.x = 2;

// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  art.rotation.y += 0.01;
  art.rotation.z += 0.01;
  frog.rotation.y += 0.01;
  frog.rotation.z += 0.01;
  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop

function animate() {
  requestAnimationFrame(animate);
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;
  renderer.render(scene, camera);
}

animate();