import { Color } from "three/src/math/Color.js";
import { Vector3 } from "three/src/math/Vector3.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import React, { PureComponent, useEffect } from 'react'
import { useState } from "react";

import * as MB from "mathbox";
import { sin } from "three/examples/jsm/nodes/Nodes.js";

function SampleGraph() {
  const [scale, setScale] = useState(2)
  useEffect(() => {
    const mathboxElement = document.getElementById("mathbox");
    var mathbox = MB.mathBox({
      plugins: ["core", "controls", "cursor", "mathbox"],
      controls: {
        // Orbit controls, i.e. Euler angles, with gimbal lock
        klass: OrbitControls,

        // Trackball controls, i.e. Free quaternion rotation
        //klass: THREE.TrackballControls,
      },
      element: mathboxElement
    });
    if (mathbox.fallback) throw "WebGL not supported";

    var three = mathbox.three;

    // DOM
    mathbox.set("focus", 3);

    var camera = mathbox.camera({
      proxy: true,
      position: [1, 1, 3],
    });
    mathbox.three.renderer.setClearColor(new Color(0xffffff), 1.0);

    var view = mathbox.clock({ speed: 1 / 16 }).cartesian({
      range: [
        [-2, 2],
        [-4, 4],
        [-2, 2],
      ],
      scale: [1, 1, 1],
    });

    // Axes + grid
    view
      .axis({
        axis: 1,
        width: 3,
        color: "black",
      })
      .axis({
        axis: 3,
        width: 3,
        color: "black",
      })
      .grid({
        axes: "xz",
        width: 2,
        divideX: 10,
        divideY: 10,
        color: "black",
      });

    // Use a dummy shader to cache cosine / sine
    var shader = view.shader(
      {
        code: "uniform float tCos;\nuniform float tSin;\nvoid main() { };",
      },
      {
        tCos: function () {
          return Math.cos((180 * MB.τ) / 360);
        },
        tSin: function () {
          return Math.sin((180 * MB.τ) / 360);
        },
      }
    );
    var cache = shader.get();

    // Compute 2D area of a rotated hyberbolic surface
    var data = view.area({
      axes: "xz",
      expr: function (emit, x, z, i, j, t) {
        var cos = cache.tCos;
        var sin = cache.tSin;

        var x2 = x + 0.2;
        var z2 = z + 0;

        var x3 = x2 * cos + z2 * sin;
        var z3 = -x2 * sin + z2 * cos;

        emit(x, x3 * x3 - z3 * z3, z);
      },
      width: 65,
      height: 65,
      channels: 3,
    });

    // X slice at origin
    var sliceX = view
      .group()
      .slice({
        height: [32, 33],
      })
      .line({
        color: 0xc00040,
        width: 5,
        zBias: 3,
      })
      .end();

    // Y slice at origin
    var sliceY = view
      .group()
      .slice({
        width: [32, 33],
      })
      .transpose({
        order: "yx",
      })
      .line({
        color: 0x0080f0,
        width: 5,
        zBias: 3,
      })
      .end();

    // Draw surface
    var surface = view.surface({
      lineX: true,
      lineY: true,
      shaded: true,
      color: 0xcccccc,
      lineBias: 1,
      opacity: 0.75,
    });

});
  return (
    <>
      <h1>Sample Graph</h1>
      <div id={"mathbox"} style={{"height": "500px"}} />
    </>
  )
}

export default SampleGraph;