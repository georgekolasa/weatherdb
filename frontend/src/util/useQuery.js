import { useMemo } from 'react';
import axios from 'axios';
import { useStore } from '../stores';
import createNotification from './createNotification';

export default function useQuery() {
  const setQueryData = useStore((state) => state.setQueryData);
  const queryData = useStore((state) => state.queryData);
  const selectQuery = useStore((state) => state.query);

  // TODO: do I need deps for this memo??
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

          console.log(queryResponse.data);
        }
      },
      async testTrend() {
        const testResponse = await axios
          .post('/api/select')
          .catch((error) => error.response);

        if (testResponse.status === 200) {
          console.log(testResponse.data);
          setQueryData(testResponse.data);
        } else {
          // TODO: handle error better
          createNotification({
            message: 'Error Occurred',
            description: 'A server error occurred!',
            duration: 0,
          });
        }
      },
    }),
    [queryData]
  );

  return queries;
}
