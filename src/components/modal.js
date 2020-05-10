import ReactDOM from 'react-dom';
import { useEffect } from 'react';

export default ({ children }) => {
  const el = document.createElement('div');
  el.id = 'modal-alert';

  useEffect(
    () => {
      document.body.appendChild(el);
      return () => {
        document.body.removeChild(el);
      };
    },
    [el]
  );

  return ReactDOM.createPortal(children, el);
}