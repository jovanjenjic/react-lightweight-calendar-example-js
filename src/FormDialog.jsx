import * as React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDateTimePicker } from '@mui/x-date-pickers/DesktopDateTimePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

const initialValues = {
  title: null,
  startTimeDate: null,
  endTimeDate: null,
  createdAt: null,
  updatedAt: null
}

// Yup form validation
const validationSchema = yup.object().shape({
  title: yup.string().max(20, 'Title must be at most 20 characters').required('Title is required'),
  startTimeDate: yup
    .date()
    .test('start-time-check', 'Start time cannot be after end time', function(value) {
      const { endTimeDate } = this.parent;
      return !value || !endTimeDate || value <= endTimeDate;
    }),
  endTimeDate: yup
    .date()
    .test('end-time-check', 'End time cannot be before start time', function(value) {
      const { startTimeDate } = this.parent;
      return !value || !startTimeDate || value >= startTimeDate;
    }),
});


const FormDialog = ({ open, setOpen, isEdit, selectedItem, onItemChange, onItemCreate }) => {
  const handleOnSave = (item) => {
    if (isEdit) {
      onItemChange({ ...item });
    } else {
      onItemCreate({ ...item, id: Math.random() * 10 });
    }
    setOpen(false);
  }

  // Formik support form logic
  const formik = useFormik({
    initialValues: selectedItem || initialValues,
    validationSchema: validationSchema,
    onSubmit: handleOnSave,
    enableReinitialize: true,
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Dialog open={open} onClose={() =>  setOpen(false)}>
        <DialogTitle>
            {isEdit ? 'Edit item' : 'Create new item'}
        </DialogTitle>
          <form onSubmit={formik.handleSubmit}>
            <DialogContent>
              <DialogContentText>
                {isEdit ? 'Change the desired fields and edit the current item' : 'Enter the appropriate fields and create a new item'}
              </DialogContentText>
              <FormControl sx={{ m: 1, minWidth: '100%' }}>                
                <TextField
                  fullWidth
                  id="title"
                  name="title"
                  label="Title"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  error={formik.touched.title && Boolean(formik.errors.title)}
                  helperText={formik.touched.title && formik.errors.title}
                  variant="outlined"
                />
              </FormControl>
              <FormControl sx={{ m: 1, minWidth: '100%' }}>                
                <DialogContentText>
                  Start time
                </DialogContentText>
                <DesktopDateTimePicker 
                  className='time-date-picker-element' 
                  name="startTimeDate"
                  value={new Date(formik.values.startTimeDate)}
                  onChange={(val) => formik.setFieldValue('startTimeDate', val ? val.toISOString() : '')}
                  error={formik.touched.startTimeDate && Boolean(formik.errors.startTimeDate)}
                  helperText={formik.touched.startTimeDate && formik.errors.startTimeDate}
                />
              </FormControl>
              <FormControl sx={{ m: 1, minWidth: '100%' }}>     
                <DialogContentText>
                  End time
                </DialogContentText>           
                <DesktopDateTimePicker 
                  className='time-date-picker-element' 
                  name="endTimeDate"
                  value={new Date(formik.values.endTimeDate)}
                  onChange={(val) => formik.setFieldValue('endTimeDate', val ? val.toISOString() : '')}
                  error={formik.touched.endTimeDate && Boolean(formik.errors.endTimeDate)}
                  helperText={formik.touched.endTimeDate && formik.errors.endTimeDate}
                />
              </FormControl>
              {/* Read only field */}
              <FormControl sx={{ m: 1, minWidth: '100%' }}>                
                <DialogContentText>
                  Created at
                </DialogContentText>
                <DesktopDateTimePicker 
                  className='time-date-picker-element' 
                  name="createdAt"
                  value={new Date(formik.values.createdAt)}
                  disabled
                />
              </FormControl>
              {/* Read only field */}
              <FormControl sx={{ m: 1, minWidth: '100%' }}>     
                <DialogContentText>
                  Updated at
                </DialogContentText>           
                <DesktopDateTimePicker 
                  className='time-date-picker-element' 
                  name="updatedAt"
                  value={new Date(formik.values.updatedAt)}
                  disabled
                />
              </FormControl>
              <FormControl sx={{ m: 1, minWidth: '100%' }}>                
                <InputLabel id="demo-simple-select-helper-label">Color</InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={formik.values.bgColor || '#bcdaff'}
                  name="bgColor"
                  label="Color"
                  onChange={formik.handleChange}
                  >
                    <MenuItem value='rgb(247, 123, 123)'>Red</MenuItem>
                    <MenuItem value='#bcdaff'>Blue</MenuItem>
                    <MenuItem value='rgb(175 235 163)'>Green</MenuItem>
                    <MenuItem value='#ffe88f'>Yellow</MenuItem>
                  </Select>
              </FormControl>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpen(false)}>Cancel</Button>
              <Button type="submit">Save</Button>
            </DialogActions>
          </form>
      </Dialog>
    </LocalizationProvider>
  );
}

export default FormDialog;