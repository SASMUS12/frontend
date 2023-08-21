import {action, makeObservable, observable} from "mobx";

class LoggedIn {
    loggedIn = false;

    constructor() {
        makeObservable<LoggedIn>(this, {
            loggedIn: observable,
            setLoggedInTrue: action,
            setLoggedInFalse: action,
        })
    }

    setLoggedInTrue() {
        this.loggedIn = true;
    }

    setLoggedInFalse() {
        this.loggedIn = false;
    }
}

export const loggedIn = new LoggedIn();
