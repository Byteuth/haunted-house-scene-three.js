import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Sky } from "three/addons/objects/Sky.js";
import { Timer } from "three/addons/misc/Timer.js";
import GUI from "lil-gui";

/**
 * Base
 */
// Debug
const gui = new GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

const textureLoader = new THREE.TextureLoader();
const floorAlphaTexture = textureLoader.load("./floor/alpha.webp");
const floorColorTexture = textureLoader.load(
	"./floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_diff_1k.webp"
);
const floorARMTexture = textureLoader.load(
	"./floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_arm_1k.webp"
);
const floorNormalTexture = textureLoader.load(
	"./floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_nor_gl_1k.webp"
);
const floorDisplacementTexture = textureLoader.load(
	"./floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_disp_1k.webp"
);
floorColorTexture.repeat.set(8, 8);
floorColorTexture.colorSpace = THREE.SRGBColorSpace;
floorARMTexture.repeat.set(8, 8);
floorNormalTexture.repeat.set(8, 8);
floorDisplacementTexture.repeat.set(8, 8);

floorColorTexture.wrapS = THREE.RepeatWrapping;
floorARMTexture.wrapS = THREE.RepeatWrapping;
floorNormalTexture.wrapS = THREE.RepeatWrapping;
floorDisplacementTexture.wrapS = THREE.RepeatWrapping;

floorColorTexture.wrapT = THREE.RepeatWrapping;
floorARMTexture.wrapT = THREE.RepeatWrapping;
floorNormalTexture.wrapT = THREE.RepeatWrapping;
floorDisplacementTexture.wrapT = THREE.RepeatWrapping;

const wallColorTexture = textureLoader.load(
	"./wall/castle_brick_broken_06_1k/castle_brick_broken_06_diff_1k.webp"
);
const wallARMTexture = textureLoader.load(
	"./wall/castle_brick_broken_06_1k/castle_brick_broken_06_arm_1k.webp"
);
const wallNormalTexture = textureLoader.load(
	"./wall/castle_brick_broken_06_1k/castle_brick_broken_06_nor_gl_1k.webp"
);
wallColorTexture.colorSpace = THREE.SRGBColorSpace;

const roofColorTexture = textureLoader.load(
	"./roof/roof_slates_02_1k/roof_slates_02_diff_1k.webp"
);
const roofARMTexture = textureLoader.load(
	"./roof/roof_slates_02_1k/roof_slates_02_arm_1k.webp"
);
const roofNormalTexture = textureLoader.load(
	"./roof/roof_slates_02_1k/roof_slates_02_nor_gl_1k.webp"
);
roofColorTexture.colorSpace = THREE.SRGBColorSpace;
roofColorTexture.repeat.set(3, 1);
roofARMTexture.repeat.set(3, 1);
roofNormalTexture.repeat.set(3, 1);
roofColorTexture.wrapt = THREE.RepeatWrapping;
roofARMTexture.wrapS = THREE.RepeatWrapping;
roofNormalTexture.wrapS = THREE.RepeatWrapping;

const bushColorTexture = textureLoader.load(
	"./bush/leaves_forest_ground_1k/leaves_forest_ground_diff_1k.webp"
);
const bushARMTexture = textureLoader.load(
	"./bush/leaves_forest_ground_1k/leaves_forest_ground_arm_1k.webp"
);
const bushNormalTexture = textureLoader.load(
	"./bush/leaves_forest_ground_1k/leaves_forest_ground_nor_gl_1k.webp"
);

bushColorTexture.colorSpace = THREE.SRGBColorSpace;
bushColorTexture.repeat.set(2, 1);
bushARMTexture.repeat.set(2, 1);
bushNormalTexture.repeat.set(2, 1);
bushColorTexture.wrapS = THREE.RepeatWrapping;
bushARMTexture.wrapS = THREE.RepeatWrapping;
bushNormalTexture.wrapS = THREE.RepeatWrapping;

const graveColorTexture = textureLoader.load(
	"./grave/plastered_stone_wall_1k/plastered_stone_wall_diff_1k.webp"
);
const graveARMTexture = textureLoader.load(
	"./grave/plastered_stone_wall_1k/plastered_stone_wall_arm_1k.webp"
);
const graveNormalTexture = textureLoader.load(
	"./grave/plastered_stone_wall_1k/plastered_stone_wall_nor_gl_1k.webp"
);

graveColorTexture.colorSpace = THREE.SRGBColorSpace;
graveColorTexture.repeat.set(0.3, 0.4);
graveARMTexture.repeat.set(0.3, 0.4);
graveNormalTexture.repeat.set(0.3, 0.4);

const doorColorTexture = textureLoader.load("./door/color.webp");
const doorAlphaTexture = textureLoader.load("./door/alpha.webp");
const doorAmbientOcclusionTexture = textureLoader.load(
	"./door/ambientOcclusion.webp"
);
const doorHeightTexture = textureLoader.load("./door/height.webp");
const doorNormalTexture = textureLoader.load("./door/normal.webp");
const doorMetalnessTexture = textureLoader.load("./door/metalness.webp");
const doorRoughnessTexture = textureLoader.load("./door/roughness.webp");

