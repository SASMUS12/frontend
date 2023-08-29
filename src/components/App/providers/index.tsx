import compose from 'compose-function';

import { withStore } from './withStore';
import { withRouter } from './withRouter';
import { withAuth } from './withAuth';

export const withProviders = compose(withStore, withRouter, withAuth);
