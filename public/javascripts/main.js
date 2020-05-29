/* eslint-disable default-case */
/* eslint-disable no-alert */
/* eslint-disable no-undef */
function handleDateEvent(start, now) {
  const startTime = Date.parse(start);
  const nowTime = Date.parse(now);
  if (startTime < nowTime) {
    alert(`You cannot book on this day. 
Please choose the current day`);
    return false;
  }
  return true;
}

document.addEventListener('DOMContentLoaded', async () => {
  let events = null;
  await axios.get('http://localhost:8080/calendar/data').then((res) => {
    events = res.data;
  });
  const date = new Date();
  const filterDateEvents = events.map((event) => {
    const end = new Date(event.end);

    if (Date.parse(end) < Date.parse(date)) {
      event.color = '#64A338';
      event.isDone = true;
    }
    return event;
  });

  // if (date.getHours() > 19) {
  //   const year = date.getFullYear();
  //   const day = date.getDate();
  //   let month = date.getMonth();
  //   switch (month) {
  //     case 0:
  //       month = 'January';
  //       break;
  //     case 1:
  //       month = 'February';
  //       break;
  //     case 2:
  //       month = 'March';
  //       break;
  //     case 3:
  //       month = 'April';
  //       break;
  //     case 4:
  //       month = 'May';
  //       break;
  //     case 5:
  //       month = 'June';
  //       break;
  //     case 6:
  //       month = 'July';
  //       break;
  //     case 7:
  //       month = 'August';
  //       break;
  //     case 8:
  //       month = 'September';
  //       break;
  //     case 9:
  //       month = 'October';
  //       break;
  //     case 10:
  //       month = 'November';
  //       break;
  //     case 11:
  //       month = 'December ';
  //       break;
  //   }

  //   const start = new Date(`${month} ${day}, ${year}, 09:00:00`);
  //   const end = new Date(`${month} ${day}, ${year}, 19:00:00`);

  //   const event = {
  //     start,
  //     end,
  //     allDay: true,
  //     backgroundColor: '#e03b24',
  //     isClose: true,
  //   };
  //   filterDateEvents.push(event);
  // }

  const calendarEl = document.getElementById('calendar');
  const calendar = new FullCalendar.Calendar(calendarEl, {
    plugins: ['dayGrid', 'list', 'timeGrid', 'interaction', 'moment'],
    height: 'auto',
    minTime: '09:00:00',
    maxTime: '19:00:00',
    defaultTimedEventDuration: '00:30',
    defaultView: 'timeGridWeek',

    selectable: true,
    eventLimit: 5,
    selectOverlap: false,
    allDaySlot: false,

    views: {
      timeGridWeek: {
        type: 'timeGrid',
        unselectAuto: false,
      },
      dayGridMonth: {
        type: 'dayGrid',
        selectable: false,
      },
    },

    header: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
    },

    eventClick(info) {
      let { isDone } = info.event.extendedProps;
      if (isClose) {
        alert('We are closing. See you tomorrow!');
        return;
      }
      if (isDone) {
        isDone = 'Done';
      } else {
        isDone = 'pending';
      }
      alert(`Name: ${info.event.title}
Status: ${isDone}`);
    },

    async select(info) {
      const now = new Date();
      const { start, end } = info;

      const result = handleDateEvent(start, now);
      if (!result) {
        return;
      }

      alert('Excellent choice! You can book today...');
      let name = null;
      await axios
        .get('/profile/data')
        .then((res) => {
          name = res.data.name;
          if (!name) throw err;
        })
        .catch((err) => {
          name = prompt('Type your name: ');
        });
      if (name === null) {
        alert('Invalid');
        return;
      }

      const event = {
        title: name,
        start,
        end,
      };

      axios
        .post('http://localhost:8080/calendar/data', event)
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err.message));

      alert(`Thank you for chosen us. See you soon!`);
      calendar.addEvent(event);
    },
  });
  calendar.addEventSource(filterDateEvents);
  calendar.render();
});
