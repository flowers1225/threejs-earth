import { useEffect, useRef } from 'react'
import { useThree } from '@react-three/fiber'
import { Vector3 } from 'three'

const CustomCamera = function (props: any) {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null)
  const { set, size } = useThree()
  useEffect(() => {
    if (cameraRef.current) {
      cameraRef.current.aspect = size.width / size.height
      cameraRef.current.lookAt(new Vector3(0, 0, 0))
      cameraRef.current.updateProjectionMatrix()
    }
  }, [size, props])

  useEffect(() => {
    //@ts-ignore
    set(() => ({ camera: cameraRef.current }))
  }, [set])

  return <perspectiveCamera ref={cameraRef} {...props} />
}

export default CustomCamera
