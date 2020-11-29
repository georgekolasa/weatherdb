import { useMemo } from 'react';
import axios from 'axios';
import { useStore } from '../stores';
import createNotification from './createNotification';
import shallow from 'zustand/shallow';

export default function useQuery() {
  const {setQueryData, queryData, selectQuery} = useStore(
    (state) => ({
      selectQuery: state.query,
      queryData: state.queryData,
      setQueryData: state.setQueryData
    }),
    shallow);
  const queries = useMemo(
    () => ({
      async selectQuery() {
        const queryResponse = await axios
          .post('/api/select', { query: selectQuery })
          .catch((error) => error.response);
        if (queryResponse.status === 200) {
          setQueryData(queryResponse.data);
        } else {
          // TODO: handle error better
          createNotification({
            message: 'Error Occurred',
            description: 'A server error occurred!',
            duration: 0,
          });

          console.log(queryResponse);
        }
      },
    }),
    [queryData, selectQuery]
  );

  return queries;
}
