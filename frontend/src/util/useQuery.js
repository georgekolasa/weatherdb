import { useMemo } from 'react';
import axios from 'axios';
import { useStore } from '../stores';
import createNotification from './createNotification';

export default function useQuery() {
  const setQueryData = useStore((state) => state.setQueryData);
  const queryData = useStore((state) => state.queryData);

  // TODO: do I need deps for this memo??
  const queries = useMemo(
    () => ({
      async testTrend() {
        const testResponse = await axios
          .post('/api/select')
          .catch((error) => error.response);

        if (testResponse.status === 200) {
          console.log(testResponse.data);
          setQueryData(testResponse.data);
        } else {
          // TODO: handle error better
          createNotification('Uh oh, something went wrong');
        }
      },
    }),
    [queryData]
  );

  return queries;
}
