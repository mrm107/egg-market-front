/**
 * Asynchronously loads the component for TermsPage
 */
import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
