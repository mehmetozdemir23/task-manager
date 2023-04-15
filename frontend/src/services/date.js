const units = [
    { label: "month", ms: 1000 * 60 * 60 * 24 * 30 },
    { label: "week", ms: 1000 * 60 * 60 * 24 * 7 },
    { label: "day", ms: 1000 * 60 * 60 * 24 }
];

export function formatRemainingTime(dueDate) {

    const dueDatePlusOne = new Date(new Date(dueDate).getTime() + units[2].ms);

    let diff = Math.max(0, dueDatePlusOne - new Date());

    for (const unit of units) {
        const val = Math.floor(diff / unit.ms);
        if (val !== 0) {
            return `${val} ${unit.label}${val > 1 ? "s" : ""}`;
        }
        diff %= unit.ms;
    }

    return "today";
}

export function getRemainingTime(date, precision) {
    const unit = units.find(unit => unit.label == precision);
    const now = new Date();
    const diff = new Date(date).getTime() - now.getTime();
    return Math.floor(diff / unit.ms);
}

export function isOverdue(dueDate) {
    const date = new Date(dueDate);
    let today = new Date(); // get the current date
    let yesterday = new Date(today); // create a new date instance with today's date
    yesterday.setDate(today.getDate() - 1); // set the date to tomorrow's date
    return yesterday > date.getTime();
}