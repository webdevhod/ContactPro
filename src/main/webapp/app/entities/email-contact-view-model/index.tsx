import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import EmailContactViewModel from './email-contact-view-model';
import EmailContactViewModelDetail from './email-contact-view-model-detail';
import EmailContactViewModelUpdate from './email-contact-view-model-update';
import EmailContactViewModelDeleteDialog from './email-contact-view-model-delete-dialog';

const EmailContactViewModelRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<EmailContactViewModel />} />
    <Route path="new" element={<EmailContactViewModelUpdate />} />
    <Route path=":id">
      <Route index element={<EmailContactViewModelDetail />} />
      <Route path="edit" element={<EmailContactViewModelUpdate />} />
      <Route path="delete" element={<EmailContactViewModelDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default EmailContactViewModelRoutes;
