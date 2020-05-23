/* eslint-disable no-undef */
document.addEventListener('DOMContentLoaded', () => {
  const calendarEl = document.getElementById('calendar');
  const calendar = new FullCalendar.Calendar(calendarEl, {
    plugins: ['dayGrid', 'list', 'timeGrid', 'interaction'],
    height: 'auto',
    slotDuration: '01:00:00',
    minTime: '09:00:00',
    maxTime: '19:00:00',
    defaultView: 'timeGridWeek',
    selectMirror: true,
    selectable: true,

    eventClick(info) {
      console.log(info)
      alert(`Event: ${info.event.title}`);
      info.el.style.borderColor = 'pink';
    },

    dateClick(info) {
      alert(`Date: ${info.date}`);
      const event = {
        title: 'Phuong Thanh Long',
        start: info.dateStr,
      };
      const data = JSON.parse(localStorage.getItem('date-info'));
      if (data) {
        const events = [].concat(data);
        events.push(event);
        localStorage.setItem('date-info', JSON.stringify(events));
      } else {
        localStorage.setItem('date-info', JSON.stringify(event));
      }
      calendar.addEvent(event);
    },
  });

  calendar.render();
});
