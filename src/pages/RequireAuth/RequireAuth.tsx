import { Navigate, Outlet } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { useModel } from './model';

export const RequireAuth = observer(() => {
  const model = useModel();

  if (!model.isAuthenticated) {
    return <Navigate to={'/'} state={model.state} replace />;
  }

  return <Outlet />;
});
