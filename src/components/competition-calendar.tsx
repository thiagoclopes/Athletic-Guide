import React, { useState } from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import { Calendar as MiniCalendar } from 'react-calendar'
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-calendar/dist/Calendar.css';
import { Box, Button, Modal } from '@mui/material';

const localizer = momentLocalizer(moment);

const events = [
  {
    title: 'Competição A',
    start: new Date(2024, 7, 10, 10, 0),
    end: new Date(2024, 7, 10, 12, 0),
  },
  {
    title: 'Competição B',
    start: new Date(2024, 7, 12, 14, 0),
    end: new Date(2024, 7, 12, 16, 0),
  },
  {
    title: 'Competição C',
    start: new Date(2024, 7, 15, 9, 0),
    end: new Date(2024, 7, 15, 11, 0),
  },
];

export function CompetitionCalendarModal(){
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };

    
    return (
    <div style={{}}>
      <Box
        sx={{ display: 'inline-block', cursor: 'pointer', }}
        onClick={handleOpen}
      >
        
      </Box>
      <div style={{ height: '40vh' }}>
        <MiniCalendar />
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ 
          width: '80%', 
          margin: 'auto', 
          padding: 2,
          backgroundColor: '#f5f5f5', // Cor de fundo personalizada
          borderRadius: 2,
          boxShadow: 3,
        }}>
          <BigCalendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
            views={['month', 'week', 'day']}
            defaultView="month"
            selectable
          />
          <Button onClick={handleClose}>Close Child Modal</Button>
        </Box>
      </Modal>

    </div>
  );
}
