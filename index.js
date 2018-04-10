const ical2json = require('ical2json');
const fs = require('fs');
const moment = require('moment');

const icalCalendarData = fs.readFileSync(__dirname + '/data/Nieuwstraat_77_Denderhoutem.ics', {'encoding': 'utf-8'});

// From ical to JSON
var jsonCalendarData = ical2json.convert(icalCalendarData);

// loop every event and substract one day, change name to task
jsonCalendarData.VCALENDAR[0].VEVENT.forEach(event => {
	event.DTSTART = moment(event.DTSTART, 'YYYYMMDD').subtract(1, 'days').format('YYYYMMDD');
	event.SUMMARY = event.SUMMARY.replace('Ophaling', 'Buitenzetten');
});

// From JSON to ical
var icalOutput = ical2json.revert(jsonCalendarData);

fs.writeFileSync(__dirname + '/data/Nieuwstraat_77_Denderhoutem_TODO.ics', icalOutput);