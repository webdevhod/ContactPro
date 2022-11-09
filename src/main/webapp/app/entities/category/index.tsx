import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import PageNotFound from 'app/shared/error/page-not-found';
import Category from './category';
import CategoryDeleteDialog from './category-delete-dialog';
import CategoryDetail from './category-detail';
import CategoryUpdate from './category-update';

const CategoryRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<Category />} />
    <Route path="new" element={<CategoryUpdate />} />
    <Route path=":id">
      <Route index element={<CategoryDetail />} />
      <Route path="edit" element={<CategoryUpdate />} />
      <Route path="delete" element={<CategoryDeleteDialog />} />
    </Route>
    <Route path="*" element={<PageNotFound />} />
  </ErrorBoundaryRoutes>
);

export default CategoryRoutes;
