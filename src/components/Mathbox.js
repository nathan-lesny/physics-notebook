// // @flow
// import * as React from 'react'
// import { timeout } from 'utils/functions'

// export class MathBox extends React.PureComponent {

//   mathboxNode = this.props.mathbox
//   updateSymbol = Symbol('update marker')

//   render() {
//     if (!this.props.children) {
//       return null
//     }
//     return React.Children.map(
//       this.props.children,
//       child => React.cloneElement(child, {
//         mathboxParent: this.mathboxNode,
//         mathbox: this.mathboxNode
//       } )
//     )
//   }

// }
