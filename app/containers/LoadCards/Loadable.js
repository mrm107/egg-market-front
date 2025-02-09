/**
 *
 * Asynchronously loads the component for LoadCards
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
