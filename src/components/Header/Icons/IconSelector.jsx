import * as React from 'react';

import { ReactComponent as ArrowIcon } from './arrow.svg';
import { ReactComponent as BarIcon } from './bar-chart.svg';
import { ReactComponent as ChartsIcon } from './charts.svg';
import { ReactComponent as GlobeIcon } from './globe.svg';
import { ReactComponent as LineIcon } from './line.svg';
import { ReactComponent as MapIcon } from './maps.svg';
import { ReactComponent as MenuIcon } from './menu.svg';
import { ReactComponent as MiscIcon } from './misc.svg';
import { ReactComponent as MultiIcon } from './multiIcon.svg';
import { ReactComponent as NetworkIcon } from './network.svg';
import { ReactComponent as NewsIcon } from './newsIcon.svg';
import { ReactComponent as OrganizationIcon } from './organization.svg';
import { ReactComponent as ScatterIcon } from './scatter.svg';
import { ReactComponent as TreeIcon } from './tree.svg';
import { ReactComponent as UploadIcon } from './upload.svg';

const getIcon = (icon) => {
  const iconSelection = {
      arrowIcon: () => <ArrowIcon />,
      barIcon: () => <BarIcon/>,
      chartsIcon: () => <ChartsIcon/>,
      globeIcon: () => <GlobeIcon />,
      lineIcon: () => <LineIcon/>,
      mapIcon: () => <MapIcon />,
      menuIcon: () => <MenuIcon />,
      miscIcon: () => <MiscIcon />,
      multiIcon: () => <MultiIcon />,
      networkIcon: () => <NetworkIcon />,
      newsIcon: () => <NewsIcon />,
      organizationIcon: () => <OrganizationIcon />,
      scatterIcon: () => <ScatterIcon/>,
      treeIcon: () => <TreeIcon/>,
      uploadIcon: () => <UploadIcon/>,
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