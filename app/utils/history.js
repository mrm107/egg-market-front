import { useRouterHistory } from 'react-router-dom';
import { createHashHistory } from 'history';

const appHistory = useRouterHistory(createHashHistory)({ queryKey: false });

export default appHistory;