doorColorTexture.colorSpace = THREE.SRGBColorSpace;

//Objects
const floor = new THREE.Mesh(
	new THREE.PlaneGeometry(20, 20, 100, 100),
	new THREE.MeshStandardMaterial({
		alphaMap: floorAlphaTexture,
		transparent: true,
		map: floorColorTexture,
		aoMap: floorARMTexture,
		roughnessMap: floorNormalTexture,
		metalnessMap: floorDisplacementTexture,
		normalMap: floorNormalTexture,
		displacementMap: floorDisplacementTexture,
		displacementScale: 0.3,
		displacementBias: -0.2,
		// wireframe: true
	})
);
floor.rotation.x = -Math.PI * 0.5;
floor.receiveShadow = true;
scene.add(floor);

const house = new THREE.Group();
const walls = new THREE.Mesh(
	new THREE.BoxGeometry(4, 2.5, 4),
	new THREE.MeshStandardMaterial({
		map: wallColorTexture,
		aoMap: wallARMTexture,
		normalMap: wallNormalTexture,
	})
);
walls.receiveShadow = true;
walls.castShadow = true;
walls.position.y = 2.5 / 2;

const roof = new THREE.Mesh(
	new THREE.ConeGeometry(3.5, 1.5, 4),
	new THREE.MeshStandardMaterial({
		map: roofColorTexture,
		aoMap: roofARMTexture,
		normalMap: roofNormalTexture,
	})
);
roof.receiveShadow = true;
roof.castShadow = true;
roof.rotation.y = Math.PI * 0.25;
roof.position.y = 2.5 + 0.75;
scene.add(house);

const door = new THREE.Mesh(
	new THREE.PlaneGeometry(2.2, 2.2, 100, 100),
	new THREE.MeshStandardMaterial({
		map: doorColorTexture,
		alphaMap: doorAlphaTexture,
		aoMap: doorAmbientOcclusionTexture,
		displacementMap: doorHeightTexture,
		displacementScale: 0.25,
		displacementBias: -0.08,
		normalMap: doorNormalTexture,
		roughnessMap: doorRoughnessTexture,
		metalnessMap: doorMetalnessTexture,
		transparent: true,
		// wireframe: true
	})
);
door.position.y = 1;
door.position.z = walls.position.z + 2.01;
gui
	.add(door.material, "displacementScale")
	.min(0)
	.max(1)
	.step(0.0001)
	.name("door displacement scale");
gui
	.add(door.material, "displacementBias")
	.min(-1)
	.max(1)
	.step(0.0001)
	.name("door displacement bias");

const bushGeometry = new THREE.SphereGeometry(1, 16, 16);
const bushMaterial = new THREE.MeshStandardMaterial({
	color: "#ccffcc",
	map: bushColorTexture,
	aoMap: bushARMTexture,
	normalMap: bushNormalTexture,
});

const bushMesh1 = new THREE.Mesh(bushGeometry, bushMaterial);
bushMesh1.position.set(0.8, 0.2, 2.2);
bushMesh1.scale.set(0.5, 0.5, 0.5);

const bushMesh2 = new THREE.Mesh(bushGeometry, bushMaterial);
bushMesh2.position.set(1.4, 0.1, 2.1);
bushMesh2.scale.set(0.25, 0.25, 0.25);

const bushMesh3 = new THREE.Mesh(bushGeometry, bushMaterial);
bushMesh3.position.set(-0.8, 0.1, 2.2);
bushMesh3.scale.set(0.4, 0.4, 0.4);

const bushMesh4 = new THREE.Mesh(bushGeometry, bushMaterial);
bushMesh4.position.set(-1, 0.05, 2.6);
bushMesh4.scale.set(0.15, 0.15, 0.15);

house.add(walls, roof, door);
bushMesh1.rotation.z = Math.PI * 1;
bushMesh1.rotation.x = -(Math.PI * 0.25);
bushMesh2.rotation.z = Math.PI * 1;
bushMesh2.rotation.x = -(Math.PI * 0.25);
bushMesh3.rotation.z = Math.PI * 1;
bushMesh3.rotation.x = -(Math.PI * 0.25);
bushMesh4.rotation.z = Math.PI * 1;
bushMesh4.rotation.x = -(Math.PI * 0.25);

house.add(bushMesh1, bushMesh2, bushMesh3, bushMesh4);

const graves = new THREE.Group();
const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2);
const graveMaterial = new THREE.MeshStandardMaterial({
	map: graveColorTexture,
});
graves.add(new THREE.Mesh(graveGeometry, graveMaterial));
scene.add(graves);

for (let i = 0; i < 50; i++) {
	const grave = new THREE.Mesh(graveGeometry, graveMaterial);
	const angle = Math.random() * Math.PI * 2;
	const radius = 3 + Math.random() * 4;

	const x = Math.sin(angle) * radius;
	const z = Math.cos(angle) * radius;

	grave.position.x = x;
	grave.position.y = Math.random() * 0.4;
	grave.position.z = z;

	grave.rotation.x = (Math.random() - 0.5) * 0.2;
	grave.rotation.y = (Math.random() - 0.5) * 0.4;
	grave.rotation.z = (Math.random() - 0.5) * 0.2;

	graves.add(grave);
}

