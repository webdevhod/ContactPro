import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import { ValidatedField, ValidatedForm } from 'react-jhipster';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select';
import { Button, Col, Label, Row } from 'reactstrap';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntities as getContacts } from 'app/entities/contact/contact.reducer';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { IContact } from 'app/shared/model/contact.model';
import { createEntity, getEntity, updateEntity } from './category.reducer';

export const CategoryUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const [contactsSelected, setContactsSelected] = useState([]);
  const users = useAppSelector(state => state.userManagement.users);
  const contacts = useAppSelector(state => state.contact.entities);
  const categoryEntity = useAppSelector(state => state.category.entity);
  const loading = useAppSelector(state => state.category.loading);
  const updating = useAppSelector(state => state.category.updating);
  const updateSuccess = useAppSelector(state => state.category.updateSuccess);

  const handleClose = () => {
    navigate('/category');
  };

  useEffect(() => {
    if (!isNew) {
      dispatch(getEntity({ id }));
    }

    dispatch(getUsers({}));
    dispatch(getContacts({}));
  }, []);

  useEffect(() => {
    if (categoryEntity != null) {
      setContactsSelected(
        categoryEntity.contacts == null
          ? []
          : categoryEntity.contacts.map((c: IContact) => {
              return { id: c.id, name: `${c.firstName} ${c.lastName}` };
            })
      );
    }
  }, [categoryEntity]);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...categoryEntity,
      ...values,
      contacts: contactsSelected,
      appUser: users.find(it => it.id?.toString() === values.appUser?.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {}
      : {
          ...categoryEntity,
          appUser: categoryEntity?.appUser?.id,
          contacts: categoryEntity?.contacts?.map(e => e.id.toString()),
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="contactProApp.category.home.createOrEditLabel" data-cy="CategoryCreateUpdateHeading">
            {`${isNew ? 'Create' : 'Edit'} Category`}
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? (
                <ValidatedField name="id" required readOnly hidden id="category-id" label="ID" validate={{ required: true }} />
              ) : null}
              <ValidatedField
                label="Name"
                id="category-name"
                name="name"
                data-cy="name"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                  minLength: { value: 1, message: 'This field is required to be at least 1 characters.' },
                  maxLength: { value: 50, message: 'This field cannot be longer than 50 characters.' },
                }}
              />
              <Label htmlFor="contacts">Contacts</Label>
              <Select
                className="col-12 col-lg-6 mb-3"
                id="category-contact"
                data-cy="contact"
                name="contacts"
                isMulti={true}
                isSearchable={true}
                getOptionValue={option => option.id}
                getOptionLabel={option => option.name}
                options={contacts.map((c: IContact) => ({ id: c.id, name: `${c.firstName} ${c.lastName}` }))}
                isClearable={true}
                closeMenuOnSelect={false}
                openMenuOnFocus={true}
                value={contactsSelected}
                backspaceRemovesValue={true}
                onChange={e => {
                  setContactsSelected([...e]);
                }}
              />
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/category" replace color="secondary">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">Back</span>
              </Button>
              &nbsp;
              <Button tag={Link} to={`/email-category/${id}`} data-cy="entityCreateEmailButton" replace className="ms-1" color="info">
                <FontAwesomeIcon icon={faEnvelope} />
                &nbsp;
                <span className="d-none d-md-inline">Email</span>
              </Button>
              &nbsp;
              <Button id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating} className="ms-1" color="primary">
                <FontAwesomeIcon icon="save" />
                &nbsp; Save
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default CategoryUpdate;
