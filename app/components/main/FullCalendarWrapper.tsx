'use client';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { useMemo } from 'react';
import { FullCalendarWrapperProps } from '@/app/shared/types/Calendar';

export default function FullCalendarWrapper({ daily }: FullCalendarWrapperProps) {
  const events = useMemo(() => {
    return daily.flatMap((entry) => {
      const items = [];

      if (entry.income > 0) {
        items.push({
          id: `income-${entry.date}`,
          title: `+${entry.income.toLocaleString()}`,
          date: entry.date,
          type: 'income',
        });
      }

      if (entry.expense > 0) {
        items.push({
          id: `expense-${entry.date}`,
          title: `-${entry.expense.toLocaleString()}`,
          date: entry.date,
          type: 'expense',
        });
      }

      return items;
    });
  }, [daily]);

  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        locale="ko"
        headerToolbar={{
          left: 'prev,next',
          center: 'title',
          right: 'today',
        }}
        events={events}
        eventContent={(arg) => {
          const isIncome = arg.event.extendedProps.type === 'income';
          const bgColor = isIncome ? 'bg-income' : 'bg-expense';

          return (
            <div className={`truncate rounded px-1 text-xs font-medium text-white ${bgColor}`}>
              {arg.event.title}
            </div>
          );
        }}
        height="auto"
      />
      <style jsx global>{`
        .fc-h-event {
          background-color: transparent !important;
          border: none !important;
        }
        .fc-toolbar {
          margin-left: 12px !important;
          margin-right: 12px !important;
        }
      `}</style>
    </>
  );
}
