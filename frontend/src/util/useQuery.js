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
          .post('/api/select', { query })
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

      async countQueries() {
        // const query = `
        // SELECT COUNT(*) AS stations FROM GARMON.STATION
        // UNION SELECT COUNT(*) AS readings FROM GARMON.READING
        // UNION SELECT COUNT(*) AS countries FROM GARMON.COUNTRY
        // UNION SELECT COUNT(*) AS states FROM GARMON.STATE
        // `;

        const query = `
        SELECT (
          SELECT COUNT(*) FROM GARMON.STATION
        ) as stations,
        (
          SELECT COUNT(*) FROM GARMON.READING 
        ) as readings,
        (
          SELECT COUNT(*) FROM GARMON.COUNTRY 
        ) as countries,
        (
          SELECT COUNT(*) FROM GARMON.STATE 
        ) as states
        FROM DUAL
        `;

        // console.log('here');

        // const testresponse = await axios
        //   .post('/api/count', { query: test })
        //   .catch((error) => error.response);

        // console.log(testresponse);

        const response = await axios
          .post('/api/count', { query })
          .catch((error) => error.response);

        return { response, query };
      },
    }),
    []
  );

  return queries;
}
