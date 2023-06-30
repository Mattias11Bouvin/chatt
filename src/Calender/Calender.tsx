import React, { useState, useEffect } from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { db } from "../DB/firebase"; // Import your firebase db from your firebase setup
import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";

const localizer = momentLocalizer(moment);

interface Event {
  start: Date,
  end: Date,
  title: string,
  id?: string,
}

const Calendar: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);

  const fetchEvents = async () => {
    const eventsCollectionRef = collection(db, "events");
    const snapshot = await getDocs(eventsCollectionRef);
    const fetchedEvents = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Event));
    setEvents(fetchedEvents);
  }

  const handleSelect = async ({ start, end }: Event) => {
    const title = window.prompt('New Event name');
    if (title) {
      const newEvent: Event = { start, end, title };
      const docRef = await addDoc(collection(db, "events"), newEvent);
      setEvents([...events, { id: docRef.id, ...newEvent }]);
    }
  }

  const handleEventClick = async (event: Event) => {
    const confirm = window.confirm('Would you like to remove this event?');
    if (confirm && event.id) {
      await deleteDoc(doc(db, "events", event.id));
      setEvents(events.filter(e => e.id !== event.id));
    }
  }

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div>
      <BigCalendar
        localizer={localizer}
        selectable
        events={events}
        defaultView='week'
        scrollToTime={new Date(1970, 1, 1, 6)}
        onSelectEvent={event => handleEventClick(event)}
        onSelectSlot={handleSelect}
      />
    </div>
  )
};

export default Calendar;
