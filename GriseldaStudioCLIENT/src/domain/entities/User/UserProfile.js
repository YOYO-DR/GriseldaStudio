class UserProfile{
  constructor({ user, bio = "", image = "" }={}) {
    this.user = user;
    this.bio = bio;
    this.image = image;
  }
}

export default UserProfile;