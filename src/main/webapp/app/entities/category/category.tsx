import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { TextFormat, getSortState } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

import { APP_DATE_FORMAT } from 'app/config/constants';
import { ASC, DESC, ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities, reset } from './category.reducer';

export const Category = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();

  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getSortState(location, ITEMS_PER_PAGE, 'id'), location.search)
  );
  const [sorting, setSorting] = useState(false);

  const categoryList = useAppSelector(state => state.category.entities);
  const loading = useAppSelector(state => state.category.loading);
  const links = useAppSelector(state => state.category.links);
  const updateSuccess = useAppSelector(state => state.category.updateSuccess);

  const getAllEntities = () => {
    dispatch(
      getEntities({
        page: paginationState.activePage - 1,
        size: paginationState.itemsPerPage,
        sort: `${paginationState.sort},${paginationState.order}`,
        eagerload: false,
      })
    );
  };

  const resetAll = () => {
    dispatch(reset());
    setPaginationState({
      ...paginationState,
      activePage: 1,
    });
    dispatch(getEntities({ eagerload: false }));
  };

  useEffect(() => {
    resetAll();
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      resetAll();
    }
  }, [updateSuccess]);

  useEffect(() => {
    getAllEntities();
  }, [paginationState.activePage]);

  const handleLoadMore = () => {
    if ((window as any).pageYOffset > 0) {
      setPaginationState({
        ...paginationState,
        activePage: paginationState.activePage + 1,
      });
    }
  };

  useEffect(() => {
    if (sorting) {
      getAllEntities();
      setSorting(false);
    }
  }, [sorting]);

  const sort = p => () => {
    dispatch(reset());
    setPaginationState({
      ...paginationState,
      activePage: 1,
      order: paginationState.order === ASC ? DESC : ASC,
      sort: p,
    });
    setSorting(true);
  };

  const handleSyncList = () => {
    resetAll();
  };

  return (
    <div>
      <h2 id="category-heading" data-cy="CategoryHeading">
        Categories
        <div className="d-flex justify-content-end">
          <Button className="rounded-pill me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} /> Refresh list
          </Button>
          <Link
            to="/category/new"
            className="btn btn-primary rounded-pill jh-create-entity"
            id="jh-create-entity"
            data-cy="entityCreateButton"
          >
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create a new Category
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        <InfiniteScroll
          dataLength={categoryList ? categoryList.length : 0}
          next={handleLoadMore}
          hasMore={paginationState.activePage - 1 < links.next}
          loader={<div className="loader">Loading ...</div>}
        >
          {categoryList && categoryList.length > 0 ? (
            <Table responsive striped bordered hover>
              <thead>
                <tr>
                  <th className="hand col-7 align-middle" onClick={sort('name')}>
                    Name <FontAwesomeIcon icon="sort" className="ms-2" />
                  </th>
                  <th className="hand align-middle" onClick={sort('created')}>
                    Created <FontAwesomeIcon icon="sort" className="ms-2" />
                  </th>
                  <th className="align-middle">&nbsp;</th>
                </tr>
              </thead>
              <tbody>
                {categoryList.map((category, i) => (
                  <tr key={`entity-${i}`} data-cy="entityTable">
                    <td className="align-middle">
                      <Link to={`/category/${category.id}`} style={{ fontWeight: 'normal', textDecoration: 'none' }}>
                        {category.name}
                      </Link>
                    </td>
                    <td className="align-middle">
                      {category.created ? <TextFormat type="date" value={category.created} format={APP_DATE_FORMAT} /> : null}
                    </td>
                    <td className="text-end align-middle">
                      <div className="btn-group flex-btn-group-container gap-2">
                        <Button tag={Link} to={`/category/${category.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                        </Button>
                        <Button tag={Link} to={`/email-category/${category.id}`} color="info" size="sm" data-cy="entityEmailButton">
                          <FontAwesomeIcon icon={faEnvelope} /> <span className="d-none d-md-inline">Email</span>
                        </Button>
                        <Button tag={Link} to={`/category/${category.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
                          <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            !loading && <div className="alert alert-warning">No Categories found</div>
          )}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Category;
