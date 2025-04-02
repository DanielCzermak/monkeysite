import { Monkey } from "../models/monkey";

import './MonkeyCard.css';

interface MonkeyCardProps {
    monkey: Monkey;
}

export default function MonkeyCard({ monkey }: MonkeyCardProps){
    return (
        <div class={`card h-100`} id="monkey-card">
            <div class="card-image-container">
                <img src={monkey.imageUrl} 
                     class="card-img-top img-fluid" 
                     alt={monkey.commonName} />
            </div>
            <div class="card-body d-flex flex-column">
                <h5 class="card-title">{monkey.commonName}</h5>
                <h6 class="card-subtitle mb-2 text-muted">{monkey.getFullLatinName()}</h6>
                <p class="card-text">{monkey.description}</p>
                <a href={`/monkeys/${monkey.id}`} class="btn btn-primary mt-auto">See more</a>
            </div>
        </div>
    );
}