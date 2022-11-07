import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import EmailCategory from './email-category';

const EmailCategoryViewModelRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<EmailCategory />} />
    <Route path=":id">
      <Route index element={<EmailCategory />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default EmailCategoryViewModelRoutes;
