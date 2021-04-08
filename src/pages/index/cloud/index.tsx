import { useRef, useEffect } from 'react'
import { useLoader } from '@react-three/fiber'

import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { AdditiveBlending, Mesh } from 'three'

const Cloud = function (props: any) {
  const cloudRef = useRef<Mesh>(null)

  useEffect(() => {
    // ..
  }, [])

  const textureMap = useLoader(
    TextureLoader,
    `${process.env.PUBLIC_URL}/assets/earth_cloud.png`
  )
  return (
    <mesh {...props} ref={cloudRef}>
      <sphereGeometry args={[5.1, 40, 40]}></sphereGeometry>
      <meshPhongMaterial
        map={textureMap}
        transparent
        opacity={1}
        blending={AdditiveBlending}
      ></meshPhongMaterial>
    </mesh>
  )
}

export default Cloud
