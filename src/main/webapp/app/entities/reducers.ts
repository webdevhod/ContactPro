import category from 'app/entities/category/category.reducer';
import contact from 'app/entities/contact/contact.reducer';
import emailCategoryViewModel from 'app/entities/email-category/email-category-view-model.reducer';
import emailContactViewModel from 'app/entities/email-contact-view-model/email-contact-view-model.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

const entitiesReducers = {
  category,
  contact,
  emailContactViewModel,
  emailCategoryViewModel,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
};

export default entitiesReducers;
