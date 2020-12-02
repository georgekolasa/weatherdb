import { useMemo } from 'react';
import axios from 'axios';
import { useStore } from '../stores';
import createNotification from './createNotification';
import shallow from 'zustand/shallow';

export default function useQuery() {
  const { setQuery, setQueryData, toggleLoading } = useStore((state) => ({
    setQuery: state.setQuery,
    setQueryData: state.setQueryData,
    toggleLoading: state.toggleLoading,
  }));
  const queries = useMemo(
    () => ({
      async selectQuery(query) {
        toggleLoading(true);
        const queryResponse = await axios
          .post('/api/select', { query: query })
          .catch((error) => error.response);
        if (queryResponse.status === 200) {
          setQuery(query);
          setQueryData(queryResponse.data);
        } else {
          createNotification({
            message: 'Error Occurred',
            description: 'A server error occurred!',
            duration: 0,
          });
        }
        toggleLoading(false);
      },
    }),
    []
  );

  return queries;
}
