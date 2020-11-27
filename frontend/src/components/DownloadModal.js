import { Button, Modal } from 'antd';
import React, { useState } from 'react';
import { CSVLink } from 'react-csv';
import { useStore } from '../stores';

function DownloadModalFooter({ data, off }) {
  return (
    <div>
      <Button onClick={off} style={{ marginRight: '.5rem' }}>
        Close
      </Button>
      <CSVLink data={data ? data : []} target="_blank">
        <Button>Download</Button>
      </CSVLink>
    </div>
  );
}

export default function DownloadModal() {
  const data = useStore((state) => state.queryData);
  const [visible, setVisibility] = useState(false);

  function download() {
    off();
  }

  function off() {
    setVisibility(false);
  }

  function on() {
    if (data) {
      setVisibility(true);
    }
  }

  return (
    <React.Fragment>
      <Modal
        title="Download Query"
        visible={visible}
        afterClose={off}
        onCancel={off}
        onOk={download}
        footer={<DownloadModalFooter off={off} data={data} />}
      >
        This modal allows you to download the query data as a CSV file
      </Modal>

      <Button
        disabled={!data || !data.length}
        className="toolbar-btn"
        size="large"
        onClick={on}
      >
        Download
      </Button>
    </React.Fragment>
  );
}
