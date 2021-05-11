const createTestScene = function () {
  const scene = new BABYLON.Scene(engine)
  const light = new BABYLON.HemisphericLight(
    "MyHemisphericLight",
    new BABYLON.Vector3(0, 10, 0),
    scene
  )
  scene.activeCamera = new BABYLON.ArcRotateCamera(
    "MyArcRotateCamera",
    -Math.PI / 2,
    Math.PI / 3,
    20,
    BABYLON.Vector3.Zero(),
    scene
  )
  scene.activeCamera.attachControl(canvas, false)

  const assetsManager = new BABYLON.AssetsManager(scene)
  const meshTask = assetsManager.addMeshTask(
    "mesh task",
    "",
    "./",
    "NarrowInline_Hinge_PAR.babylon"
  )
  meshTask.onSuccess = function (task) {
    task.loadedMeshes[0].position = BABYLON.Vector3.Zero()
  }
  meshTask.onError = function (task, message, exception) {
    console.log(message, exception)
  }

  assetsManager.load()

  assetsManager.onFinish = async function (tasks) {
    const mesh = tasks[0].loadedMeshes[0]
    const rows = 25
    const cols = 25
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const clone = mesh.clone(`mesh_${i}_${j}`)
        clone.position = new BABYLON.Vector3(0.5 * (i + 1), 0, 1.0 * j)
      }
    }
  }

  return scene
}

async function exportGLTF(scene) {
  console.log("exporting...")

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
    console.log("________________________________")
  } catch (error) {
    printMemory()
    console.error(error)
  }
}

function doDownload() {
  BABYLON.GLTF2Export.GLBAsync(scene, "fileName").then((glb) => {
    glb.downloadFiles()
  })
}
