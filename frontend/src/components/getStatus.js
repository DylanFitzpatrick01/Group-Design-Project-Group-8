// convert status from a number to a string

// 0: offline
// 1: online
// 2: busy
// 3: away
// 4: invisible

export function getStatus(status) {
    switch (status) {
        case 0:
            return "⚫ Offline";
        case 1:
            return "🟢 Online";
        case 2:
            return "🔴 Busy";
        case 3:
            return "🟡 Away";
        case 4:
            return "🔘 Invisible";
        default:
            return "⚫ Offline";
    }
}
