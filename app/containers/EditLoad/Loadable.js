/**
 *
 * Asynchronously loads the component for EditLoad
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
