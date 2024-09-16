/**
 * Asynchronously loads the component for DownloadPage
 */
import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
