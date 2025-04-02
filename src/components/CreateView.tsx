import { useState, useContext } from "preact/hooks";
import { route } from "preact-router";

import { Monkey } from "../models/monkey";
import { MonkeyContext } from "../data/monkeyContext";

import './CreateView.css';

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

export default function CreateView() {
    const monkeys = useContext(MonkeyContext);
    const [monkey, setMonkey] = useState<MonkeyProps>({
        commonName: '',
        genus: '',
        species: '',
        subSpecies: '',
        avgLifespan: 0,
        habitat: '',
        description: '',
        imageUrl: ''
    });

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

        // Created with id=0 because addMonkey handles the id assignment
        let newMonkey = new Monkey(
            0, monkey.commonName, monkey.genus, monkey.species,
            monkey.subSpecies, monkey.avgLifespan, monkey.habitat,
            monkey.description, monkey.imageUrl
        );
        monkeys.addMonkey(newMonkey);
        route(`/monkeys/${newMonkey.id}`);
    }

    const gotoMainPage = () => {
        route('/');
    }

    return (
        <div class="container">

            <div class="d-flex justify-content-center mb-4" id="navigation-buttons">
                <button
                    class="btn"
                    onClick={gotoMainPage}>
                    <i class="bi bi-arrow-up"></i>
                </button>
            </div>

            <div class="container d-flex justify-content-center align-items-center">
                <div class="card p-3" id="create-monkey-card">
                    <h2 class="text-center">Create a new Monkey</h2>

                    <form onSubmit={submitHandler}>
                        <div class="mb-3">
                            <label htmlFor="commonName" class="form-label">Common Name*</label>
                            <input
                                type="text"
                                class="form-control"
                                id="commonName"
                                name="commonName"
                                value={monkey.commonName}
                                onInput={inputHandler}
                                required
                            />
                        </div>

                        <div class="row mb-3">
                            <div class="col-md-4">
                                <label htmlFor="genus" class="form-label">Genus*</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    id="genus"
                                    name="genus"
                                    value={monkey.genus}
                                    onInput={inputHandler}
                                    required
                                />
                            </div>
                            <div class="col-md-4">
                                <label htmlFor="species" class="form-label">Species*</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    id="species"
                                    name="species"
                                    value={monkey.species}
                                    onInput={inputHandler}
                                    required
                                />
                            </div>
                            <div class="col-md-4">
                                <label htmlFor="subSpecies" class="form-label">Sub-species</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    id="subSpecies"
                                    name="subSpecies"
                                    value={monkey.subSpecies}
                                    onInput={inputHandler}
                                />
                            </div>
                        </div>

                        <div class="row mb-3">
                            <div class="col-md-6">
                                <label htmlFor="avgLifespan" class="form-label">Average Lifespan (years)*</label>
                                <input
                                    type="number"
                                    class="form-control"
                                    id="avgLifespan"
                                    name="avgLifespan"
                                    min="1"
                                    value={monkey.avgLifespan}
                                    onInput={inputHandler}
                                    required
                                />
                            </div>

                            <div class="col-md-6">
                                <label htmlFor="habitat" class="form-label">Habitat*</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    id="habitat"
                                    name="habitat"
                                    value={monkey.habitat}
                                    onInput={inputHandler}
                                    required
                                />
                            </div>
                        </div>

                        <div class="mb-3">
                            <label htmlFor="description" class="form-label">Description</label>
                            <textarea
                                class="form-control"
                                id="description"
                                name="description"
                                rows={3}
                                value={monkey.description}
                                onInput={inputHandler}
                            />
                        </div>

                        <div class="mb-3">
                            <label htmlFor="imageUrl" class="form-label">Image URL</label>
                            <input
                                type="url"
                                class="form-control"
                                id="imageUrl"
                                name="imageUrl"
                                value={monkey.imageUrl}
                                onInput={inputHandler}
                            />
                        </div>

                        <div class="d-grid gap-2">
                            <button type="submit" class="btn btn-primary">Add</button>
                        </div>
                    </form>

                </div>
            </div>
        </div >
    );
}