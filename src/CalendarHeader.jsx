import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const views = [
  { value: 'WEEK_TIME', label: 'Week time' }, 
  { value: 'DAY', label: 'Day'}, 
  { value: 'MONTH', label: 'Month' },
  { value: 'WEEK', label: 'Week' },
  { value: 'WEEK_IN_PLACE', label: 'Week in place' },
  { value: 'DAY_IN_PLACE', label: 'Day in place' }
];
const days = [
  { value: 0, label: 'Sunday' },
  { value: 1, label: 'Monday' },
  { value: 2, label: 'Tuesday' },
  { value: 3, label: 'Wednesday' },
  { value: 4, label: 'Thursday' },
  { value: 5, label: 'Friday' },
  { value: 6, label: 'Saturday' }
];

const timeDateFields = [
  { value: 'startTimeDate-endTimeDate', label:'Start time - end time' },
  { value: 'createdAt-updatedAt', label:'Created at - updated at' },
  { value: 'startTimeDate', label: 'Start time' },
  { value: 'endTimeDate', label: 'End time date' }, 
];

const CalendarHeader = ({ currentView, setCurrentView, setWeekStartsOn, setActiveTimeDateField }) => {
  return (
    <div className="calendar-header">
      <FormControl sx={{ m: 1, minWidth: 160 }} size="small">
        <InputLabel id="demo-select-small-label">Views</InputLabel>
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          value={currentView}
          onChange={(e) => setCurrentView(e.target.value)}
          label="Views"
        >
          {views.map((view) => (
            <MenuItem value={view.value}>{view.label}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 160 }} size="small">
        <InputLabel id="demo-select-small-label">Week starts on</InputLabel>
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          defaultValue={1}
          onChange={(e) => setWeekStartsOn(e.target.value)}
          label="Week starts on"
        >
          {days.map((day) => (
            <MenuItem value={day.value}>{day.label}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 160 }} size="small">
        <InputLabel id="demo-select-small-label">Active time date field</InputLabel>
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          defaultValue="startTimeDate-endTimeDate"
          onChange={(e) => setActiveTimeDateField(e.target.value)}
          label="Active time date field"
        >
          {timeDateFields.map((timeDateField) => (
            <MenuItem value={timeDateField.value}>{timeDateField.label}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default CalendarHeader;