'use client';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useMemo, useState } from 'react';
import { DailyData, FullCalendarWrapperProps } from '@/app/shared/types/Calendar';
import DailyDetailModal from './modal/DailyDetailModal';

export default function FullCalendarWrapper({ daily }: FullCalendarWrapperProps) {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedDetail, setSelectedDetail] = useState<DailyData | null>(null);

  const handleDateClick = (info: any) => {
    const formattedDate = info.date
      .toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
      .replace(/\. /g, '-')
      .replace(/\./g, ''); // YYYY-MM-DD 형식으로 변환

    const clicked = daily.find((d) => d.date === formattedDate);
    if (clicked) {
      setSelectedDate(formattedDate);
      setSelectedDetail(clicked);
      document.body.style.overflow = 'hidden'; // 스크롤 방지
    } else {
      console.log('No data found for the clicked date.');
    }
  };

  const handleEventClick = (info: any) => {
    const eventDate = info.event.start; // 이벤트의 시작 날짜
    const formattedDate = eventDate
      .toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
      .replace(/\. /g, '-')
      .replace(/\./g, ''); // YYYY-MM-DD 형식으로 변환

    const clicked = daily.find((d) => d.date === formattedDate);
    if (clicked) {
      setSelectedDate(formattedDate);
      setSelectedDetail(clicked);
      document.body.style.overflow = 'hidden'; // 스크롤 방지
    } else {
      console.log('No data found for the clicked date.');
    }
  };

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
        plugins={[dayGridPlugin, interactionPlugin]}
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
        selectable={true}
        dateClick={(info) => handleDateClick(info)}
        eventClick={(info) => handleEventClick(info)}
        height="auto"
      />
      {selectedDate && selectedDetail && (
        <DailyDetailModal
          date={selectedDate}
          income={selectedDetail.income}
          expense={selectedDetail.expense}
          transactions={selectedDetail.transactions || []}
          onClose={() => {
            document.body.style.overflow = 'auto';
            setSelectedDate(null);
          }}
        />
      )}
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
