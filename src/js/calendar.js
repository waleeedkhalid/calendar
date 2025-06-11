let isDark = JSON.parse(localStorage.getItem('isDark')) || false;

const updateTheme = () => {
    if (isDark) {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
};

updateTheme();

const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
    isDark = !isDark;
    localStorage.setItem('isDark', isDark);
    updateTheme();
});


document.addEventListener('DOMContentLoaded', function() {
    const calendarGrid = document.getElementById('calendar-grid');
    const calendarId = document.getElementById('calendar-id');
    
    // calendarId.innerText = "التقويم الجامعي للفصل الثاني 1446 هـ - 2025 م";
    calendarId.innerText = "تقويم الإجازة الصيفية 1446 هـ - 2025 م";

    // const firstDayGregorian = new Date(2025, 0, 5); // January 5, 2025
    const firstDayGregorian = new Date(2025, 5, 8); // July 8, 2025

    let hijriYear = 1446;
    let hijriMonth = 12;
    let hijriDay = 11;

    const events = [
        { date: '6/15', hijriDate: '12-19', description: 'بداية التهيئة للفصل الصيفي', holiday: false },
        { date: '6/17', hijriDate: '12-21', description: 'بداية الدراسة للفصل الصيفي', holiday: false },
        { date: '8/5', hijriDate: '2-11', description: 'بداية الاختبارات النهائية', holiday: false },
        { date: '8/7', hijriDate: '2-13', description: 'نهاية الاختبارات النهائية', holiday: false },
        { date: '8/17', hijriDate: '2-23', description: 'عودة أعضاء هيئة التدريس', holiday: false },
        { date: '8/18', hijriDate: '2-25', description: 'نزول الجدول للمتخصصين بعد المغرب', holiday: false },
        { date: '8/19', hijriDate: '2-26', description: 'فتح التعديل جداول المتخصصين', holiday: false },
        { date: '8/24', hijriDate: '3-1', description: 'بداية الدراسة للعام الجامعي 1447 هـ / 2026-2027', holiday: false }
    ];

    function getDayName(dayIndex) {
        const days = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
        return days[dayIndex];
    }

    function addDays(date, days) {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }

    function incrementHijriDate(days) {
        hijriDay += days;
        const hijriMonthDays = {
            1: 30, 2: 29, 3: 30, 4: 30, 5: 30, 6: 29,
            7: 30, 8: 29, 9: 30, 10: 29, 11: 30, 12: 29
        };

        while (hijriDay > hijriMonthDays[hijriMonth]) {
            hijriDay -= hijriMonthDays[hijriMonth];
            hijriMonth++;
            if (hijriMonth > 12) {
                hijriMonth = 1;
                hijriYear++;
            }
        }

        return `${hijriMonth}-${hijriDay}`;
    }

    for (let weekIndex = 1; weekIndex <= 12; weekIndex++) {
        const weekWrapper = document.createElement('div');
        weekWrapper.classList.add('week');

        const weekHeader = document.createElement('h2');
        weekHeader.textContent = `الأسبوع ${weekIndex}`;
        weekWrapper.appendChild(weekHeader);

        for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
            const currentGregorianDate = addDays(firstDayGregorian, (weekIndex - 1) * 7 + dayIndex);
            const hijriDate = incrementHijriDate(1);

            const dayName = getDayName(currentGregorianDate.getDay());
            const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            let day = currentGregorianDate.getDate(); // e.g., 10 or 2 (for 2nd day)
            let month = monthNames[currentGregorianDate.getMonth()]; // e.g., "Jan"
            
            // Step 4: Ensure the day is a string and add leading zero if it's a single digit
            day = day.toString().padStart(2, '0'); // Convert to string and add leading zero if needed (e.g., "02")
            
            // Step 5: Combine the day and month using string functions
            const gregorianDate = day.concat(" ", month); // Use concat to join day and month with a space
            
            const event = events.find(e => e.hijriDate === hijriDate);

            const dayBox = document.createElement('div');
            if (dayIndex === 5) { // 0 for Sunday, 6 for Saturday
                dayBox.style.marginTop = '10px'; // Add more top margin for weekend days
            }
            dayBox.classList.add('day-box');

            const dayHeader = document.createElement('h3');
            dayHeader.textContent = dayName;
            dayBox.appendChild(dayHeader);

            if (event) {
                const eventParagraph = document.createElement('span');
                if(event.holiday && event.description.includes('إجازة'))
                    dayBox.classList.add('holiday');
                else
                    dayBox.classList.add('event');

                eventParagraph.textContent = event.description;
                dayBox.appendChild(eventParagraph);
            }

            const dateParagraph = document.createElement('p');
            dateParagraph.textContent = `${hijriDate} / ${gregorianDate}`;
            dayBox.appendChild(dateParagraph);

            weekWrapper.appendChild(dayBox);
        }

        calendarGrid.appendChild(weekWrapper);
    }
});
