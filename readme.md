# Three.js Haunted House Scene

This scene creates an eerie haunted house environment using **Three.js**, highlighting the use of textures, materials, and lighting to craft a spooky atmosphere. The project focuses on the application of various maps and lights to enhance realism and performance.

**DEMO:** [haunted-house-scene-three-js.vercel.app](https://haunted-house-scene-three-js.vercel.app/)

## Textures and Materials

In this scene, multiple texture maps are utilized to add depth and realism to the environment:

- **Color Maps:** Define the base color for each surface.
- **Ambient Occlusion Maps:** Enhance the appearance of shadows and depth.
- **Normal Maps:** Add the illusion of surface detail and bumpiness.
- **Alpha Maps:** Control transparency for materials like the floor and door.
- **Displacement Maps:** Modify the geometry's surface to create realistic height variations.

### Surfaces

Different surfaces like the floor, walls, roof, bushes, and graves utilize these maps to create detailed effects:

- **Floor:** Uses sand and rock textures with displacement for a rough terrain.
- **Walls:** Brick textures provide a weathered, aged look.
- **Roof:** Slates give the roof an old, worn appearance.
- **Bushes and Graves:** Feature detailed textures to enhance the haunted feel.

### Sky and Fog

- **Sky Material:** A custom sky material with tunable properties like turbidity and sun position creates a gloomy atmosphere.
- **Fog:** Adds depth and mystery by gradually obscuring distant objects.

## Ghost Lights and Shadows

Three ghosts are represented as animated **PointLights** with varying colors, casting dynamic shadows across the scene. These lights interact with the environment, creating eerie effects:

- **Ghost Light 1:** Purple light that moves in a circular pattern.
- **Ghost Light 2:** Pink light with a slower, random motion.
- **Ghost Light 3:** Red light that hovers and shifts mysteriously.

### Shadows

Each ghost light casts shadows that change as they move, enhancing the haunted house's ominous atmosphere.

## Performance Optimization

To ensure smooth performance, all textures are in **WebP format**, which reduces file size without sacrificing quality. This optimization is crucial for maintaining high rendering performance in real-time.


## Screenshot

*A preview of the haunted house setup, featuring the eerie lighting and detailed textures.*

<img src="https://github.com/user-attachments/assets/aef43e32-a3d7-43ac-bdce-af2834ccca37">

