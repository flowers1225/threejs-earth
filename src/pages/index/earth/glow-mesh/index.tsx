import { useRef } from 'react'
import { Color, AdditiveBlending, BackSide } from 'three'

import { folder, useControls } from 'leva'

import '../../glow-shader-material/shader-material'

const GlowMesh = function (props: any) {
  const glowRef = useRef<any>(null)

  const { pVal, cVal, color } = useControls({
    glow: folder({
      pVal: { value: 8.4, max: 10, min: 0 },
      cVal: { value: 0.35, max: 2, min: 0 },
      color: { value: '#1e296f' },
    }),
  })

  return (
    <mesh ref={glowRef} {...props}>
      <sphereGeometry args={[5, 40, 40]}></sphereGeometry>
      {/*@ts-ignore */}
      <glowShaderMaterial
        attach="material"
        c={cVal}
        p={pVal}
        glowColor={new Color(color)}
        transparent={true}
        depthWrite={false}
        blending={AdditiveBlending}
        side={BackSide}
      />
    </mesh>
  )
}

export default GlowMesh
