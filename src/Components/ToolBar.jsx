// ToolbarComponent.jsx
import React from 'react';
import { Grid, IconButton } from '@mui/material';
import { ArrowUpward, ArrowDownward, ContentCopy, ControlPointDuplicate, Delete } from '@mui/icons-material';

const ToolbarComponent = ({ cell, onMoveUp, onMoveDown, onCopy, onDuplicate, onDelete }) => {
  const handleCopyToClipboard = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(cell.content).then(() => {
        alert('Copied to clipboard');
      }).catch((err) => {
        console.error('Failed to copy text: ', err);
      });
    } else {
      alert('Clipboard access not supported');
    }
  };

  return (
    <Grid container spacing={1} alignItems="center" justifyContent="flex-end">
      <Grid item>
        <IconButton onClick={onMoveUp}>
          <ArrowUpward />
        </IconButton>
      </Grid>
      <Grid item>
        <IconButton onClick={onMoveDown}>
          <ArrowDownward />
        </IconButton>
      </Grid>
      <Grid item>
        <IconButton onClick={handleCopyToClipboard}>
          <ContentCopy />
        </IconButton>
      </Grid>
      <Grid item>
        <IconButton onClick={onDuplicate}>
          <ControlPointDuplicate />
        </IconButton>
      </Grid>
      <Grid item>
        <IconButton onClick={onDelete}>
          <Delete />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default ToolbarComponent;
