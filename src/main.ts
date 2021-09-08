import app from "./ts/game";
import './style.css';
import { $ } from "./ts/lib/dom";
import { auth, db, provider } from "./ts/lib/firebase";
import { setGameData, setUser, store } from "./ts/redux";


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

$<HTMLElement>("#game")?.appendChild(app.view);


$<HTMLElement>("#signInBtn")?.addEventListener("click", () => {
  auth.signInWithPopup(provider)
    .catch(console.error)
});


$<HTMLElement>("#signOutBtn")?.addEventListener("click", () => {
  auth.signOut()
    .then(() => {
      store.dispatch(setUser({ uid: "" }));
    })
    .catch(console.error)
});


auth.onAuthStateChanged(user => {
  if (user) {
    $<HTMLElement>("#signedIn")!.hidden = false;
    $<HTMLElement>("#signedOut")!.hidden = true;
    $<HTMLElement>("#userDetails")!.innerHTML = `<h3>Hello ${user.displayName}</h3>`;
    
    // Set the uid
    store.dispatch(setUser({ uid: user.uid }));
    
    // Set the global game features: AUD or VIS
    db.ref("_gamedata").once('value')
      .then((snap) => {
        store.dispatch(setGameData(snap.val()))
      });
    
    //
    const userRef = db.ref(user.uid);
    userRef.once('value', (snap) => {
      const userData = snap.val();
      if (!userData) {
        userRef.child("passSeq").set("generaterandompassswquence");
      }
    });

  } else {
    $<HTMLElement>("#signedIn")!.hidden = true;
    $<HTMLElement>("#signedOut")!.hidden = false;
    $<HTMLElement>("#userDetails")!.innerHTML = ``;
  }
});
