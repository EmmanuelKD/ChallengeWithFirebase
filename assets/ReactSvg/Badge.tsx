import * as React from "react"
import Svg, { SvgProps, G, Rect, Path } from "react-native-svg"

const SvgComponent = (props: SvgProps) => (
  <Svg  width={347} height={146} {...props}>
    <G data-name="Group 26" transform="translate(-14.75 -122)">
      <Rect
        data-name="Rectangle 2"
        width={347}
        height={146}
        rx={21}
        transform="translate(14.75 122)"
        fill="#3a81f1"
      />
      <Path
        data-name="Path 4"
        d="M313.45 200c30.6-56 20.3-78 20.3-78a21 21 0 0 1 21 21v104a21 21 0 0 1-21 21h-68s17.1-12 47.7-68Z"
        fill="#fff"
      />
      <Path
        data-name="Path 5"
        d="M309.45 200c30.6-56 20.3-78 20.3-78a21 21 0 0 1 21 21v104a21 21 0 0 1-21 21h-68s17.1-12 47.7-68Z"
        fill="#fdbd00"
      />
    </G>
  </Svg>
)

export default SvgComponent
