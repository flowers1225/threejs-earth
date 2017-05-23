/**
 * Created by z on 2017/5/23.
 */

import * as THREE from 'three';

let createBg = function () {
    let bgGeometry = new THREE.SphereGeometry(200, 50, 50);

    let material = createBgMaterial();

    let bgMesh = new THREE.Mesh(bgGeometry, material);

    return bgMesh;
};

let createBgMaterial = function () {
    let bgTexture = new THREE.TextureLoader().load('./dist/img/bg_stars.jpg');
    let material = new THREE.MeshBasicMaterial();

    material.map = bgTexture;
    material.side = THREE.BackSide;

    return material;
};

module.exports = {
    createBg: createBg
};
