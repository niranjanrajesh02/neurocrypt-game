import app from "./ts/game";
import './style.css';
import { $ } from "./ts/lib/dom";
import { auth, provider } from "./ts/lib/firebase";
import { setUser, store } from "./ts/redux";


$("#app")!.innerHTML = `
    <nav style="background-color: #444444; margin-bottom: 2rem;">
    <ul
    style="
        font-size: large;
        font-family: 'pixel', sans-serif;
        list-style-type: none;
        display: flex;
        justify-content: space-between;
    ">
        <li style="padding: 1rem">SASTA GUITAR HERO PRO</li>
        
        <li style="padding: 1rem; display: flex">
            <section id="signedOut">
                <div style="display: flex; gap: 2rem; align-items: flex-start">
                    <div id="loginToPlay"></div>
                    <button id="signInBtn">login</button>
                </div>
            </section>

            <section id="signedIn" hidden="true">
                <div style="display: flex; gap: 2rem; align-items: flex-start">
                    <div id="userDetails"></div>
                    <button id="signOutBtn">logout</button>
                </div>
            </section>
        </li>
    </ul>
    </nav>
    <div id="game"></div>
`

$("#game")?.appendChild(app.view);

$("#signInBtn")?.addEventListener("click", () => {
    auth.signInWithPopup(provider)
        .then(res => {
            store.dispatch(setUser({ uid: res.user?.uid }));
        })
        .catch(console.error)
});

$("#signOutBtn")?.addEventListener("click", () => {
    auth.signOut()
        .then(() => {
            store.dispatch(setUser({ uid: "" }));
        });
});

auth.onAuthStateChanged(user => {
    if (user) {
        $<HTMLElement>("#signedIn")!.hidden = false;
        $<HTMLElement>("#signedOut")!.hidden = true;
        $<HTMLElement>("#userDetails")!.innerHTML = `<h3>Hello ${user.displayName}</h3>`;
        store.dispatch(setUser({ uid: user.uid }));
    } else {
        $<HTMLElement>("#signedIn")!.hidden = true;
        $<HTMLElement>("#signedOut")!.hidden = false;
        $<HTMLElement>("#userDetails")!.innerHTML = ``;
        store.dispatch(setUser({ uid: "" }));
    }
})