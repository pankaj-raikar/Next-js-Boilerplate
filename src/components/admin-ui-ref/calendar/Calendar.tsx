'use client';
import type {
  DateSelectArg,
  EventClickArg,
  EventContentArg,
} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import React, { useEffect, useState } from 'react';
import { Modal } from '@/components/admin-ui-ref/ui/modal';
import { useModal } from '@/hooks/useModal';

type CalendarEvent = {
  id: string;
  title: string;
  start: string; // ISO string
  end?: string;
  allDay?: boolean;
  extendedProps: {
    calendar: string;
  };
  [key: string]: unknown; // Allow additional properties
};

type CalendarEventLevel = 'Danger' | 'Success' | 'Primary' | 'Warning';

type CalendarEventFormData = {
  id?: string;
  title: string;
  start: string;
  end: string | undefined;
  level: CalendarEventLevel;
};

const CALENDAR_EVENTS = {
  Danger: 'danger',
  Success: 'success',
  Primary: 'primary',
  Warning: 'warning',
} as const;

const Calendar: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [formData, setFormData] = useState<CalendarEventFormData>({
    title: '',
    start: '',
    end: '',
    level: 'Primary', // Default level
  });
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { isOpen, openModal, closeModal } = useModal();

  useEffect(() => {
    const loadInitialEvents = () => {
      const initialEvents: CalendarEvent[] = [
        {
          id: '1',
          title: 'Event Conf.',
          start: new Date().toISOString(),
          extendedProps: { calendar: 'Danger' },
        },
        {
          id: '2',
          title: 'Meeting',
          start: new Date(Date.now() + 86400000).toISOString(),
          extendedProps: { calendar: 'Success' },
        },
        {
          id: '3',
          title: 'Workshop',
          start: new Date(Date.now() + 172800000).toISOString(),
          end: new Date(Date.now() + 259200000).toISOString(),
          extendedProps: { calendar: 'Primary' },
        },
      ];
      return initialEvents;
    };

    setEvents(loadInitialEvents());
  }, []);

  const resetModalFields = React.useCallback(() => {
    setFormData({
      title: '',
      start: '',
      end: '',
      level: 'Primary',
    });
    setSelectedEvent(null);
    setError(null);
  }, []);

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    resetModalFields();
    setFormData(prev => ({
      ...prev,
      start: selectInfo.startStr,
      end: selectInfo.endStr || selectInfo.startStr,
      level: 'Primary',
    }));
    openModal();
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    const event = clickInfo.event as unknown as CalendarEvent;
    const eventStartDate
      = (clickInfo.event.startStr ?? '').split('T')[0] ?? '';
    const eventEndDate
      = (clickInfo.event.endStr ?? '').split('T')[0] ?? '';

    setSelectedEvent(event);
    setFormData({
      id: event.id,
      title: event.title,
      start: eventStartDate,
      end: eventEndDate,
      level: (event.extendedProps?.calendar as CalendarEventLevel) || 'Primary',
    });
    openModal();
  };

  const validateForm = (): boolean => {
    if (!formData.title.trim()) {
      setError('Event title is required');
      return false;
    }
    if (!formData.start) {
      setError('Start date is required');
      return false;
    }
    if (formData.end && new Date(formData.end) < new Date(formData.start)) {
      setError('End date must be after start date');
      return false;
    }
    return true;
  };

  const handleAddOrUpdateEvent = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      if (selectedEvent) {
        // Update existing event
        setEvents(prevEvents =>
          prevEvents.map(event =>
            event.id === selectedEvent.id
              ? {
                  ...event,
                  title: formData.title,
                  start: formData.start,
                  end: formData.end || undefined,
                  extendedProps: { calendar: formData.level },
                }
              : event,
          ),
        );
      } else {
        // Add new event
        const newEvent: CalendarEvent = {
          id: Date.now().toString(),
          title: formData.title,
          start: formData.start,
          end: formData.end || undefined,
          allDay: true,
          extendedProps: { calendar: formData.level },
        };
        setEvents(prevEvents => [...prevEvents, newEvent]);
      }
      closeModal();
      resetModalFields();
    } catch (err) {
      setError('Failed to save event. Please try again.');
      console.error('Error saving event:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderEventContent = (eventInfo: EventContentArg) => {
    const event = eventInfo.event as unknown as CalendarEvent;
    const colorClass = `fc-bg-${event.extendedProps.calendar.toLowerCase()}`;
    const timeText = eventInfo.timeText || '';
    const title = event.title || '';

    return (
      <div
        className={`event-fc-color flex ${colorClass} rounded-sm p-1`}
        aria-label={`${title} ${timeText}`}
      >
        <div className="mr-1 h-2 w-2 rounded-full bg-white/80" aria-hidden="true" />
        {timeText && (
          <span className="mr-1 text-xs" aria-hidden="true">
            {timeText}
          </span>
        )}
        <span className="truncate">{title}</span>
      </div>
    );
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3">
      {error && (
        <div
          className="mb-4 rounded-lg bg-red-50 p-4 text-sm text-red-700 dark:bg-red-900/20 dark:text-red-200"
          role="alert"
        >
          {error}
        </div>
      )}
      <div className="custom-calendar">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: 'prev,next addEventButton',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
          }}
          events={events}
          selectable={true}
          select={handleDateSelect}
          eventClick={handleEventClick}
          eventContent={renderEventContent}
          customButtons={{
            addEventButton: {
              text: 'Add Event +',
              click: () => {
                resetModalFields();
                openModal();
              },
            },
          }}
          dayHeaderFormat={{ weekday: 'short' }}
        />
      </div>
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        className="max-w-[700px] p-6 lg:p-10"
      >
        <div className="flex custom-scrollbar flex-col overflow-y-auto px-2">
          <div>
            <h5 className="mb-2 text-xl font-semibold text-gray-800 lg:text-2xl dark:text-white/90">
              {selectedEvent ? 'Edit Event' : 'Add Event'}
            </h5>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Plan your next big moment: schedule or edit an event to stay on track
            </p>
          </div>
          <div className="mt-8">
            <div className="mb-6">
              <label htmlFor="event-title" className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                Event Title
              </label>
              <input
                id="event-title"
                type="text"
                value={formData.title}
                onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-sm placeholder:text-gray-400 focus:border-brand-300 focus:ring-2 focus:ring-brand-500/20 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                aria-required="true"
                aria-invalid={!formData.title.trim()}
                aria-describedby={!formData.title.trim() ? 'title-error' : undefined}
              />
              {!formData.title.trim() && (
                <p id="title-error" className="mt-1 text-sm text-red-500">
                  Event title is required
                </p>
              )}
            </div>
            <div className="mb-6">
              <span className="mb-4 block text-sm font-medium text-gray-700 dark:text-gray-400">
                Event Color
              </span>
              <div className="flex flex-wrap gap-4">
                {Object.entries(CALENDAR_EVENTS).map(([key, value]) => (
                  <label
                    key={key}
                    className="flex cursor-pointer items-center text-sm text-gray-700 dark:text-gray-400"
                  >
                    <input
                      type="radio"
                      name="event-level"
                      value={key}
                      className="sr-only"
                      checked={formData.level === key}
                      onChange={() => setFormData(prev => ({ ...prev, level: key as CalendarEventLevel }))}
                    />
                    <span className="relative mr-2 flex h-5 w-5 items-center justify-center rounded-full border border-gray-300 dark:border-gray-700">
                      <span
                        className={`h-3 w-3 rounded-full ${value === 'danger' ? 'bg-red-500' : value === 'success' ? 'bg-green-500' : value === 'primary' ? 'bg-blue-500' : 'bg-yellow-500'} ${formData.level === key ? 'opacity-100' : 'opacity-0'}`}
                        aria-hidden="true"
                      />
                    </span>
                    {key}
                  </label>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="event-start-date" className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                Start Date
              </label>
              <div className="relative">
                <input
                  id="event-start-date"
                  type="date"
                  value={formData.start}
                  onChange={e => setFormData(prev => ({ ...prev, start: e.target.value }))}
                  className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-sm placeholder:text-gray-400 focus:border-brand-300 focus:ring-2 focus:ring-brand-500/20 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                  aria-required="true"
                  aria-invalid={!formData.start}
                  aria-describedby={!formData.start ? 'start-date-error' : undefined}
                />
                {!formData.start && (
                  <p id="start-date-error" className="mt-1 text-sm text-red-500">
                    Start date is required
                  </p>
                )}
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="event-end-date" className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                End Date (optional)
              </label>
              <div className="relative">
                <input
                  id="event-end-date"
                  type="date"
                  value={formData.end}
                  min={formData.start}
                  onChange={e => setFormData(prev => ({ ...prev, end: e.target.value }))}
                  className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-sm placeholder:text-gray-400 focus:border-brand-300 focus:ring-2 focus:ring-brand-500/20 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                />
              </div>
            </div>
          </div>
          <div className="mt-8 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={closeModal}
              className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus:outline-none disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:focus:ring-offset-gray-900"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleAddOrUpdateEvent}
              disabled={isSubmitting}
              className="flex items-center justify-center rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus:outline-none disabled:opacity-50 dark:bg-brand-600 dark:hover:bg-brand-700 dark:focus:ring-offset-gray-900"
            >
              {isSubmitting
                ? (
                    <>
                      <svg className="mr-2 -ml-1 h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {selectedEvent ? 'Updating...' : 'Saving...'}
                    </>
                  )
                : selectedEvent
                  ? (
                      'Update Event'
                    )
                  : (
                      'Add Event'
                    )}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Calendar;
