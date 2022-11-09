import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import PageNotFound from 'app/shared/error/page-not-found';
import EmailContact from './email-contact';
// import EmailData from './email-data';
// import EmailDataDetail from './email-data-detail';

const EmailDataRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<EmailContact />} />
    <Route path=":id">
      <Route index element={<EmailContact />} />
    </Route>
    <Route path="*" element={<PageNotFound />} />
  </ErrorBoundaryRoutes>
);

export default EmailDataRoutes;
