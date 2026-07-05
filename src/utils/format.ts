// To get initials from a name.
export function formatInitials(name: string): string {
    return name.split(" ")
    .map((part: string) => part[0])
    .splice(0, 2)
    .join("")
    .toUpperCase();
}

// Formats a full number in a currency format, e.g., 10000 becomes $10,000.00
export function formatEstimatedValue(estimatedValue: number): string {
    return Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'})
    .format(estimatedValue);
}

// Formats a date string into a more readable format, and alsos calculates how long ago it was from the current date.
export function formatLastContactAt(lastContactAt: string): string {
const  date = new Date(lastContactAt);
const now = new Date();
const diffInMs = now.getTime() - date.getTime();
const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
if (diffInHours >= 24) {
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} days ago`;
} else {
    return `${diffInHours} hours ago`;
}
}