const sky = new Sky()
sky.material.uniforms['turbidity'].value = 10
sky.material.uniforms['rayleigh'].value = 3
sky.material.uniforms['mieCoefficient'].value = 0.1
sky.material.uniforms['mieDirectionalG'].value = 0.95
sky.material.uniforms['sunPosition'].value.set(0.3, -0.038, -0.95)
sky.scale.set(100, 100, 100)
scene.add(sky)

scene.fog = new THREE.Fog('#02343f', 1, 25)

gui
	.add(floor.material, "displacementScale")
	.min(0)
	.max(1)
	.step(0.0001)
	.name("floor displacement scale");
gui
	.add(floor.material, "displacementBias")
	.min(-1)
	.max(1)
	.step(0.0001)
	.name("floor displacement bias");

// Ambient light
const ambientLight = new THREE.AmbientLight("#8fcdff", 0.275);
scene.add(ambientLight);

// Directional light
const directionalLight = new THREE.DirectionalLight("#8fcdff", 1);
directionalLight.position.set(3, 2, -8);
directionalLight.shadow.mapSize.set(256, 256);
directionalLight.shadow.camera.near = 1;
directionalLight.shadow.camera.far = 20;
directionalLight.shadow.camera.left = -8;
directionalLight.shadow.camera.right = 8;
directionalLight.shadow.camera.top = 8;
directionalLight.shadow.camera.bottom = -8;
directionalLight.castShadow = true;
scene.add(directionalLight);

const directionalLightCameraHelper = new THREE.CameraHelper(
	directionalLight.shadow.camera
);
directionalLightCameraHelper.visible = false;
gui
	.add(directionalLightCameraHelper, "visible")
	.name("directionalLightCameraHelper");
scene.add(directionalLightCameraHelper);

const doorLight = new THREE.PointLight("#ff7d46", 5);
doorLight.position.set(0, 2.2, 2.5);
scene.add(doorLight);

const ghostLight1 = new THREE.PointLight("#8800ff", 6);
const ghostLight2 = new THREE.PointLight("#ff0088", 6);
const ghostLight3 = new THREE.PointLight("#ff0000", 6);
ghostLight1.castShadow = true;
ghostLight2.castShadow = true;
ghostLight3.castShadow = true;
ghostLight1.shadow.mapSize.set(256, 256);
ghostLight2.shadow.mapSize.set(256, 256);
ghostLight3.shadow.mapSize.set(256, 256);
ghostLight1.shadow.camera.far = 10;
ghostLight2.shadow.camera.far = 10;
ghostLight3.shadow.camera.far = 10;
scene.add(ghostLight1, ghostLight2, ghostLight3);

const sizes = {
	width: window.innerWidth,
	height: window.innerHeight,
};

window.addEventListener("resize", () => {
	// Update sizes
	sizes.width = window.innerWidth;
	sizes.height = window.innerHeight;

	// Update camera
	camera.aspect = sizes.width / sizes.height;
	camera.updateProjectionMatrix();

	// Update renderer
	renderer.setSize(sizes.width, sizes.height);
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
	75,
	sizes.width / sizes.height,
	0.1,
	100
);
camera.position.x = 4;
camera.position.y = 2;
camera.position.z = 5;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
	canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

/**
 * Animate
 */
const timer = new Timer();

const tick = () => {
	// Timer
	timer.update();
	const elapsedTime = timer.getElapsed();
	const ghost1Angle = elapsedTime * 0.5;
	ghostLight1.position.x = Math.cos(ghost1Angle) * 4;
	ghostLight1.position.z = Math.sin(ghost1Angle) * 4;
	ghostLight1.position.y =
		Math.sin(ghost1Angle) *
		Math.sin(ghost1Angle * 2.34) *
		Math.sin(ghost1Angle * 3.45);

	const ghost2Angle = -elapsedTime * 0.38;
	ghostLight2.position.x = Math.cos(ghost2Angle) * 5;
	ghostLight2.position.z = Math.sin(ghost2Angle) * 5;
	ghostLight2.position.y =
		Math.sin(ghost2Angle) *
		Math.sin(ghost2Angle * 2.34) *
		Math.sin(ghost2Angle * 3.45);

	const ghost3Angle = elapsedTime * 0.23;
	ghostLight3.position.x = Math.cos(ghost3Angle) * 6;
	ghostLight3.position.z = Math.sin(ghost3Angle) * 6;
	ghostLight3.position.y =
		Math.sin(ghost3Angle) *
		Math.sin(ghost3Angle * 2.34) *
		Math.sin(ghost3Angle * 3.45);

	for (const grave of graves.children) {
		grave.castShadow = true;
		grave.receiveShadow = true;
	}
	// Update controls
	controls.update();

	// Render
	renderer.render(scene, camera);

	// Call tick again on the next frame
	window.requestAnimationFrame(tick);
};

tick();
