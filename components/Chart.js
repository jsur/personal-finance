import React from 'react'
import { AreaChart } from 'react-native-svg-charts'
import * as shape from 'd3-shape'

class LineChart extends React.PureComponent {

  render() {

    const data = [ 30, 40, 70, 55, 70, 84, 95, 91, 76 ]

    return (
        <AreaChart
            style={ { height: 200, width: 300 } }
            numberOfTicks={ 5 }
            data={ data }
            contentInset={ { top: 30, bottom: 30 } }
            curve={shape.curveNatural}
            svg={{ fill: 'rgba(84, 199, 233, 0.1)', stroke: 'rgba(84, 199, 233, 0.9)', strokeWidth: '1' }}
        />
    )
  }
}

export default LineChart;
