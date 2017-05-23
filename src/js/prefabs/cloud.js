/**
 * Created by z on 2017/5/23.
 */

import * as THREE from 'three';

let createCloud = function (radius, name) {
    let cloudSphere = new THREE.SphereGeometry(radius, 40, 40);
    let cloudMaterial = createClodMaterial();

    let cloudMesh = new THREE.Mesh(cloudSphere, cloudMaterial);

    cloudMesh.name = name;

    return cloudMesh;

    // group.add(cloudMesh);
};

let createClodMaterial = function () {
    let cloudTexture = new THREE.TextureLoader().load('./dist/img/earth_cloud.png');

    let material = new THREE.MeshPhongMaterial();
    material.map = cloudTexture;
    material.transparent = true;
    material.opacity = 1;
    material.blending = THREE.AdditiveBlending;

    return material;
};

module.exports = {
    createCloud: createCloud
};
