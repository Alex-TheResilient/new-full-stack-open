import { useState, forwardRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <div className="mb-4">
      <div style={hideWhenVisible}>
        <Button onClick={toggleVisibility}>{props.buttonLabel}</Button>
      </div>
      <div style={showWhenVisible} className="togglableContent mt-3">
        {props.children}
        <Button variant="secondary" onClick={toggleVisibility} className="mt-2">
          Cancel
        </Button>
      </div>
    </div>
  );
});

Togglable.displayName = 'Togglable';
Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default Togglable;
