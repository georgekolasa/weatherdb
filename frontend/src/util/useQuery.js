import { useMemo } from 'react';
import axios from 'axios';
import { useStore } from '../stores';
import createNotification from './createNotification';

export default function useQuery() {
  const setQueryData = useStore((state) => state.setQueryData);
  const queryData = useStore((state) => state.queryData);
  const selectQuery = useStore((state) => state.query);
  console.log(selectQuery);
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
    [queryData]
  );

  return queries;
}
