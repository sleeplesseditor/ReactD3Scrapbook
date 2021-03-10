import * as React from 'react';

import { ReactComponent as ArrowIcon } from './arrow.svg';
import { ReactComponent as BarIcon } from './bar-chart.svg';
import { ReactComponent as ChartsIcon } from './charts.svg';
import { ReactComponent as ScatterIcon } from './scatter.svg';

const getIcon = (icon) => {
  const iconSelection = {
      arrowIcon: () => <ArrowIcon />,
      barIcon: () => <BarIcon/>,
      chartsIcon: () => <ChartsIcon/>,
      scatterIcon: () => <ScatterIcon/>,
      default: () => null
  }

  return (iconSelection[icon] || iconSelection.default)()
}

export const IconSelector = (icon) => {
    const iconClass = getIcon(icon);
    return (
      <>
        {iconClass}
      </>
    );
};