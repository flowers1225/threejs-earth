/**
 * Created by z on 2017/5/23.
 */
import * as THREE from 'three';

let createPoints = function (pos, name) {
    let imgGeometry = new THREE.Geometry();
    let gVertices = new THREE.Vector3(pos.x, pos.y, pos.z);
    imgGeometry.vertices.push(gVertices);

    let pointsMaterial = createPointsMaterial(name);

    let points = new THREE.Points(imgGeometry, pointsMaterial);
    points.name = name;

    return points;
};

let createPointsMaterial = function () {
    let material = new THREE.PointsMaterial({ color: 0xff0000, size: 1 });

    return material;
};

module.exports = {
    createPoints: createPoints
};
