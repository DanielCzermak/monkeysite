import { useContext, useState } from "preact/hooks";
import { MonkeyContext } from "../data/monkeyContext";

import MonkeyCardGrid from "./MonkeyCardGrid";
import MonkeyList from "./MonkeyList";

import './MainView.css';

export default function MainView() {
    const monkeys = useContext(MonkeyContext);
    const [presentationMode, setPresentationMode] = useState<'card' | 'list'>("card");

    return (
        <div class="d-flex flex-column jusify-content-evenly align-items-center">
            <div class="d-flex justify-content-between align-items-center w-100 pb-3">
                <a href="/monkeys/new" class="btn btn-primary">Add new 🐒</a>
                <div class="titletext">
                    <h1>Monkey site</h1>
                    <p>Welcome to The Monkey Repository!</p>
                </div>
                <div class="btn-group">
                    <button class={`btn ${presentationMode === "card" ? "" : "btn-notselected"}`}
                        onClick={() => setPresentationMode("card")}>
                        <i class="bi bi-grid"></i>
                    </button>
                    <button class={`btn ${presentationMode === "list" ? "" : "btn-notselected"}`}
                        onClick={() => setPresentationMode("list")}>
                        <i class="bi bi-list-ul"></i>
                    </button>
                </div>
            </div>

            {presentationMode === "card" ? (
                <MonkeyCardGrid monkeys={monkeys.data} />
            ) : (
                <MonkeyList monkeys={monkeys.data} />
            )}
        </div>
    );
}