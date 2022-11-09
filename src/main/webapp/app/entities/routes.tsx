import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Category from './category';
import Contact from './contact';
import EmailCategory from './email-category';
import EmailContact from './email-contact';
import PageNotFound from '../shared/error/page-not-found';
/* jhipster-needle-add-route-import - JHipster will add routes here */

export default () => {
  return (
    <div>
      <ErrorBoundaryRoutes>
        {/* prettier-ignore */}
        <Route path="category/*" element={<Category />} />
        <Route path="contact/*" element={<Contact />} />
        <Route path="email-contact/*" element={<EmailContact />} />
        <Route path="email-category/*" element={<EmailCategory />} />
        <Route path="*" element={<PageNotFound />} />
        {/* jhipster-needle-add-route-path - JHipster will add routes here */}
      </ErrorBoundaryRoutes>
    </div>
  );
};
