import { Color } from "three/src/math/Color.js";
import { Vector3 } from "three/src/math/Vector3.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import React, { PureComponent, useEffect } from 'react'

import * as MB from "mathbox";

function SampleGraph() {
  useEffect(() => {
  const mathboxElement = document.getElementById("mathbox");
  const mathbox = MB.mathBox({
    plugins: ["core", "controls", "cursor"],
    controls: {
      klass: OrbitControls,
    },
    element: mathboxElement,
    camera: {
      up: new Vector3(0, 0, 1),
    },
  },[]);
  mathbox.three.camera.position.set(1, 1, 1);
  mathbox.three.renderer.setClearColor(new Color(0xffffff), 1.0);

  const view = mathbox
  .cartesian({
    range: [
      [-1, 1], [-1, 1], [-1, 1]
    ],
    scale: [1, 1, 1],
  })
  .axis({
    axis: 1,
  })
  .axis({
    axis: 2,
  })
  .axis({
    axis: 3,
  })
  .grid({
    width: 1,
    divideX: 10,
    divideY: 10,
    opacity: 0.5,
  })
});
  return (
    <>
      <div id={"mathbox"} style={{"height": "500px"}} >
      </div>
    </>
  )
}

export default SampleGraph;