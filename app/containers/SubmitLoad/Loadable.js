/**
 *
 * Asynchronously loads the component for SubmitLoad
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
