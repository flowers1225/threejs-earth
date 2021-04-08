import { ShaderMaterial } from 'three'
import { extend } from '@react-three/fiber'

class GlowShaderMaterial extends ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        c: {
          value: undefined,
        },
        p: {
          value: undefined,
        },
        glowColor: {
          value: null,
        },
      },
      //@: https://github.com/chrisrzhou/three-glow-mesh
      vertexShader: `
        varying vec3 vWordPos;
        varying vec3 vNormal;
        void main () {

          vNormal = normalize(normalMatrix * normal);
          vWordPos = (modelMatrix * vec4(position, 1.0)).xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }
      `,
      fragmentShader: `
        uniform vec3 glowColor;
        uniform float c;
        uniform float p;
        varying vec3 vWordPos;
        varying vec3 vNormal;

        void main () {
          vec3 wCameraToVertex = vWordPos - cameraPosition;
          vec3 viewCameraTovertex = (viewMatrix * vec4(wCameraToVertex, 0.0)).xyz;
          viewCameraTovertex = normalize(viewCameraTovertex);

          float intensity = pow(c + dot(vNormal, viewCameraTovertex), p);

          gl_FragColor = vec4(glowColor, intensity);
        }
      `,
    })
  }
  get c() {
    return this.uniforms.c.value
  }
  set c(val) {
    this.uniforms.c.value = val;
  }
  get p() {
    return this.uniforms.p.value
  }
  set p(val) {
    this.uniforms.p.value = val;
  }
  get glowColor() {
    return this.uniforms.glowColor.value
  }
  set glowColor(val) {
    this.uniforms.glowColor.value = val;
  }
}

extend({ GlowShaderMaterial })