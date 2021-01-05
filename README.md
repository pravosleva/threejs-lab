# Three.js Lab

## Roadmap
- [Additional typings](#typings)
  - [dat.gui](#dat.gui)
  - [tween.js](#tween.js)
- [three.interaction](#three.interaction)

## typings
### dat.gui
Step 1: See `src/typings/dat.gui/index.d.ts`

Step 2: See `src/client/space.ts`
```js
import { GUI } from '/jsm/libs/dat.gui.module'
// etc.
```

### tween.js
Step 1: See `src/typings/tween.js/index.d.ts`

Step 2: See `src/client/space.ts`
```js
import { TWEEN } from '/jsm/libs/tween.module.min'
// etc.
```

## three.interaction
Step 1: `dist/client/legacy/three.interaction@0.2.3.modified.js`
```js
import { EventDispatcher, Object3D, Raycaster, Vector2 } from "/build/three.module.js"
// etc.
```
Step 2: `src/server/server.ts`
```js
app.use(express.static(path.join(__dirname, '../client')))
```
Step 3: `src/client/space.ts`
```ts
// @ts-ignore
import { Interaction } from '/legacy/three.interaction@0.2.3.modified.js';

// etc.

type TEvent = 'click' | 'mouseover' | 'mouseout'
interface IInteractionMeshProps {
  cursor: string
  on: (evType: TEvent, cb: (ev: any) => void) => void
}
type TColor = 'red' | 'green'
const getColor = (name: TColor) => {
  switch(name) {
    case 'red': return { isColor: true, r: 1, g: 0, b: 0 }
    case 'green':
    default: return { isColor: true, r: 0, g: 1, b: 0 }
  }
}
const handleSetColor = (name: TColor) => (ev: THREE.Event) => {
  ev.data.target.material.color = getColor(name)
}
const handleCubeClick = function(ev: THREE.Event) {
  console.log(ev.data.target.name)
  // ev.data.target.material.color = 'red'
}

// In class:

// @ts-ignore
const interaction = new Interaction(this.renderer, this.scene, this.camera);
this.cube = (new THREE.Mesh(geometry, material))
// new a interaction, then you can add interaction-event with your free style

this.scene.add(this.cube)
this.cube.name = 'THE CUBE'
this.cube.cursor = 'pointer'
this.cube.on('click', handleCubeClick);
this.cube.on('mouseover', handleSetColor('red'));
this.cube.on('mouseout', handleSetColor('green'));
```
