/**
 * Created by z on 2017/5/23.
 */

import * as THREE from 'three';

import 'TrackballControls';

import 'EffectComposer';

import 'RenderPass';

import 'ShaderPass';

import 'MaskPass';

import 'CopyShader';

import {createEarth} from '../prefabs/earth';

import {createCloud} from '../prefabs/cloud';

import {createAmbient, createSpot} from '../prefabs/light';

import {createOuterGlow, AdditiveBlendShader} from '../prefabs/outerGlow';

import {createBg} from '../prefabs/createBg';

import {createPoints} from '../prefabs/points';

class SceneView {
    constructor (el) {
        this.$el = el;

        this.rotAuto = true;

        this.rotSpeed = 0.001;

        this.isStart = false;

        this.init();
    }

    init () {
        this.width = window.innerWidth;
        this.height = window.innerHeight;

        this.scene = new THREE.Scene();

        this.camera = new THREE.PerspectiveCamera(40, this.width / this.height, 0.1, 1000);
        this.camera.position.x = 3.55;
        this.camera.position.z = -128;
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));

        this.renderer = new THREE.WebGLRenderer({antialias: true, alpha: true, preserveDrawingBuffer: true});
        this.renderer.setSize(this.width, this.height);
        this.renderer.autoClear = true;
        this.renderer.setClearColor(0x000000, 1);
        this.renderer.setPixelRatio(window.devicePixelRatio);

        this.controls = new THREE.TrackballControls(this.camera);
        this.controls.rotateSpeed = 0.3;
        this.controls.autoRotate = false;
        this.controls.noZoom = true;
        this.controls.noPan = true;
        this.controls.enabled = true;

        this.scene.add(createBg());

        this.group = new THREE.Group();

        this.scene.add(this.group);

        this.$el.append(this.renderer.domElement);

        this.earth = createEarth();
        this.cloud1 = createCloud(25.3, 'cloud1');
        this.cloud2 = createCloud(25.6, 'cloud2');
        this.cloud2.rotation.y = Math.PI;

        this.group.add(this.earth);
        this.group.add(this.cloud1);
        this.group.add(this.cloud2);

        this.scene.add(createAmbient());

        this.spotLight = createSpot();
        this.camera.add(this.spotLight);
        this.scene.add(this.camera);

        this.createOuterFlow();

        this.animate();

        this.createDot();
    }

    createDot () {
        let coordinate = this.latLongToCoordinate(61.6898722005, 116.1914062500, 25);

        let latLong = this.coordinateToLatLong(coordinate, 25);

        console.log(`lat: ${latLong.lat}, long: ${latLong.long}`);

        console.log(coordinate);

        this.scene.add(createPoints(coordinate, 'point'));
    }

    latLongToCoordinate (lat, long, radius) {
        // let lat = -14;  // 纬度
        // let long = -58; // 经度
        let phi = (90 - lat) * (Math.PI / 180);
        let theta = (long + 180) * (Math.PI / 180);
        let y = radius * Math.cos(phi);
        let temp = radius * Math.sin(phi);
        let x = -temp * Math.cos(theta);
        let z = temp * Math.sin(theta);

        return {
            x: x,
            y: y,
            z: z
        };
    }

    coordinateToLatLong (coordinate, radius) {
        let lat = 90 - (Math.acos(coordinate.y / radius)) * 180 / Math.PI;
        let long = ((270 + (Math.atan2(coordinate.x, coordinate.z)) * 180 / Math.PI) % 360);

        return {
            lat: lat,
            long: long
        };
    }

    render () {
        if (this.isStart) {
            this.blurComposer.render();
            this.sceneComposer.render();
        } else {
            this.renderer.render(this.scene, this.camera);
            this.isStart = true;
        }
    }

    animate () {
        if (this.controls) {
            this.controls.update();
        }

        this.cloud1.rotation.y -= this.rotSpeed / 4;
        this.cloud2.rotation.y -= this.rotSpeed / 4;

        if (this.rotAuto) {
            this.rotAutoHandler();
        }

        this.render();

        requestAnimationFrame(() => {
            this.animate();
        });
    }

    // 外发光
    createOuterFlow () {
        this.blurScene = new THREE.Scene();

        this.glowGroup = createOuterGlow();

        this.blurScene.add(this.glowGroup);

        let renderTargetParameters = {
            minFilter: THREE.LinearFilter,
            magFilter: THREE.LinearFilter,
            format: THREE.RGBAFormat,
            stencilBuffer: true
        };

        let blurRenderTarget = new THREE.WebGLRenderTarget(this.width, this.height, renderTargetParameters);

        let blurRenderPass = new THREE.RenderPass(this.blurScene, this.camera);

        let sceneRenderPass = new THREE.RenderPass(this.scene, this.camera);

        this.blurComposer = new THREE.EffectComposer(this.renderer, blurRenderTarget);

        this.blurComposer.addPass(blurRenderPass);

        this.sceneComposer = new THREE.EffectComposer(this.renderer, blurRenderTarget);

        this.sceneComposer.addPass(sceneRenderPass);

        let effectBlend = new THREE.ShaderPass(AdditiveBlendShader, 'tSampler1');

        effectBlend.uniforms['tSampler2'].value = this.blurComposer.renderTarget2.texture;

        effectBlend.renderToScreen = true;

        this.sceneComposer.addPass(effectBlend);
    }

    // 自动旋转
    rotAutoHandler () {
        this.camera.position.x = this.camera.position.x * Math.cos(this.rotSpeed) -
            this.camera.position.z * Math.sin(this.rotSpeed);

        this.camera.position.z = this.camera.position.z * Math.cos(this.rotSpeed) +
            this.camera.position.x * Math.sin(this.rotSpeed);
    }

    resize () {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.camera.aspect = this.width / this.height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.width, this.height);
        this.renderer.setPixelRatio(window.devicePixelRatio);
    }
}

module.exports = SceneView;
