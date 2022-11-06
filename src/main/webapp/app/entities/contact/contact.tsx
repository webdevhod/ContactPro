import React, { useState, useEffect } from 'react';
// import InfiniteScroll from 'react-infinite-scroll-component';
// import { ValidatedField, ValidatedForm } from 'react-jhipster';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Link, useLocation } from 'react-router-dom';
// import { Button, Table } from 'reactstrap';
// import { openFile, byteSize, Translate, TextFormat, getSortState } from 'react-jhipster';
import { getSortState } from 'react-jhipster';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
// import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { ASC, DESC, ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { ICategory } from 'app/shared/model/category.model';
// import { IContact } from 'app/shared/model/contact.model';
import { getEntities, reset } from './contact.reducer';
import { getEntities as getCategories } from 'app/entities/category/category.reducer';
import { IContact } from 'app/shared/model/contact.model';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Contact = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  // const navigate = useNavigate();

  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getSortState(location, ITEMS_PER_PAGE, 'id'), location.search)
  );
  const [sorting, setSorting] = useState(true);

  const [categoryId, setCategoryId] = useState('0');
  const [searchTerm, setSearchTerm] = useState('');
  const categories = useAppSelector(state => state.category.entities);
  const contactList = useAppSelector(state => state.contact.entities);
  const loading = useAppSelector(state => state.contact.loading);
  // const totalItems = useAppSelector(state => state.contact.totalItems);
  // const links = useAppSelector(state => state.contact.links);
  // const entity = useAppSelector(state => state.contact.entity);
  const updateSuccess = useAppSelector(state => state.contact.updateSuccess);

  const getAllEntities = () => {
    dispatch(
      getEntities({
        categoryId,
        searchTerm,
        page: paginationState.activePage - 1,
        size: paginationState.itemsPerPage,
        sort: `${paginationState.sort},${paginationState.order}`,
      })
    );
  };

  const resetAll = () => {
    dispatch(reset());
    setPaginationState({
      ...paginationState,
      activePage: 1,
    });
    dispatch(getEntities({}));
    dispatch(getCategories({}));
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
  }, [paginationState.activePage, categoryId]);

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
    <>
      <div className="row">
        <div className="col-12 text-end mb-3">
          <Link to="/contact/new" className="btn btn-primary rounded-pill" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create New
          </Link>
        </div>
      </div>
      <div className="row g-3">
        <div className="col-12 col-md-4 sideNav px-3 py-4">
          <form>
            <div className="input-group">
              <input
                className="form-control"
                type="search"
                name="searchString"
                placeholder="Search Term"
                value={searchTerm}
                onChange={e => {
                  setSearchTerm(e.target.value);
                }}
              />
              <input
                type="submit"
                className="btn btn-outline-primary"
                value="Search"
                onClick={e => {
                  e.preventDefault();
                  // setClicked(true);
                  getAllEntities();
                }}
              />
            </div>
          </form>
          <form>
            <div className="mt-5">
              <label className="form-label fw-bold">CATEGORY FILTER</label>
              <select
                name="categoryId"
                className="form-control"
                value={categoryId}
                onChange={e => {
                  setSearchTerm('');
                  setCategoryId(e.target.value);
                }}
              >
                <option value="0">All Contacts</option>
                {categories.map((c: ICategory) => {
                  return c.contacts != null && c.contacts.length > 0 ? (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ) : null;
                })}
              </select>
            </div>
          </form>
        </div>
        <div className="col-12 col-md-8">
          <div className="row row-cols-1 g-3">
            {contactList != null && contactList.length > 0
              ? contactList.map((contact: IContact, i: number) => (
                  <div key={i} className="col">
                    <div className="card mb-3">
                      <div className="row g-0">
                        <div className="col-md-4 square-img-container">
                          <img
                            src={
                              contact.imageContentType && contact.image
                                ? `data:${contact.imageContentType};base64,${contact.image}`
                                : '/content/img/DefaultContactImage.png'
                            }
                            className="square-img rounded-start"
                            alt={`${contact.firstName} ${contact.lastName}`}
                          />
                        </div>
                        <div className="col-md-8">
                          <div className="card-body">
                            <h5 className="card-title">{`${contact.firstName} ${contact.lastName}`}</h5>
                            <div className="card-text">
                              {contact.address1}
                              <br />
                              {contact.address2 ? contact.address2 : null}
                              {contact.address2 ? <br /> : null}
                              {contact.city}, {contact.state} {contact.zipCode}
                            </div>
                            <div className="card-text">
                              <span className="fw-bold me-2">Phone:</span>
                              {contact.phoneNumber}
                            </div>
                            <div className="card-text">
                              <span className="fw-bold me-2">Email:</span>
                              {contact.email}
                            </div>
                            <div className="fs-4 mt-5 d-flex gap-1">
                              <Link className="me-3 editIcons" to={`${contact.id}/edit`}>
                                <i className="bi bi-pencil-fill "></i>
                              </Link>
                              <Link className="me-3 editIcons" to={`/email-contact/${contact.id}`}>
                                <i className="bi bi-envelope-fill "></i>
                              </Link>
                              <Link className="me-3 editIcons" to={`${contact.id}/delete`}>
                                <i className="bi bi-trash-fill text-danger "></i>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              : !loading && <h4 className="ps-3 pt-2 text-body">No contacts found</h4>}
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
