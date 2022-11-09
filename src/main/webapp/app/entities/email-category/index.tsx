import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import PageNotFound from 'app/shared/error/page-not-found';
import EmailCategory from './email-category';

const EmailCategoryViewModelRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<EmailCategory />} />
    <Route path=":id">
      <Route index element={<EmailCategory />} />
    </Route>
    <Route path="*" element={<PageNotFound />} />
  </ErrorBoundaryRoutes>
);

export default EmailCategoryViewModelRoutes;
