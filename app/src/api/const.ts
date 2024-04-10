import { ConfigurationParameters } from 'generated-sources';

function getBasePath() {
  const basePath = window.location.href;
  return basePath.endsWith('/') ? basePath.slice(0, -1) : basePath;
}

export const BASE_PARAMS: ConfigurationParameters = {
  basePath: getBasePath(),
  headers: {
    'Content-Type': 'application/json',
  },
};
