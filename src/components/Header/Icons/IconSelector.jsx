import * as React from 'react';

import { ReactComponent as ArrowIcon } from './arrow.svg';
import { ReactComponent as BarIcon } from './bar-chart.svg';
import { ReactComponent as ChartsIcon } from './charts.svg';
import { ReactComponent as GlobeIcon } from './globe.svg';
import { ReactComponent as LineIcon } from './line.svg';
import { ReactComponent as MapIcon } from './maps.svg';
import { ReactComponent as MenuIcon } from './menu.svg';
import { ReactComponent as ScatterIcon } from './scatter.svg';

const getIcon = (icon) => {
  const iconSelection = {
      arrowIcon: () => <ArrowIcon />,
      barIcon: () => <BarIcon/>,
      chartsIcon: () => <ChartsIcon/>,
      globeIcon: () => <GlobeIcon />,
      lineIcon: () => <LineIcon/>,
      mapIcon: () => <MapIcon />,
      menuIcon: () => <MenuIcon />,
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