import app from "./ts/game";
import './style.css';

document.querySelector("#app")!.innerHTML = `
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

document.querySelector("#game")?.appendChild(app.view);