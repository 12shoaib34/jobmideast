import React from 'react'
import Header from './Header'
import ChatInput from '../../../shared-ui/ChatInput/ChatInput';
import { Collapse } from 'antd'
const { Panel } = Collapse
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const TestChat = () => {
  return (
    <div>
      <Collapse accordion>
        <Panel header="This is panel header 1" key="1">
          <p>{text}</p>
        </Panel>
        <Panel header="This is panel header 2" key="2">
          <p>{text}</p>
        </Panel>
        <Panel header="This is panel header 3" key="3">
          <p>{text}</p>
        </Panel>
      </Collapse>
    </div>
  )
}

export default TestChat
