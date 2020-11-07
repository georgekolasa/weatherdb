import React from 'react';
import { useStore } from '../../stores';
import PageLoader from '../PageLoader';
import './styles/Preview.css';

export default function Preview() {
  const queryData = useStore((state) => state.queryData);

  // console.log(queryData);

  // This should eventually render something based on the contents of the
  // queryData, or based on the structure of the data.
  function parseQueryData() {
    if (!queryData) {
      return (
        <React.Fragment>
          <p>
            todo: preview when query data exists, message indicating make query
            otherwise
          </p>

          <p>
            todo: set up state management for queries. this wont be in this
            component, rather something higher up. Mobx is a decent solution,
            might overly be excessive though. zustand is in my opinion a better
            option
          </p>
        </React.Fragment>
      );
    } else {
      return 'TODO PLZ';
    }
  }

  return (
    <div className="preview-layout">
      <PageLoader />
      {parseQueryData()}
    </div>
  );
}
