import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import typefaceFont from 'three/examples/fonts/helvetiker_regular.typeface.json'
import * as TWEEN from 'tween.js';

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const matcapTexture = textureLoader.load('textures/matcaps/2.png')
const matcapTexturee = textureLoader.load('textures/matcaps/8.png')
const matcapTexture3 = textureLoader.load('textures/matcaps/6.png')

/**
 * Fonts
 */
const fontLoader = new FontLoader()

fontLoader.load(
    '/fonts/helvetiker_regular.typeface.json',
    (font) =>
    {
        // Material
        const material = new THREE.MeshMatcapMaterial({ color: '0xe9c512', matcap: matcapTexture})//matcap: matcapTexture })

        // Text
        const textGeometry = new TextGeometry(
            // رمضان كريم             'ميرك ناضمر',

            ' Ramadan ',
            {
                font: font,
                size: 1.1,
                height: 0.2,
                curveSegments: 12,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 0
            }
        )
        textGeometry.center()

        const text = new THREE.Mesh(textGeometry, material)
        scene.add(text)
    })
fontLoader.load(
    '/fonts/helvetiker_regular.typeface.json',
    (font) =>
    {
        // Material
        const materialll = new THREE.MeshMatcapMaterial({ color: '0xe9c512', matcap: matcapTexturee})//matcap: matcapTexture })

        // Text
        const textGeometryy = new TextGeometry(
            // رمضان كريم             'ميرك ناضمر',

            ' Kareem',
            {
                font: font,
                size: 1.1,
                height: 0.2,
                curveSegments: 12,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 0
            }
        )
        textGeometryy.center() 
        
        const textt = new THREE.Mesh(textGeometryy, materialll)
        textt.position.x = 6.5
        scene.add(textt)
})
        //Name text 
       fontLoader.load(
    '/fonts/helvetiker_regular.typeface.json',
    (font) =>
    {
        // Material
        const material3 = new THREE.MeshMatcapMaterial({ color: '0xe9c512', matcap: matcapTexture3})//matcap: matcapTexture })

        // Text 
        const textGeometry3 = new TextGeometry(

            ' from Shams',
            {
                font: font,
                size: 0.3,
                height: 0.001,
                curveSegments: 10,
                bevelEnabled: true,
                bevelThickness: 0.02,
                bevelSize: 0.01,
                bevelOffset: 0,
                bevelSegments: 0
            }
        )
        textGeometry3.center() 
        
        const text3 = new THREE.Mesh(textGeometry3, material3)
        text3.position.set(3, -1.99, 0)
        scene.add(text3)

       //crescent moon
        const radius = 10;
        const segments = 30;
        const geometryy = new THREE.SphereGeometry( radius, segments );
        const textureLoader = new THREE.TextureLoader();
        const texture = textureLoader.load( 'textures/matcaps/moon.webp' );
        const materiall = new THREE.MeshStandardMaterial( { map: texture, 
        color: '0x3e3c39', // تعيين لون المادة
        
        transparent: true, // جعل المواد شفافة
       opacity: 1, // تحديد درجة الشفافية

 } )

    //   materiall.ambient = new THREE.Color('white');
      const meshMoon = new THREE.Mesh( geometryy, materiall );
        meshMoon.rotation.x = -2
        meshMoon.position.set(-15,-1.5, -15)
      scene.add(meshMoon)

    // Define the points of the star shape
    const starShape = new THREE.Shape();
    starShape.moveTo(0, 20);
    starShape.lineTo(5, 5);
    starShape.lineTo(20, 5);
    starShape.lineTo(7.5, -2.5);
    starShape.lineTo(12.5, -20);
    starShape.lineTo(0, -9);
    starShape.lineTo(-12.5, -20);
    starShape.lineTo(-7.5, -2.5);
    starShape.lineTo(-20, 5);
    starShape.lineTo(-5, 5);
    starShape.closePath();

    // Create a base material for the stars
    const starMaterial = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.5,
    });

// Create an array to hold all the star meshes
const stars = [];

// Create multiple star meshes and add them to the scene
for (let i = 0; i < 50; i++) {
  const starGeometry = new THREE.ShapeGeometry(starShape);
  const starMesh = new THREE.Mesh(starGeometry, starMaterial);
  starMesh.scale.set(Math.random() * 0.05 + 0.01, Math.random() * 0.05 + 0.01, Math.random() * 0.05 + 0.01);
  starMesh.position.set(Math.random() * 100 - 50, 50, Math.random() * 100 - 50);
  scene.add(starMesh);
  stars.push(starMesh);

  // Animate each star mesh
  const duration = Math.random() * 6000 + 8000;
  const targetY = -50;
  const targetColor = Math.floor(i % 2) === 0 ? 0xffffff : 0xffff00;
  new TWEEN.Tween(starMesh.position)
    .to({ y: targetY }, duration)
    .repeat(Infinity)
    .onComplete(() => {
      starMesh.position.y = 50;
    })
    .start();
  new TWEEN.Tween(starMaterial.color)
    .to({ r: ((targetColor >> 16) & 255) / 255, g: ((targetColor >> 8) & 255) / 255, b: (targetColor & 255) / 255 }, duration)
    .repeat(Infinity)
    .yoyo(true)
    .start();
}

// Animate the stars by updating Tween.js in each frame
function animateStars() {
  requestAnimationFrame(animateStars);

  TWEEN.update();
}
animateStars();

    }
)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = -1
camera.position.y = 0.99
camera.position.z = 10
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
//renderer.shadowMap.enabled = true;
/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()

// إضافة المصدر الضوئي للإضاءة والظلال

const light = new THREE.PointLight( 0xffffff, 95 , 50 );
light.position.set( -54.99, -21, 0.99  ); // تعيين موقع المصدر الضوئي على الجانب الأيسر
scene.add( light );
const light2 = new THREE.PointLight( 0xffffff, 10, 10 );
light2.position.set( 0,0, 0 ); // تعيين موقع المصدر الضوئي في المنتصف
scene.add( light2 );
// إضافة المصدر الضوئي للإضاءة والظلال

light.castShadow = true;
light.shadow.mapSize.width = 512; 
light.shadow.mapSize.height = 512;
light.shadow.camera.near = 0.5; 
light.shadow.camera.far = 500; 
light.shadow.bias = -0.001;

// تمكين خاصية الظلال في Renderer
renderer.shadowMap.enabled = true;


