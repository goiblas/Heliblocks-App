import firebase from "../firebase";

class User {
    constructor({ uid, photoURL, displayName, providerData }) {
        this.uid = uid
        this.displayName = displayName || providerData[0].displayName || "Unknown"
        this.photoURL =  photoURL
    }
}

class UserLogged extends User {
    constructor({ user, additionalUserInfo }) {
        super(user)
        
        this.email = user.email
        this.profile = additionalUserInfo.profile
    }
}

class Auth {
    _currentUser = null;
    _observers = new Set();

    constructor() {
            this._auth = firebase.auth()
            this._auth.onAuthStateChanged((user) => {
                this.currentUser = user
                this._notifyAll()
            }
        )
    }
    set currentUser(user) {
        this._currentUser = user ? new User(user) : null
    }
    get currentUser() {
        return this._currentUser
    }
    _notifyAll() {
        this._observers.forEach(observer => observer(this.currentUser))
    }
    onStateChanged(fn) {
        this._observers.add(fn)
    }
    async signInWithGithub() {
        const provider = new firebase.auth.GithubAuthProvider()
        provider.addScope("user")
        const user = await this._auth.signInWithPopup(provider)
        return new UserLogged(user)
    }
    signOut() {
        return this._auth.signOut()
    }
}

export default new Auth();