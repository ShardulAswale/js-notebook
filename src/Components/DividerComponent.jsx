// DividerComponent.jsx
import React from 'react';
import { Box, Button } from '@mui/material';

const DividerComponent = ({ index, addCodeCell, addMarkdownCell }) => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" mt={2} mb={2}>
      <Button variant="outlined" onClick={() => addCodeCell(index)} style={{ marginRight: '10px' }}>
        Add Code Cell
      </Button>
      <Button variant="outlined" onClick={() => addMarkdownCell(index)}>
        Add Markdown Cell
      </Button>
    </Box>
  );
};

export default DividerComponent;
