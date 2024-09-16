/**
 *
 * Asynchronously loads the component for MyLoads
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
