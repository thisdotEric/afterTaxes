import React, { FC } from 'react';
import './SubmitButton.css';

interface SubmitButtonProps {
  name: string;
  value: string;
  id: string;
}

const SubmitButton: FC<SubmitButtonProps> = (
  submitButtonProps: SubmitButtonProps,
) => {
  return <input type="submit" {...submitButtonProps} className="btn" />;
};

export default SubmitButton;
