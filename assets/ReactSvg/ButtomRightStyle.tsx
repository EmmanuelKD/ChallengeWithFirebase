import * as React from "react"
import Svg, { SvgProps, G, Path } from "react-native-svg"
// xmlns="http://www.w3.org/2000/svg"
const SvgComponent = (props: SvgProps) => (
  <Svg  width={428} height={309} {...props}>
    <G data-name="Group 14">
      <G data-name="Group 13">
        <G data-name="Group 12">
          <Path
            data-name="Path 1"
            d="M260.3 122.983C361.212-41.664 428 6.589 428 6.589V309H0s159.394-21.37 260.3-186.017Z"
            fill="#fdbd00"
          />
          <Path
            data-name="Path 3"
            d="M260.3 146.79C361.212 3.214 428 45.292 428 45.292v263.705H0s159.394-18.632 260.3-162.207Z"
            fill="#fff"
          />
          <Path
            data-name="Path 2"
            d="M269.707 160.758C364.957 29.546 428 68 428 68v241H24s150.456-17.031 245.707-148.242Z"
            fill="#2da94f"
          />
        </G>
      </G>
    </G>
  </Svg>
)

export default SvgComponent
