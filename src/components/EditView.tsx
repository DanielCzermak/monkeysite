import { useContext, useState, useEffect } from 'preact/hooks';
import { route } from 'preact-router';

import { MonkeyContext } from '../data/monkeyContext';
import { Monkey } from '../models/monkey';

interface EditViewProps {
    id: string;
}

interface MonkeyProps {
    commonName: string;
    genus: string;
    species: string;
    subSpecies: string;
    avgLifespan: number;
    habitat: string;
    description: string;
    imageUrl: string;
}

export default function EditView({ id }: EditViewProps) {
    const monkeys = useContext(MonkeyContext);
    const monkeyId = parseInt(id, 10);
    const selectedMonkey = monkeys.data.find(monkey => monkey.id === monkeyId);
    const [previewImageUrl, setPreviewImageUrl] = useState<string>(selectedMonkey?.imageUrl || '');
    const [monkey, setMonkey] = useState<MonkeyProps>({
        commonName: selectedMonkey?.commonName || '',
        genus: selectedMonkey?.genus || '',
        species: selectedMonkey?.species || '',
        subSpecies: selectedMonkey?.subSpecies || '',
        avgLifespan: selectedMonkey?.avgLifespan || 0,
        habitat: selectedMonkey?.habitat || '',
        description: selectedMonkey?.description || '',
        imageUrl: selectedMonkey?.imageUrl || ''
    });

    useEffect(() => {
        if (selectedMonkey) {
            setPreviewImageUrl(selectedMonkey.imageUrl);
            setMonkey({
                commonName: selectedMonkey.commonName || '',
                genus: selectedMonkey.genus || '',
                species: selectedMonkey.species || '',
                subSpecies: selectedMonkey.subSpecies || '',
                avgLifespan: selectedMonkey.avgLifespan || 0,
                habitat: selectedMonkey.habitat || '',
                description: selectedMonkey.description || '',
                imageUrl: selectedMonkey.imageUrl || ''
            });
        }
    }, [selectedMonkey]);

    const previewImageHandler = (e: Event) => {
        e.preventDefault();
        setPreviewImageUrl(monkey.imageUrl);
    }

    const inputHandler = (e: Event) => {
        const target = e.target as HTMLInputElement;
        const value = target.value;
        const name = target.name;

        setMonkey({
            ...monkey, [name]: value
        });
    }

    const submitHandler = (e: Event) => {
        e.preventDefault();

        let newMonkey = new Monkey(
            selectedMonkey.id, monkey.commonName, monkey.genus,
            monkey.species, monkey.subSpecies, monkey.avgLifespan,
            monkey.habitat, monkey.description, monkey.imageUrl
        );
        monkeys.updateMonkey(newMonkey);
        route(`/monkeys/${newMonkey.id}`);
    }

    const gotoPreviousMonkey = () => {
        const nextId = monkeys.data.findIndex(monkey => monkey.id === monkeyId) - 1;
        if (nextId < 0) {
            route(`/monkeys/${monkeys.data[monkeys.data.length - 1].id}/edit`);
        } else {
            route(`/monkeys/${monkeys.data[nextId].id}/edit`);
        }
    }

    const gotoDetailedView = () => {
        route(`/monkeys/${monkeyId}`);
    }

    const gotoNextMonkey = () => {
        const nextId = monkeys.data.findIndex(monkey => monkey.id === monkeyId) + 1;
        if (nextId >= monkeys.data.length) {
            route(`/monkeys/${monkeys.data[0].id}/edit`);
        } else {
            route(`/monkeys/${monkeys.data[nextId].id}/edit`);
        }
    }

    if (!selectedMonkey) {
        return <h1 class="d-flex justify-content-center align-items-center m-5 alert-danger">Monkey not found!</h1>;
    }

    return (
        <div class="container">

            <div class="d-flex justify-content-between mb-4" id="navigation-buttons">
                <button
                    class="btn"
                    onClick={gotoPreviousMonkey}
                    disabled={monkeys.data.length === 1}>
                    <i class="bi bi-arrow-left"></i>
                </button>
                <button
                    class="btn"
                    onClick={gotoDetailedView}>
                    <i class="bi bi-arrow-up"></i>
                </button>
                <button
                    class="btn"
                    onClick={gotoNextMonkey}
                    disabled={monkeys.data.length === 1}>
                    <i class="bi bi-arrow-right"></i>
                </button>
            </div>

            <form class="card" id="detailed-monkey-card" onSubmit={submitHandler}>
                <div class="row g-0">
                    <div class="col-lg-5 card-image-container">
                        <img class="card-img-top"
                            src={previewImageUrl}
                            alt={selectedMonkey.commonName} />
                    </div>

                    <div class="col-lg-7 d-flex flex-column">
                        <div class="card-body">
                            <input
                                class="card-title form-control"
                                type="text"
                                id="commonName"
                                name="commonName"
                                placeholder={selectedMonkey.commonName}
                                value={monkey.commonName}
                                onInput={inputHandler}
                                required />
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item">
                                    <div class="row align-items-center">
                                        <div class="col-lg-3 mb-2 mb-lg-0">
                                            <strong>Genus*:</strong>
                                        </div>
                                        <div class="col-lg-9">
                                            <input
                                                type="text"
                                                class="form-control"
                                                id="genus"
                                                name="genus"
                                                placeholder={selectedMonkey.genus}
                                                value={monkey.genus}
                                                onInput={inputHandler}
                                                required
                                            />
                                        </div>
                                    </div>
                                </li>
                                <li class="list-group-item">
                                    <div class="row align-items-center">
                                        <div class="col-lg-3 mb-2 mb-lg-0">
                                            <strong>Species*:</strong>
                                        </div>
                                        <div class="col-lg-9">
                                            <input
                                                type="text"
                                                class="form-control"
                                                id="species"
                                                name="species"
                                                placeholder={selectedMonkey.species}
                                                value={monkey.species}
                                                onInput={inputHandler}
                                                required
                                            />
                                        </div>
                                    </div>
                                </li>
                                <li class="list-group-item">
                                    <div class="row align-items-center">
                                        <div class="col-lg-3 mb-2 mb-lg-0">
                                            <strong>Subspecies:</strong>
                                        </div>
                                        <div class="col-lg-9">
                                            <input
                                                type="text"
                                                class="form-control"
                                                id="subSpecies"
                                                name="subSpecies"
                                                placeholder={selectedMonkey.subSpecies || 'Subspecies not specified'}
                                                value={monkey.subSpecies}
                                                onInput={inputHandler}
                                            />
                                        </div>
                                    </div>
                                </li>
                                <li class="list-group-item">
                                    <div class="row align-items-center">
                                        <div class="col-lg-3 mb-2 mb-lg-0">
                                            <strong>Average Lifespan*:</strong>
                                        </div>
                                        <div class="col-lg-9">
                                            <input
                                                type="number"
                                                class="form-control"
                                                id="avgLifespan"
                                                name="avgLifespan"
                                                min="0"
                                                placeholder={selectedMonkey.avgLifespan.toString()}
                                                value={monkey.avgLifespan}
                                                onInput={inputHandler}
                                                required
                                            />
                                        </div>
                                    </div>
                                </li>
                                <li class="list-group-item">
                                    <div class="row align-items-center">
                                        <div class="col-lg-3 mb-2 mb-lg-0">
                                            <strong>Habitat*:</strong>
                                        </div>
                                        <div class="col-lg-9">
                                            <input
                                                type="text"
                                                class="form-control"
                                                id="habitat"
                                                name="habitat"
                                                placeholder={selectedMonkey.habitat}
                                                value={monkey.habitat}
                                                onInput={inputHandler}
                                                required
                                            />
                                        </div>
                                    </div>
                                </li>
                                <li class="list-group-item">
                                    <div class="row align-items-center">
                                        <div class="col-lg-3 mb-2 mb-lg-0">
                                            <strong>Image URL*:</strong>
                                        </div>
                                        <div class="col-lg-6 mb-2 mb-lg-0">
                                            <input
                                                type="url"
                                                class="form-control"
                                                id="imageUrl"
                                                name="imageUrl"
                                                placeholder={selectedMonkey.imageUrl}
                                                value={monkey.imageUrl}
                                                onInput={inputHandler}
                                                required
                                            />
                                        </div>
                                        <div class="col-lg-3">
                                            <button
                                                type="button"
                                                class="btn"
                                                onClick={previewImageHandler}
                                                disabled={!monkey.imageUrl}>
                                                <i class="bi bi-eye"></i> Preview
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                            <div class="mt-3">
                                <textarea
                                    class="form-control mt-2"
                                    id="description"
                                    name="description"
                                    rows={3}
                                    placeholder={selectedMonkey.description}
                                    value={monkey.description}
                                    onInput={inputHandler}
                                />
                            </div>
                        </div>

                        <div class="mt-auto card-footer d-flex justify-content-evenly">
                            <button
                                type="submit"
                                class="btn">
                                <i class="bi bi-pencil-square"></i> Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            </form >
        </div >
    );
}