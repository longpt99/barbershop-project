/* eslint-disable no-undef */
document.addEventListener('DOMContentLoaded', () => {
  const calendarEl = document.getElementById('calendar');

  const calendar = new FullCalendar.Calendar(calendarEl, {
    eventClick: function(info) {
      alert('Event: ' + info.event.title);
      info.el.style.borderColor = 'pink';
      debugger
    },
    plugins: ['dayGrid', 'list', 'timeGrid'],
    defaultView: 'timeGridWeek',
  });
  calendar.render();

  document.getElementById('add-event').addEventListener('click', () => {
    const event = {
      title: 'Phuong Thanh Long',
      start: new Date(),
      end: '2020-05-05',
    }
    const data = JSON.parse(localStorage.getItem('date-info'));
    console.log(data)
    if (data) {
      const events = [].concat(data);
      events.push(event)
      localStorage.setItem('date-info', JSON.stringify(events));
    } else {
      localStorage.setItem('date-info', JSON.stringify(evens));
    }
    calendar.addEvent(
       event,
    );
  });

  

});
