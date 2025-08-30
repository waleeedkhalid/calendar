const schedule = JSON.parse(localStorage.getItem("schedule")) || [];

let isDark = JSON.parse(localStorage.getItem("isDark")) || false;

const updateTheme = () => {
  if (isDark) {
    document.body.classList.add("dark-mode");
  } else {
    document.body.classList.remove("dark-mode");
  }
};

updateTheme();

const themeToggle = document.getElementById("themeToggle");
themeToggle.addEventListener("click", () => {
  isDark = !isDark;
  localStorage.setItem("isDark", isDark);
  updateTheme();
});

document.addEventListener("DOMContentLoaded", function () {
  const calendarGrid = document.getElementById("calendar-grid");
  const calendarId = document.getElementById("calendar-id");
  // 461
  // calendarId.innerText = "التقويم الدراسي للفصل الأول 1446 هـ - 2024 م";

  // const firstDayHijri = new Date(1446, 2, 14);
  // const firstDayGregorian = new Date(2024, 7, 18); // August 18, 2024

  // let hijriYear = 1446;
  // let hijriMonth = 2;
  // let hijriDay = 13;

  // calendarId.innerText = "التقويم الجامعي للفصل الثاني 1446 هـ - 2025 م";
  calendarId.innerText = "التقويم الجامعي للفصل الأول 1447هــ - 2026/2025 م";

  const firstDayGregorian = new Date(2025, 7, 24); // August 24, 2025

  let hijriYear = 1447;
  let hijriMonth = 3;
  let hijriDay = 0;
  // Preserve the starting Hijri year so legacy exam dates (without year) don't bleed into a new year
  const startHijriYear = hijriYear;

  // --- One-time migration of legacy examDate values lacking a year ---
  let migrated = false;
  schedule.forEach((e) => {
    if (e && e.examDate && e.examDate.split("-").length === 2) {
      e.examDate = `${startHijriYear}-${e.examDate}`; // prefix starting Hijri year
      migrated = true;
    }
  });
  if (migrated) {
    localStorage.setItem("schedule", JSON.stringify(schedule));
  }

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
    {
      date: "8/18",
      hijriDate: "2/14",
      description: "بداية الدراسة للفصل الأول",
      holiday: false,
    },
    {
      date: "9/19",
      hijriDate: "3/19",
      description: "إجازة اليوم الوطني",
      holiday: true,
    },
    {
      date: "9/20",
      hijriDate: "3/20",
      description: "إجازة اليوم الوطني",
      holiday: true,
    },
    {
      date: "10/15",
      hijriDate: "5/5",
      description: "بداية إجازة منتصف الفصل الدراسي الأول",
      holiday: true,
    },
    {
      date: "10/25",
      hijriDate: "5/15",
      description: "بداية الدراسة بعد الإجازة",
      holiday: true,
    },
    {
      date: "11/7",
      hijriDate: "6/7",
      description: "بداية الاختبارات النهائية لمقررات الإعداد العام",
      holiday: true,
    },
    {
      date: "11/14",
      hijriDate: "6/14",
      description: "بداية الاختبارات النهائية",
      holiday: true,
    },
    {
      date: "11/24",
      hijriDate: "6/24",
      description: "بداية إجازة منتصف العام",
      holiday: false,
    },
  ];

  const events462 = [
    {
      date: "1/5",
      hijriDate: "7-5",
      description: "بداية الدراسة للفصل الثاني",
      holiday: false,
    },
    {
      date: "2/23",
      hijriDate: "8-24",
      description: "إجازة يوم التأسيس",
      holiday: true,
    },
    {
      date: "3/13",
      hijriDate: "9-13",
      description: "بداية إجازة عيد الفطر",
      holiday: true,
    },
    {
      date: "4/6",
      hijriDate: "10-8",
      description: "بداية الدراسة بعد إجازة عيد الفطر",
      holiday: true,
    },
    {
      date: "4/17",
      hijriDate: "10-19",
      description: "آخر موعد للاعتذار عن العام الدراسي و مقرر (سنوي)",
      holiday: false,
    },
    {
      date: "5/1",
      hijriDate: "11-3",
      description: "آخر موعد للاعتذار عن الفصل الدراسي وعن مقرر",
      holiday: false,
    },
    {
      date: "5/11",
      hijriDate: "11-13",
      description: "بداية الاختبارات النهائية لمقررات الإعداد العام",
      holiday: true,
    },
    {
      date: "5/18",
      hijriDate: "11-20",
      description: "بداية الاختبارات النهائية",
      holiday: true,
    },
    {
      date: "5/29",
      hijriDate: "12-2",
      description: "نهاية الاختبارات النهائية",
      holiday: true,
    },
    {
      date: "5/29",
      hijriDate: "12-2",
      description: "بداية إجازة نهاية العام الدراسي",
      holiday: true,
    },
  ];

  const events = [
    {
      date: "8/24",
      hijriDate: "3/1",
      description: "بداية الدراسة للفصل الأول",
      holiday: false,
    },
    {
      date: "9/23",
      hijriDate: "4/1",
      description: "إجازة اليوم الوطني",
      holiday: true,
    },
    {
      date: "11/23",
      hijriDate: "6/2",
      description: "بداية إجازة الخريف",
      holiday: true,
    },
    {
      date: "11/24",
      hijriDate: "6/3",
      description: "إجازة الخريف",
      holiday: true,
    },
    {
      date: "11/25",
      hijriDate: "6/4",
      description: "إجازة الخريف",
      holiday: true,
    },
    {
      date: "11/26",
      hijriDate: "6/5",
      description: "إجازة الخريف",
      holiday: true,
    },
    {
      date: "11/27",
      hijriDate: "6/6",
      description: "إجازة الخريف",
      holiday: true,
    },
    {
      date: "11/30",
      hijriDate: "6/9",
      description: "بداية الدراسة بعد إجازة الخريف",
      holiday: true,
    },
    {
      date: "2025/12/04",
      hijriDate: "6/13",
      description: "تقديم طلب الاعتذار عن مقرر / فصل",
      holiday: false,
    },
    {
      date: "12/14",
      hijriDate: "6/23",
      description: "بداية الاختبارات النهائية لمقررات الإعداد العام",
      holiday: true,
    },
    {
      date: "2025/12/15",
      hijriDate: "6/24",
      description: "تقديم أعذار الغياب للكلية",
      holiday: false,
    },
    {
      date: "12/21",
      hijriDate: "7/1",
      description: "بداية الاختبارات النهائية",
      holiday: true,
    },
    {
      date: "2026/1/1",
      hijriDate: "7/12",
      description: "نهاية الاختبارات النهائية",
      holiday: true,
    },
    {
      date: "2026/1/4",
      hijriDate: "7/15",
      description: "بداية إجازة منتصف العام الدراسي",
      holiday: false,
    },
    {
      date: "2026/1/18",
      hijriDate: "7/29",
      description: "بداية الدراسة للفصل الثاني",
      holiday: false,
    },
  ];

  const events472 = [];

  const events475 = []; // الفصل الصيفي - تدريب بإذن الله

  function getDayName(dayIndex) {
    const days = [
      "الأحد",
      "الإثنين",
      "الثلاثاء",
      "الأربعاء",
      "الخميس",
      "الجمعة",
      "السبت",
    ];
    return days[dayIndex];
  }

  function addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  // Parse "YYYY/MM/DD" into Date
  function parseYMD(str) {
    const [y, m, d] = str.split("/").map(Number);
    return new Date(y, m - 1, d);
  }

  function incrementHijriDate(days) {
    hijriDay += days;
    const hijriMonthDays = {
      1: 30,
      2: 29,
      3: 30,
      4: 30,
      5: 30,
      6: 29,
      7: 30,
      8: 29,
      9: 30,
      10: 29,
      11: 30,
      12: 29,
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
  for (let weekIndex = 1; weekIndex <= 20; weekIndex++) {
    const weekWrapper = document.createElement("div");
    weekWrapper.classList.add("week");

    const weekHeader = document.createElement("h2");
    weekHeader.textContent = `الأسبوع ${weekIndex}`;
    weekWrapper.appendChild(weekHeader);

    for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
      const currentGregorianDate = addDays(
        firstDayGregorian,
        (weekIndex - 1) * 7 + dayIndex
      );
      const hijriDate = incrementHijriDate(1);

      const dayName = getDayName(currentGregorianDate.getDay());
      const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      let day = currentGregorianDate.getDate(); // e.g., 10 or 2 (for 2nd day)
      let month = monthNames[currentGregorianDate.getMonth()]; // e.g., "Jan"

      // Step 4: Ensure the day is a string and add leading zero if it's a single digit
      day = day.toString().padStart(2, "0"); // Convert to string and add leading zero if needed (e.g., "02")

      // Step 5: Combine the day and month using string functions
      let gregorianDate = day.concat(" ", month); // Use concat to join day and month with a space

      // Gather all events for the day using YEAR-AWARE Gregorian match when available
      const normalizedHijri = hijriDate.replace(/\//g, "-");
      const todaysEvents = events.filter((ev) => {
        if (ev.date) {
          const gregParts = ev.date.split("/").map((p) => p.trim());
          if (gregParts.length === 3) {
            // YYYY/MM/DD explicit
            const [gy, gm, gd] = gregParts.map(Number);
            return (
              gy === currentGregorianDate.getFullYear() &&
              gm === currentGregorianDate.getMonth() + 1 &&
              gd === currentGregorianDate.getDate()
            );
          } else if (gregParts.length === 2) {
            // MM/DD legacy (no year) => match only within the same Gregorian academic span (start year or next if month smaller)
            const [gm, gd] = gregParts.map(Number);
            return (
              gm === currentGregorianDate.getMonth() + 1 &&
              gd === currentGregorianDate.getDate()
            );
          }
        }
        // fallback to hijriDate if provided (month-day only)
        if (ev.hijriDate) {
          return (ev.hijriDate || "").replace(/\//g, "-") === normalizedHijri;
        }
        return false;
      });
      // Full current Hijri date WITH year for internal logic (not shown in UI)
      const currentHijriFull = `${hijriYear}-${hijriDate}`; // e.g. 1447-3-1

      // Find an exam whose stored examDate matches current day.
      // Support legacy stored values that may miss the year (e.g. MM-DD) while
      // preferring exact year-month-day matches to avoid cross‑year bleed.
      let examDay = schedule.find((e) => {
        if (!e || !e.examDate) return false;
        const parts = e.examDate.split("-");
        if (parts.length === 3) {
          // Stored as YYYY-M-D (desired new format)
          return e.examDate === currentHijriFull;
        }
        if (parts.length === 2) {
          // Legacy: M-D => only valid for the original startHijriYear to avoid cross-year bleed
          if (hijriYear !== startHijriYear) return false;
          return `${startHijriYear}-${e.examDate}` === currentHijriFull;
        }
        return false;
      });
      console.log(examDay);

      const dayBox = document.createElement("div");
      if (dayIndex === 5) {
        // 0 for Sunday, 6 for Saturday
        dayBox.style.marginTop = "10px"; // Add more top margin for weekend days
      }
      dayBox.classList.add("day-box");

      const dayHeader = document.createElement("h3");
      dayHeader.textContent = dayName;
      dayBox.appendChild(dayHeader);

      todaysEvents.forEach((ev) => {
        const span = document.createElement("span");
        if (ev.holiday && ev.description && ev.description.includes("إجازة")) {
          dayBox.classList.add("holiday");
        } else {
          dayBox.classList.add("event");
        }
        // mark admin events for optional styling
        if (ev.start && ev.end) span.classList.add("admin");
        span.textContent = ev.description;
        dayBox.appendChild(span);
      });
      if (examDay) {
        const examParagraph = document.createElement("span");
        dayBox.classList.add("exam");
        examParagraph.textContent = "فاينل " + examDay.courseCode;
        dayBox.appendChild(examParagraph);
      }

      const dateParagraph = document.createElement("p");

      dateParagraph.textContent = `${hijriDate} / ${gregorianDate}`;
      dayBox.appendChild(dateParagraph);

      // Attach full ISO Gregorian date (year-aware) for downstream scripts (e.g., past/current markers)
      const yyyy = currentGregorianDate.getFullYear();
      const mm = String(currentGregorianDate.getMonth() + 1).padStart(2, "0");
      const dd = String(currentGregorianDate.getDate()).padStart(2, "0");
      dayBox.dataset.date = `${yyyy}-${mm}-${dd}`; // e.g., 2025-08-24

      weekWrapper.appendChild(dayBox);
    }

    calendarGrid.appendChild(weekWrapper);
  }
});
