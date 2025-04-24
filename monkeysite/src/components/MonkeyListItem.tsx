import { Monkey } from "../models/monkey";

import './MonkeyListItem.css';

interface MonkeyListItemProps {
    monkey: Monkey;
}

export default function MonkeyListItem({ monkey }: MonkeyListItemProps) {
    return (
        <a class="list-group-item list-group-item-action d-flex align-items-center" href={`/monkeys/${monkey.id}`}>
            <span class="id-badge me-2 p-1 text-center">
                #{monkey.id.slice(monkey.id.length - 3)}
            </span>
            <div class="me-auto">
                <p class="h5">{monkey.commonName}</p>
                <small class="text-muted">{monkey.getFullLatinName()}</small>
            </div>
        </a>
    );
}