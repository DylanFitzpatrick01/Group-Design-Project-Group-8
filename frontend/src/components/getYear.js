// convert student's year from a number to a string

// 1: freshman
// 2: sophomore
// 3: junior
// 4: senior
// 5: graduate
// 6: other

export function getYear(year) {
    switch (year) {
        case 1:
            return "Freshman";
        case 2:
            return "Sophomore";
        case 3:
            return "Junior";
        case 4:
            return "Senior";
        case 5:
            return "Graduate";
        case 6:
            return "Other";
        default:
            return "unknown";
    }
}