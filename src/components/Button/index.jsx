// AdvancedButton.js
import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';

const Button = ({
  text,
  onClick,
  disabled,
  loading,
  type,
  className,
  icon,
  iconPosition,
  ...props
}) => {
  const renderIcon = () => {
    if (!icon) return null;
    return <span className={`icon ${iconPosition}`}>{icon}</span>;
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`advanced-button ${className} ${loading ? 'loading' : ''}`}
      type={type}
      {...props}
    >
      {iconPosition === 'before' && renderIcon()}
      {loading ? 'Loading...' : text}
      {iconPosition === 'after' && renderIcon()}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  className: PropTypes.string,
  icon: PropTypes.node,
  iconPosition: PropTypes.oneOf(['before', 'after']),
};

Button.defaultProps = {
  onClick: () => {},
  disabled: false,
  loading: false,
  type: 'button',
  className: '',
  icon: null,
  iconPosition: 'before',
};

export default Button;