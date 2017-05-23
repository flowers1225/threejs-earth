/**
 * Created by z on 2017/5/23.
 */

import * as THREE from 'three';

let gui = new dat.GUI();

document.querySelector('.ac').style.zIndex = 100;

let twoPi = Math.PI * 2;

let sphereData = {
    radius: 5,
    widthSegments: 40,
    heightSegments: 40,
    phiStart: 0,
    phiLength: twoPi,
    thetaStart: 0,
    thetaLength: Math.PI
};

let updateGroupGeometry = function (mesh, geometry) {
    mesh.geometry.dispose();

    mesh.geometry = geometry;
};

let generateGeometry = function (mesh) {
    updateGroupGeometry(mesh,
        new THREE.SphereGeometry(
            sphereData.radius,
            sphereData.widthSegments,
            sphereData.heightSegments,
            sphereData.phiStart,
            sphereData.phiLength,
            sphereData.thetaStart,
            sphereData.thetaLength
        )
    );
};

let addSphereGui = function (mesh) {
    let folder = gui.addFolder('earth');

    folder.add(sphereData, 'radius', 1, 5).onChange(() => {
        generateGeometry(mesh);
    });

    folder.add(sphereData, 'widthSegments', 0, 40).step(1).onChange(() => {
        generateGeometry(mesh);
    });

    folder.add(sphereData, 'heightSegments', 0, 40).step(1).onChange(() => {
        generateGeometry(mesh);
    });

    folder.add(sphereData, 'phiStart', 0, twoPi).onChange(() => {
        generateGeometry(mesh);
    });

    folder.add(sphereData, 'phiLength', 0, twoPi).onChange(() => {
        generateGeometry(mesh);
    });

    folder.add(sphereData, 'thetaStart', 0, twoPi).onChange(() => {
        generateGeometry(mesh);
    });

    folder.add(sphereData, 'thetaLength', 0, twoPi / 2).onChange(() => {
        generateGeometry(mesh);
    });
};

let handleColorChange = function (color) {
    return function (value) {
        if (typeof value === 'string') {
            value = value.replace('#', '0x');
        };

        color.setHex(value);
    };
};

let addLightGui = function (name, light) {
    let lightData = {};

    lightData.color = light.color.getHex();
    lightData.x = light.position.x;
    lightData.y = light.position.y;
    lightData.z = light.position.z;
    lightData.intensity = light.intensity || 1;

    let folder = gui.addFolder(name);

    folder.addColor(lightData, 'color').onChange((val) => {
        handleColorChange(light.color)(val);
    });

    folder.add(lightData, 'x', -100, 100).step(1).onChange((val) => {
        light.position.x = val;
    });

    folder.add(lightData, 'y', -100, 100).step(1).onChange((val) => {
        light.position.y = val;
    });

    folder.add(lightData, 'z', -100, 100).step(1).onChange((val) => {
        light.position.z = val;
    });

    folder.add(lightData, 'intensity', 0, 2).step(0.1).onChange((val) => {
        light.intensity = val;
    });

    if (name === 'spotLight') {
        lightData.angle = light.angle;
        lightData.penumbra = light.penumbra;
        lightData.distance = light.distance;
        lightData.decay = light.decay;

        folder.add(lightData, 'angle', 0, Math.PI / 3).step(0.1).onChange((val) => {
            light.angle = val;
        });

        folder.add(lightData, 'penumbra', 0, 5).step(0.1).onChange((val) => {
            light.penumbra = val;
        });

        folder.add(lightData, 'distance', 0, 300).step(1).onChange((val) => {
            light.distance = val;
        });

        folder.add(lightData, 'decay', 0, 2).step(0.1).onChange((val) => {
            light.decay = val;
        });
    }
};

let addDotGui = function (dot) {
    let dotData = {};

    dotData.x = dot.vertices[0].x;
    dotData.y = dot.vertices[0].y;
    dotData.z = dot.vertices[0].z;

    let folder = gui.addFolder('points');

    folder.add(dotData, 'x', -10, 10).step(0.001).onChange((val) => {
        dot.vertices[0].x = val;
        dot.verticesNeedUpdate = true;
    });

    folder.add(dotData, 'y', -10, 10).step(0.001).onChange((val) => {
        dot.vertices[0].y = val;
        dot.verticesNeedUpdate = true;
    });

    folder.add(dotData, 'z', -10, 10).step(0.001).onChange((val) => {
        dot.vertices[0].z = val;
        dot.verticesNeedUpdate = true;
    });
};

let addGlowGui = function (material) {
    let parameters = {};

    parameters.c = material.uniforms.c.value;
    parameters.p = material.uniforms.p.value;

    let folder = gui.addFolder('glow');

    folder.add(parameters, 'c').min(0.0).max(1).step(0.01).onChange((val) => {
        material.uniforms.c.value = val;
    });

    folder.add(parameters, 'p').min(0.0).max(15.0).step(0.01).onChange((val) => {
        material.uniforms.p.value = val;
    });
};

module.exports = {
    addSphereGui: addSphereGui,
    addLightGui: addLightGui,
    addDotGui: addDotGui,
    addGlowGui: addGlowGui
};
