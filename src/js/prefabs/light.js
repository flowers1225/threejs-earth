/**
 * Created by z on 2017/5/23.
 */

import * as THREE from 'three';

// 创建全局光源
let createAmbient = function () {
    // let ambientLight = new THREE.AmbientLight(0x111111, 1);
    let ambientLight = new THREE.AmbientLight(0x393939, 0.5);
    ambientLight.name = 'ambient';

    return ambientLight;
};

// 创建平行光源
let createDirectional = function () {
    let directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.x = 0;
    directionalLight.position.y = 0;
    directionalLight.position.z = -500;
    directionalLight.intensity = 1;
    // directionalLight
    directionalLight.name = 'directional';
    // scene.add(directionalLight);

    return directionalLight;
};

let createSpot = function () {
    let spotLight = new THREE.SpotLight(0xffffff);

    spotLight.intensity = 1.2;
    spotLight.position.x = -46;
    spotLight.position.y = 35;
    spotLight.position.z = -44;
    spotLight.angle = 0.3;
    spotLight.castShadow = false;
    spotLight.penumbra = 0.4;
    spotLight.distance = 124;
    spotLight.decay = 1;
    spotLight.shadow.camera.near = 50;
    spotLight.shadow.camera.far = 200;
    spotLight.shadow.camera.fov = 35;
    spotLight.shadow.mapSize.height = 1024;
    spotLight.shadow.mapSize.width = 1024;

    spotLight.name = 'spotLight';

    return spotLight;
};

module.exports = {
    createAmbient: createAmbient,
    createDirectional: createDirectional,
    createSpot: createSpot
};
