import { useRef } from 'react'
import { extend, useThree } from '@react-three/fiber'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

extend({ OrbitControls })

const Controls = function (props: any) {
  const controls = useRef<OrbitControls>(null)
  const { camera, gl } = useThree()
  // useFrame(() => ref.current.update())
  return (
    // @ts-ignore
    <orbitControls ref={controls} args={[camera, gl.domElement]} {...props} />
  )
}

export default Controls
