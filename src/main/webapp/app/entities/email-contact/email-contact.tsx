import React, { useState, useEffect, MouseEvent } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'app/config/store';
// import { IEmailContactViewModel } from 'app/shared/model/email-contact-view-model.model';
import { getEntity, updateEntity } from '../email-contact-view-model/email-contact-view-model.reducer';
import { IEmailContactViewModel } from 'app/shared/model/email-contact-view-model.model';
import { IEmailData } from 'app/shared/model/email-data.model';
import { IContact } from 'app/shared/model/contact.model';
import { toast } from 'react-toastify';

const EmailContact = () => {
  const { id } = useParams<'id'>();
  const dispatch = useAppDispatch();

  const updateSuccess = useAppSelector(state => state.emailContactViewModel.updateSuccess);
  const errorMessage = useAppSelector(state => state.emailContactViewModel.errorMessage);

  const emailContactViewModelEntity = useAppSelector(state => state.emailContactViewModel.entity);
  const [ecvm, setEcvm] = useState<IEmailContactViewModel>(null);
  const [contact, setContact] = useState<IContact>(null);
  const [emailData, setEmailData] = useState<IEmailData>(null);

  const [emailAddress, setEmailAddress] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [groupName, setGroupName] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  const navigate = useNavigate();

  const handleClose = () => {
    navigate('/contact');
  };

  useEffect(() => {
    if (emailSubmitted) {
      if (updateSuccess) {
        toast.success(`Email sent to ${firstName} ${lastName}!`);
        handleClose();
      } else {
        toast.error(errorMessage);
      }
      setEmailSubmitted(false);
    }
  }, [updateSuccess]);

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  useEffect(() => {
    console.log('emailContactViewModelEntity');
    console.log(emailContactViewModelEntity);
    setEcvm(emailContactViewModelEntity != null ? { ...emailContactViewModelEntity } : {});
    setContact(
      emailContactViewModelEntity != null && emailContactViewModelEntity.contact != null ? { ...emailContactViewModelEntity.contact } : {}
    );
    setEmailData(
      emailContactViewModelEntity != null && emailContactViewModelEntity.emailData != null
        ? { ...emailContactViewModelEntity.emailData }
        : {}
    );
  }, [emailContactViewModelEntity]);

  useEffect(() => {
    console.log('ecvm');
    console.log(ecvm);
  }, [ecvm]);

  useEffect(() => {
    console.log('contact');
    console.log(contact);
  }, [contact]);

  useEffect(() => {
    console.log('emailData');
    console.log(emailData);
    if (emailData != null && Object.keys(emailData).length > 0) {
      setEmailAddress(emailData.emailAddress);
      setFirstName(emailData.firstName);
      setLastName(emailData.lastName);
      setGroupName(emailData.groupName);
    }
  }, [emailData]);

  const handleSubmit = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    const entity = {
      ...emailContactViewModelEntity,
      contact: { ...contact },
      emailData: {
        ...emailData,
        subject,
        body,
      },
    };
    setEmailSubmitted(true);
    dispatch(updateEntity(entity));
  };

  return (
    <>
      <h1>Email Contact</h1>
      <div className="p-2">
        <form method="post">
          <input type="hidden" value={groupName} />
          <div className="row row-cols-1 row-cols-md-2 g-3 mb-3">
            <div className="col col-md-12">
              <label className="form-label">To:</label>
              <textarea readOnly className="form-control" rows={3} value={emailAddress}></textarea>
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
                  navigate('/contact');
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

export default EmailContact;