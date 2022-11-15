import React, { MouseEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { useNavigate, useParams } from 'react-router-dom';
import { getEntities as getContacts } from '../contact/contact.reducer';
import { getEntity, updateEntity, reset } from './email-category-view-model.reducer';
import { ICategory } from 'app/shared/model/category.model';
import { IContact } from 'app/shared/model/contact.model';
import Select from 'react-select';
import { toast } from 'react-toastify';

const EmailCategory = () => {
  const { id } = useParams<'id'>();
  const dispatch = useAppDispatch();
  const updateSuccess = useAppSelector(state => state.emailCategoryViewModel.updateSuccess);
  const errorMessage = useAppSelector(state => state.emailCategoryViewModel.errorMessage);
  const emailCategoryViewModelEntity = useAppSelector(state => state.emailCategoryViewModel.entity);
  const [category, setCategory] = useState<ICategory>(null);
  const [contactsSelected, setContactsSelected] = useState([]);
  const contacts = useAppSelector(state => state.contact.entities);
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);

  const handleClose = () => {
    navigate('/category');
  };

  useEffect(() => {
    dispatch(getEntity(id));
    dispatch(getContacts({}));
  }, []);

  useEffect(() => {
    setCategory(
      emailCategoryViewModelEntity != null && emailCategoryViewModelEntity.category != null
        ? { ...emailCategoryViewModelEntity.category }
        : {}
    );
    setContactsSelected(
      emailCategoryViewModelEntity && emailCategoryViewModelEntity.category && emailCategoryViewModelEntity.category.contacts
        ? emailCategoryViewModelEntity.category.contacts.map((c: IContact) => ({ id: c.id, name: `${c.firstName} ${c.lastName}` }))
        : []
    );
  }, [emailCategoryViewModelEntity]);

  const handleSubmit = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    const entity = {
      ...emailCategoryViewModelEntity,
      category: { ...category },
      emailData: {
        subject,
        body,
      },
      id: category.id,
    };
    setEmailSubmitted(true);
    dispatch(updateEntity(entity));
  };

  useEffect(() => {
    if (emailSubmitted) {
      if (updateSuccess) {
        toast.success(`Email sent to ${category.name}!`);
        handleClose();
      } else {
        toast.error(errorMessage);
      }
      setEmailSubmitted(false);
    }
  }, [updateSuccess]);

  useEffect(() => {
    if (loaded && errorMessage != null) {
      dispatch(reset());
      navigate('/404');
    }
    if (!loaded) {
      setLoaded(true);
    }
  }, [errorMessage]);

  return (
    <>
      <h1>Email {category && category.name ? category.name : 'Category'}</h1>
      <div className="p-2">
        <form method="post">
          <div className="row row-cols-1 row-cols-md-2 g-3 mb-3">
            <div className="col col-md-12">
              <label className="form-label" htmlFor="contacts">
                To:
              </label>
              <Select
                className="col mb-3"
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
            </div>
          </div>
          <div className="row row-cols-1 g-3">
            <div className="col">
              <label className="form-label">Subject:</label>
              <input
                type="text"
                className="form-control"
                value={subject}
                onChange={e => {
                  setSubject(e.target.value);
                }}
              />
            </div>
            <div className="col">
              <label className="form-label">Message:</label>
              <textarea
                className="form-control"
                rows={10}
                required
                value={body}
                onChange={e => {
                  setBody(e.target.value);
                }}
              ></textarea>
            </div>
            <div className="col text-end">
              <button
                className="btn btn-light rounded-pill btnlinks me-2"
                type="submit"
                onClick={e => {
                  e.preventDefault();
                  handleClose();
                }}
              >
                Cancel
              </button>
              <button className="btn btn-primary rounded-pill btnlinks" type="submit" onClick={handleSubmit}>
                Send
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default EmailCategory;
