import UserProfile from "./UserProfile";

class User {
  constructor({ id, email, username, first_name, last_name, profile }) {
    this.id = id;
    this.email = email;
    this.username = username;
    this.first_name = first_name;
    this.last_name = last_name;
    this.profile = profile;
  }

  static getUser() {
    const storedUser = JSON.parse(localStorage.getItem("auth"))?.user || null;

    if (!storedUser) return null;

    const storedProfile = storedUser.profile
      ? new UserProfile({ user: storedUser, ...{ bio: storedUser.profile.bio, image: storedUser.profile.image } })
      : new UserProfile(storedUser);
    
    return new User({...storedUser, profile: storedProfile});
  }

  
}

export default User;
