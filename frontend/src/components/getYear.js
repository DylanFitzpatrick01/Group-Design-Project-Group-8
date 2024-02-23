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
            return "Junior Freshman (Year 1)";
        case 2:
            return "Senior Freshman (Year 2)";
        case 3:
            return "Junior Sophister (Year 3)";
        case 4:
            return "Senior Sophister (Year 4)";
        case 5:
            return "Master";
        case 6:
            return "PhD";
        case 7:
            return "Other";
        default:
            return "unknown";
    }
}