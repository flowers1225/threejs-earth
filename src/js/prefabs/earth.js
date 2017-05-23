/**
 * Created by z on 2017/5/23.
 */

import * as THREE from 'three';

const mapSiz = {
    width: 2048,
    height: 1024
};

let createEarth = function () {
    let sphere = new THREE.SphereGeometry(25, 40, 40);
    let material = createEarthMaterial();

    let earth = new THREE.Mesh(sphere, material);
    earth.name = 'earth';

    return earth;
};

// 创建地球材质
let createEarthMaterial = function () {
    let mapCanvas = document.createElement('canvas');

    let context = mapCanvas.getContext('2d');

    mapCanvas.width = mapSiz.width;

    mapCanvas.height = mapSiz.height;

    let planetTexture = new THREE.Texture(mapCanvas);

    new THREE.TextureLoader().load('./dist/img/earth4.jpg', (texture) => {
        context.drawImage(texture.image, 0, 0);

        planetTexture.needsUpdate = true;
    });

    let bumpTexture = new THREE.TextureLoader().load('./dist/img/earth_bump.jpg');
    let specTexture = new THREE.TextureLoader().load('./dist/img/earth_spec.jpg');

    let material = new THREE.MeshPhongMaterial();
    material.transparent = true;
    material.map = planetTexture;

    material.bumpMap = bumpTexture;
    material.bumpScale = 0.15;

    material.specularMap = specTexture;
    material.specular = new THREE.Color('#909090');

    material.shininess = 5;

    return material;
};

module.exports = {
    createEarth: createEarth
};
