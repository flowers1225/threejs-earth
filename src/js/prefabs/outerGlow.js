/**
 * Created by z on 2017/5/23.
 */

import * as THREE from 'three';

let AdditiveBlendShader = {

    uniforms: {

        'tSampler1': {type: 't', value: null},
        'tSampler2': {type: 't', value: null}
    },

    vertexShader: [

        'varying vec2 vUv;',

        'void main() {',

        'vUv = uv;',
        'gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',

        '}'

    ].join('\n'),

    fragmentShader: [

        'uniform sampler2D tSampler1;',
        'uniform sampler2D tSampler2;',

        'varying vec2 vUv;',

        'void main() {',

        'vec4 texture1 = texture2D( tSampler1, vUv );',
        'vec4 texture2 = texture2D( tSampler2, vUv );',
        'gl_FragColor = texture1 + texture2;',

        '}'

    ].join('\n')

};

let vertexShader = [
    'varying vec3 vNormal;',

    'void main() {',

    'vNormal = normalize( normalMatrix * normal );',
    'gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',

    '}'

].join('\n');

let fragmentShader = [
    'uniform float c;',
    'uniform float p;',
    'varying vec3 vNormal;',

    'void main() {',

    'float intensity = pow( c - dot( vNormal, vec3( 0.0, 0.0, 1.0 ) ), p );',
    'gl_FragColor = vec4( 0.2, 0.58, 0.9, 0.3 ) * intensity;',
    '}'

].join('\n');

let createOuterGlow = function () {
    let glowGroup = new THREE.Group();
    glowGroup.name = 'glowGroup';
    // glowGroup.visible = false;

    glowGroup.add(createGlow());
    glowGroup.add(createBlack());

    return glowGroup;
};

let createBlack = function () {
    let sphere = new THREE.SphereGeometry(25, 40, 40);
    let blackMaterial = new THREE.MeshBasicMaterial({color: 0x000000});

    let blackSphere = new THREE.Mesh(sphere, blackMaterial);
    blackSphere.material.transparent = false;
    blackSphere.name = 'blackSphere';

    return blackSphere;
};

let createGlow = function () {
    let sphere = new THREE.SphereGeometry(25, 40, 40);
    let material = createFlowMaterial();

    let glowSphere = new THREE.Mesh(sphere, material);
    glowSphere.material.side = THREE.BackSide;
    glowSphere.material.transparent = false;
    glowSphere.scale.x = glowSphere.scale.y = glowSphere.scale.z = 1.3;
    glowSphere.name = 'glowSphere';

    return glowSphere;
};

let createFlowMaterial = function () {
    let material = new THREE.ShaderMaterial({

        uniforms: {
            'c': {type: 'f', value: 0.44},
            'p': {type: 'f', value: 9.17}
        },
        vertexShader: vertexShader,
        fragmentShader: fragmentShader

    });

    return material;
};

module.exports = {
    createOuterGlow: createOuterGlow,
    AdditiveBlendShader: AdditiveBlendShader
};
