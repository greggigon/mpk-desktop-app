import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { Chip } from '@material-ui/core';
import { isBlank } from '../utils/stringUtils';

interface TagProperties {
  label: string;
  textColor?: string;
  backgroundColor: string;
  onDelete?: () => void;
  onClick?: () => void;
  className?: string;
}

const getDefaultTextColor = (theme) =>
  theme.palette.text.primary === '#fff' ? '#ffffff' : '#000000';

const Tag = (props: TagProperties) => {
  const { label, backgroundColor, textColor } = props;
  const { onDelete, onClick, className } = props;
  const defaultTextColor = getDefaultTextColor(useTheme());
  const color = textColor && !isBlank(textColor) ? textColor : defaultTextColor;

  return (
    <Chip
      size="small"
      label={label}
      style={{ backgroundColor, color }}
      onDelete={onDelete}
      onClick={onClick}
      className={className}
    />
  );
};

Tag.defaultProps = {
  textColor: 'default',
  className: '',
  onClick: undefined,
  onDelete: undefined,
};

export default Tag;
