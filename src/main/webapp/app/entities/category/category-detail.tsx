import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './category.reducer';

export const CategoryDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity({ id }));
  }, []);

  const categoryEntity = useAppSelector(state => state.category.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="categoryDetailsHeading">Category</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="name">Name</span>
          </dt>
          <dd>{categoryEntity.name}</dd>
          <dt>
            <span id="created">Created</span>
          </dt>
          <dd>{categoryEntity.created ? <TextFormat value={categoryEntity.created} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>Contact(s)</dt>
          <dd>
            {categoryEntity.contacts != null && categoryEntity.contacts.length > 0 ? (
              categoryEntity.contacts.map((val, i) => (
                <span key={val.id}>
                  <Link to={`/contact/${val.id}`} style={{ fontWeight: 'normal', textDecoration: 'none' }}>
                    {`${val.firstName} ${val.lastName}`}
                  </Link>
                  {categoryEntity.contacts && i === categoryEntity.contacts.length - 1 ? '' : ', '}
                </span>
              ))
            ) : (
              <span className="fst-italic fw-lighter">Empty</span>
            )}
          </dd>
        </dl>
        <Button tag={Link} to="/category" replace color="secondary" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/category/${categoryEntity.id}/edit`} replace color="info">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/email-category/${id}`} replace color="primary">
          <FontAwesomeIcon icon={faEnvelope} /> <span className="d-none d-md-inline">Email</span>
        </Button>
      </Col>
    </Row>
  );
};

export default CategoryDetail;
