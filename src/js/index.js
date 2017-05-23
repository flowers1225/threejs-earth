/**
 * Created by z on 2017/5/23.
 */

import SceneView from './states/SceneView';

let sceneView = new SceneView(document.querySelector('.ns-webgl-page'));

window.addEventListener('resize', sceneView.resize.bind(sceneView), false);
