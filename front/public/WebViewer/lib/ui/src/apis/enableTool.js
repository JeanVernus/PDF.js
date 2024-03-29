import core from 'core';
import { PRIORITY_ONE } from 'constants/actionPriority';
import actions from 'actions';
import selectors from 'selectors';

export default store => toolName => {
  const dataElement = selectors.getToolButtonDataElement(store.getState(), toolName);

  core.getTool(toolName).disabled = false;
  store.dispatch(actions.enableElement(dataElement, PRIORITY_ONE));
};
