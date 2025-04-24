import { Monkey } from "../models/monkey";

import MonkeyListItem from "./MonkeyListItem";

interface MonkeyListProps {
    monkeys: Monkey[];
}

export default function MonkeyList({ monkeys }: MonkeyListProps) {
    return (
        <div class="list-group w-100" id="monkey-list">
            {monkeys.map(monkey => 
                <MonkeyListItem monkey={monkey} />
                )
            }
        </div>
    );
}