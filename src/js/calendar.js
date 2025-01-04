const schedule = JSON.parse(localStorage.getItem('schedule')) || [];

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
    // 461
    // calendarId.innerText = "التقويم الدراسي للفصل الأول 1446 هـ - 2024 م";

    // const firstDayHijri = new Date(1446, 2, 14);
    // const firstDayGregorian = new Date(2024, 7, 18); // August 18, 2024

    // let hijriYear = 1446;
    // let hijriMonth = 2;
    // let hijriDay = 13;

    calendarId.innerText = "التقويم الجامعي للفصل الثاني 1446 هـ - 2025 م";

    const firstDayGregorian = new Date(2025, 0, 5); // January 5, 2025

    let hijriYear = 1446;
    let hijriMonth = 7;
    let hijriDay = 4;

    // const events = [
    //     { date: '2/14', description: 'بداية الدراسة للفصل الأول', holiday: false },
    //     { date: '3/19', description: 'إجازة اليوم الوطني', holiday: true },
    //     { date: '3/20', description: 'إجازة اليوم الوطني', holiday: true },
    //     { date: '5/5', description: 'بداية إجازة منتصف الفصل الدراسي الأول', holiday: true },
    //     { date: '5/15', description: 'بداية الدراسة بعد الإجازة', holiday: true },
    //     { date: '6/7', description: 'بداية الاختبارات النهائية لمقررات الإعداد العام', holiday: true },
    //     { date: '6/14', description: 'بداية الاختبارات النهائية', holiday: true },
    //     { date: '6/24', description: 'بداية إجازة منتصف العام', holiday: false },
    // ];

    const events461 = [
        { date: '8/18', hijriDate: '2/14', description: 'بداية الدراسة للفصل الأول', holiday: false },
        { date: '9/19', hijriDate: '3/19', description: 'إجازة اليوم الوطني', holiday: true },
        { date: '9/20', hijriDate: '3/20', description: 'إجازة اليوم الوطني', holiday: true },
        { date: '10/15', hijriDate: '5/5', description: 'بداية إجازة منتصف الفصل الدراسي الأول', holiday: true },
        { date: '10/25', hijriDate: '5/15', description: 'بداية الدراسة بعد الإجازة', holiday: true },
        { date: '11/7', hijriDate: '6/7', description: 'بداية الاختبارات النهائية لمقررات الإعداد العام', holiday: true },
        { date: '11/14', hijriDate: '6/14', description: 'بداية الاختبارات النهائية', holiday: true },
        { date: '11/24', hijriDate: '6/24', description: 'بداية إجازة منتصف العام', holiday: false },
    ];

    const events = [
        { date: '1/5', hijriDate: '7-5', description: 'بداية الدراسة للفصل الثاني', holiday: false },
        { date: '2/23', hijriDate: '8-24', description: 'إجازة يوم التأسيس', holiday: true },
        { date: '3/13', hijriDate: '9-13', description: 'بداية إجازة عيد الفطر', holiday: true },
        { date: '4/6', hijriDate: '10-8', description: 'بداية الدراسة بعد إجازة عيد الفطر', holiday: true },
        { date: '4/17', hijriDate: '10-19', description: 'آخر موعد للاعتذار (سنوي)', holiday: false },
        { date: '5/1', hijriDate: '11-3', description: 'آخر موعد للاعتذار عن الفصل أو مقرر', holiday: false },
        { date: '5/11', hijriDate: '11-13', description: 'بداية الاختبارات النهائية الإعداد العام', holiday: true },
        { date: '5/18', hijriDate: '11-20', description: 'بداية الاختبارات النهائية', holiday: true },
        { date: '5/29', hijriDate: '12-2', description: 'نهاية الاختبارات النهائية', holiday: true },
        { date: '5/29', hijriDate: '12-2', description: 'بداية إجازة نهاية العام الدراسي', holiday: true }
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
            1: 29, 2: 30, 3: 30, 4: 30, 5: 29, 6: 30,
            7: 30, 8: 29, 9: 29, 10: 30, 11: 29, 12: 29
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

    console.log(schedule);
    for (let weekIndex = 1; weekIndex <= 21; weekIndex++) {
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
            let examDay = schedule.find(e => e.examDate.split('-').slice(1).join('-') === hijriDate);
            console.log(examDay);

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
            if(examDay) {
                const examParagraph = document.createElement('span');
                dayBox.classList.add('exam');
                examParagraph.textContent = "فاينل " + examDay.courseCode;
                dayBox.appendChild(examParagraph);
            }

            const dateParagraph = document.createElement('p');
            dateParagraph.textContent = `${hijriDate} / ${gregorianDate}`;
            dayBox.appendChild(dateParagraph);

            weekWrapper.appendChild(dayBox);
        }

        calendarGrid.appendChild(weekWrapper);
    }
});
