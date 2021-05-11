// const canvas = document.getElementById("babylon-canvas")
// var engine = new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true })

var createScene = function () {
  var scene = new BABYLON.Scene(engine)
  var light = new BABYLON.HemisphericLight(
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

  var oMeshGround = BABYLON.MeshBuilder.CreateGround(
    "MyMeshGround",
    { width: 5, height: 5 },
    scene
  )
  var oStandardMaterialHightlighter = new BABYLON.StandardMaterial(
    "MyStandardMaterial",
    scene
  )
  oStandardMaterialHightlighter.diffuseTexture = new BABYLON.Texture(
    "./textures/Logo.png",
    scene
  )
  oStandardMaterialHightlighter.diffuseTexture.hasAlpha = true
  // oStandardMaterialHightlighter.diffuseTexture.vScale = -1;  // with or without this line does not change the export (texture is always horizontally mirrored exported)
  oMeshGround.material = oStandardMaterialHightlighter

  // Origianl asset
  BABYLON.SceneLoader.Append(
    "https://raw.githubusercontent.com/lizylgit/Trial3D/master/models/coro_cathedral/",
    "scene.gltf",
    scene,
    function (scene) {
      scene.activeCamera.alpha += Math.PI // camera +180°
      scene.meshes.forEach(function (mesh) {
        mesh.scaling = new BABYLON.Vector3(0.5, 0.5, 0.5)
      })
    }
  )

  //Outputed asset to demo is darker than the original
  /* 
  BABYLON.SceneLoader.Append("https://raw.githubusercontent.com/lizylgit/Trial3D/master/models/coro_cathedral/babylonOutput/", "scene.glb", scene, function (scene) {
      scene.activeCamera.alpha += Math.PI; // camera +180°
      scene.meshes.forEach(function (mesh) {
          mesh.scaling = new BABYLON.Vector3(.5, .5, .5);
      });
  });
  */

  // Uncomment to download glb
  /*  if(confirm("Download model")){
          doDownload('scene', scene)
  }
  */
  return scene
}

function doDownload() {
  BABYLON.GLTF2Export.GLBAsync(scene, "fileName").then((glb) => {
    glb.downloadFiles()
  })
}
