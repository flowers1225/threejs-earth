import { useRef, useEffect } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'

import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { Color, Mesh } from 'three'

import GlowMesh from './glow-mesh'

const Earth = function (props: any) {
  const earthMesh = useRef<Mesh>(null)

  useEffect(() => {
    // ..
  }, [])

  useFrame((state, delta) => {
    // earthMesh.current.rotation.y += 0.01
  })

  const [textureMap, textureBumpMap, textureSpecMap] = useLoader(
    TextureLoader,
    [
      `${process.env.PUBLIC_URL}/assets/earth.jpg`,
      `${process.env.PUBLIC_URL}/assets/earth_bump.jpg`,
      `${process.env.PUBLIC_URL}/assets/earth_spec.jpg`,
    ]
  )

  return (
    <mesh {...props} ref={earthMesh}>
      <sphereGeometry args={[5, 40, 40]}></sphereGeometry>
      <meshPhongMaterial
        transparent
        map={textureMap}
        bumpMap={textureBumpMap}
        bumpScale={0.15}
        specularMap={textureSpecMap}
        specular={new Color('#909090')}
        shininess={5}
        attach={'material'}
      ></meshPhongMaterial>
      <GlowMesh scale={[1.2, 1.2, 1.2]}></GlowMesh>
    </mesh>
  )
}

export default Earth
