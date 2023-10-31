export default function useTimeStamp(timeStamp) {
    const currentDate = new Date();
    const timestamp = new Date(timeStamp);
    const timeDifference = currentDate - timestamp;

    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    if (seconds < 5) {
        return "a few seconds ago";
    } else if (seconds < 60) {
        return seconds === 1 ? "a second ago" : seconds + " seconds ago";
    } else if (minutes < 60) {
        return minutes === 1 ? "a minute ago" : minutes + " minutes ago";
    } else if (hours < 24) {
        return hours === 1 ? "an hour ago" : hours + " hours ago";
    } else if (days < 7) {
        return days === 1 ? "a day ago" : days + " days ago";
    } else if (months < 1) {
        return days < 14 ? "a week ago" : days / 7 + " weeks ago";
    } else if (months < 12) {
        return months === 1 ? "a month ago" : months + " months ago";
    } else {
        return years === 1 ? "a year ago" : years + " years ago";
    }
}
