async function exportGLTF(name, scene) {
  function printMemory() {
    console.log(
      "totalJSHeapSize: " + console.memory.totalJSHeapSize / 1e6 + "mb"
    )
    console.log("usedJSHeapSize: " + console.memory.usedJSHeapSize / 1e6 + "mb")
    console.log(
      "jsHeapSizeLimit: " + console.memory.jsHeapSizeLimit / 1e6 + "mb"
    )
  }

  console.log("exporting...")

  const serializedScene = BABYLON.SceneSerializer.Serialize(scene)
  const strScene = JSON.stringify(serializedScene)
  console.log(strScene)

  try {
    // debugger
    const gltf = await BABYLON.GLTF2Export.GLTFAsync(scene, "sceneGLTF", {
      shouldExportNode: (node) => {
        return node.isEnabled()
      },
    })
    console.log("________________________________")
    console.log("Exported:")
    console.log(gltf)
    Object.keys(gltf.glTFFiles).forEach((k) => {
      const size = gltf.glTFFiles[k].size
      const sizeStr = size !== undefined ? ` \ size: ${size / 1e6}mb` : ""
      console.log(k + sizeStr)
    })
    console.log("________________________________")
  } catch (error) {
    printMemory()
    console.error(error)
  }
}
