import { MARGIN, HEIGHT } from './utils';
import Tooltip from './Tooltip';
import Line from './Line';
import React from 'react';

import Chart from './Chart';
import Chart2 from './Chart2';
import { Tabs } from 'antd';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Tabs
          destroyInactiveTabPane
          items={[
            {
              key: 'chart-1',
              label: 'chart-1',
              children: (
                <div style={{ position: 'relative' }}>
                  <Chart />
                  <Tooltip id="tooltip"></Tooltip>
                  <Line
                    id="line"
                    top={MARGIN.top}
                    left={MARGIN.left}
                    height={HEIGHT}
                  />
                </div>
              ),
            },
            {
              key: 'chart-2',
              label: 'chart-2',
              children: (
                <div style={{ position: 'relative' }}>
                  <Chart2 />
                  <Tooltip id="tooltip"></Tooltip>
                  <Line
                    id="line"
                    top={MARGIN.top}
                    left={MARGIN.left}
                    height={HEIGHT}
                  />
                </div>
              ),
            },
          ]}
        />
      </header>
    </div>
  );
}

export default App;
