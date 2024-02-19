// user model
    // add functions for updating user details
class User {
    constructor(activeStatus, avatar, bio, courseTitle, email, name, yearOfStudy) {
        this.activeStatus = activeStatus;
        this.avatar = avatar;
        this.bio = bio;
        this.courseTitle = courseTitle;
        this.email = email;
        this.name = name;
        this.yearOfStudy = yearOfStudy;
    }
}

export default User;