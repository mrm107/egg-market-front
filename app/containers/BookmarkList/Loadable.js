/**
 *
 * Asynchronously loads the component for BookmarkList
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
