import { Monkey } from '../models/monkey';
import MonkeyCard from './MonkeyCard';

interface MonkeyCardGridProps {
    monkeys: Monkey[];
}

export default function MonkeyCardGrid({ monkeys }: MonkeyCardGridProps){
    return (
        <div class={`card-deck row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xxl-4 g-3`}>
            {
                monkeys.map((monkey) => 
                    <div class="col ">
                        <MonkeyCard monkey={monkey} />
                    </div>
                )
            }
        </div>
    );
}