import React from "react";
import CalendarComponent from "react-lightweight-calendar";
import { data } from "./data";
import CustomizationComponent from "./CustomizationComponent";
import FormDialog from "./FormDialog";
import './Calendar.css';

function Calendar() {
  const [calendarData, setCalendarData] = React.useState(data);
  const [currentDate, setCurrentDate] = React.useState("2023-06-02");
  const [activeTimeDateField , setActiveTimeDateField ] = React.useState('startTimeDate-endTimeDate');
  const [currentView, setCurrentView] = React.useState('WEEK_TIME');
  const [weekStartsOn, setWeekStartsOn] = React.useState(1);
  const [open, setOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState({});

  React.useEffect(() => {
    if (!open) {
      setSelectedItem({});
    }
  }, [open]);

  const onItemChange = (newItem) => {
    setCalendarData((prevData) => prevData.map(item => item.id === newItem.id ? { ...newItem, updatedAt: new Date().toISOString()} : item));
  }

  const onItemCreate = (newItem) => {
    setCalendarData(prevData => [...prevData, newItem]);
  }

  return (
    <div className="calendar-wrapper">
      <CustomizationComponent 
        currentView={currentView}
        setCurrentView={setCurrentView}
        setWeekStartsOn={setWeekStartsOn}
        setActiveTimeDateField={setActiveTimeDateField}
      />
      <CalendarComponent
        data={calendarData}
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
        activeTimeDateField={activeTimeDateField}
        currentView={currentView}
        weekStartsOn={weekStartsOn}
        onItemClick={(item) => {
            setOpen(true);
            setSelectedItem(item) 
        }}
        onCellClick={(dateInfo) => {
          const utcTimeDate = new Date(dateInfo.timeDateUTC);
          const addedHour = new Date(utcTimeDate.setHours(utcTimeDate.getHours() + 1)).toISOString();
            setOpen(true);
            setSelectedItem({
              title: null,
              startTimeDate: dateInfo.timeDateUTC,
              endTimeDate: addedHour,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            }) 
        }}
        onDayNumberClick={(val) => {
          setCurrentDate(val);
          setCurrentView('DAY');
        }}
        onDayStringClick={(val) => {
          setCurrentDate(val);
          setCurrentView('DAY');
        }}
        timeDateFormat={{
          day: 'eeeeee',
          monthYear: 'LLL y'
        }}      
      />
      {/* Form dialog for created new item or editing existing one */}
      <FormDialog 
        open={open} 
        setOpen={setOpen}
        isEdit={!!selectedItem?.id}
        selectedItem={selectedItem}
        onItemChange={onItemChange}
        onItemCreate={onItemCreate}
      />
    </div>
  );
}

export default Calendar;
