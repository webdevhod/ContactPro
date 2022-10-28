import axios from 'axios';
import { createAsyncThunk, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit';
import { loadMoreDataWhenScrolled, parseHeaderForLinks } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { IQueryParams, createEntitySlice, EntityState, serializeAxiosError } from 'app/shared/reducers/reducer.utils';
import { IContact, defaultValue } from 'app/shared/model/contact.model';

const initialState: EntityState<IContact> = {
  loading: false,
  errorMessage: null,
  entities: [],
  entity: defaultValue,
  links: { next: 0 },
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

const apiUrl = 'api/contacts';

// Actions

export const getEntities = createAsyncThunk(
  'contact/fetch_entity_list',
  async ({ page, size, sort, categoryId, searchTerm }: IQueryParams) => {
    const searchTermEncoded = encodeURIComponent(searchTerm);
    const requestUrl = `${apiUrl}${
      sort
        ? `?categoryId=${categoryId}&searchTerm=${searchTermEncoded}&page=${page}&size=${size}&sort=lastName,${sort}&sort=firstName,${sort}&`
        : '?'
    }cacheBuster=${new Date().getTime()}`;
    return axios.get<IContact[]>(requestUrl);
  }
);

export const getEntity = createAsyncThunk(
  'contact/fetch_entity',
  async (id: string | number) => {
    const requestUrl = `${apiUrl}/${id}`;
    return axios.get<IContact>(requestUrl);
  },
  { serializeError: serializeAxiosError }
);

export const createEntity = createAsyncThunk(
  'contact/create_entity',
  async (entity: IContact, thunkAPI) => {
    return axios.post<IContact>(apiUrl, cleanEntity(entity));
  },
  { serializeError: serializeAxiosError }
);

export const updateEntity = createAsyncThunk(
  'contact/update_entity',
  async (entity: IContact, thunkAPI) => {
    return axios.put<IContact>(`${apiUrl}/${entity.id}`, cleanEntity(entity));
  },
  { serializeError: serializeAxiosError }
);

export const partialUpdateEntity = createAsyncThunk(
  'contact/partial_update_entity',
  async (entity: IContact, thunkAPI) => {
    return axios.patch<IContact>(`${apiUrl}/${entity.id}`, cleanEntity(entity));
  },
  { serializeError: serializeAxiosError }
);

export const deleteEntity = createAsyncThunk(
  'contact/delete_entity',
  async (id: string | number, thunkAPI) => {
    const requestUrl = `${apiUrl}/${id}`;
    return await axios.delete<IContact>(requestUrl);
  },
  { serializeError: serializeAxiosError }
);

// slice

export const ContactSlice = createEntitySlice({
  name: 'contact',
  initialState,
  extraReducers(builder) {
    builder
      .addCase(getEntity.fulfilled, (state, action) => {
        state.loading = false;
        state.entity = action.payload.data;
      })
      .addCase(deleteEntity.fulfilled, state => {
        state.updating = false;
        state.updateSuccess = true;
        state.entity = {};
      })
      .addMatcher(isFulfilled(getEntities), (state, action) => {
        const { data, headers } = action.payload;
        const links = parseHeaderForLinks(headers.link);

        return {
          ...state,
          loading: false,
          links,
          entities: loadMoreDataWhenScrolled(state.entities, data, links),
          totalItems: parseInt(headers['x-total-count'], 10),
        };
      })
      .addMatcher(isFulfilled(createEntity, updateEntity, partialUpdateEntity), (state, action) => {
        state.updating = false;
        state.loading = false;
        state.updateSuccess = true;
        state.entity = action.payload.data;
      })
      .addMatcher(isPending(getEntities, getEntity), state => {
        state.errorMessage = null;
        state.updateSuccess = false;
        state.loading = true;
      })
      .addMatcher(isPending(createEntity, updateEntity, partialUpdateEntity, deleteEntity), state => {
        state.errorMessage = null;
        state.updateSuccess = false;
        state.updating = true;
      });
  },
});

export const { reset } = ContactSlice.actions;

// Reducer
export default ContactSlice.reducer;
