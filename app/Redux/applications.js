import axios from 'axios';
import base from '../Airtable/index';

axios.defaults.headers[
  'Authorization'
] = `Bearer ${process.env.AIRTABLE_API_KEY}`;

axios.defaults.baseURL =
  'https://api.airtable.com/v0/appZy0IcocUjMrryI/SC04%20Applications';

const SET_APPLICATIONS = 'SET_APPLICATIONS';
const APPROVE = 'APPROVE';
const SET_CURRENT = 'SET_CURRENT';
const SET_COMPLETE = 'SET_COMPLETE';

const setApplications = (records) => ({
  type: SET_APPLICATIONS,
  records,
});

export const approve = (index) => ({
  type: APPROVE,
  index,
});

export const setCurrent = (index) => ({
  type: SET_CURRENT,
  index,
});

export const setComplete = (value) => ({
  type: SET_COMPLETE,
  value,
});

export const fetchRecords = () => {
  return async (dispatch) => {
    try {
      const { data: res } = await axios.get('/', {
        params: {
          view: 'Final List',
          fields: [
            'Project Name',
            'Contact Name',
            'Video',
            'Call to Adventure',
          ],
        },
      });

      const applicationsData = res.records.map((record) => {
        return record.fields;
      });

      dispatch(setApplications(applicationsData));
    } catch (error) {
      console.log(error);
    }
  };
};

const initState = { all: [], approved: [], current: 0, complete: false };

const applicationsReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_APPLICATIONS:
      return { ...state, all: action.records };
    case APPROVE:
      const _all = [...state.all];
      return { ...state, approved: [...state.approved, _all[action.index]] };
    case SET_CURRENT:
      return { ...state, current: action.index };
    case SET_COMPLETE:
      return { ...state, complete: action.value };
    default:
      return state;
  }
};

export default applicationsReducer;
