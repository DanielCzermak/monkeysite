import { useContext, useState } from 'preact/hooks';
import { route } from 'preact-router';

import { MonkeyContext } from '../data/monkeyContext';
import DeleteModal from './DeleteModal';

import './DetailedView.css';

interface DetailedViewProps {
    id: string;
}

export default function DetailedView({ id }: DetailedViewProps) {
    const monkeys = useContext(MonkeyContext);
    const selectedMonkey = monkeys.data.find(monkey => monkey.id === id);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const openDeleteModal = () => {
        setShowDeleteModal(true);
    };

    const closeDeleteModal = () => {
        setShowDeleteModal(false);
    };

    const handleDeleteConfirmed = () => {
        monkeys.deleteMonkey(id);
        route('/');
    };

    const gotoPreviousMonkey = () => {
        const nextId = monkeys.data.findIndex(monkey => monkey.id === id) - 1;
        if (nextId < 0) {
            route(`/monkeys/${monkeys.data[monkeys.data.length - 1].id}`);
        } else {
            route(`/monkeys/${monkeys.data[nextId].id}`);
        }
    }

    const gotoMainPage = () => {
        route('/');
    }

    const gotoNextMonkey = () => {
        const nextId = monkeys.data.findIndex(monkey => monkey.id === id) + 1;
        if (nextId >= monkeys.data.length) {
            route(`/monkeys/${monkeys.data[0].id}`);
        } else {
            route(`/monkeys/${monkeys.data[nextId].id}`);
        }
    }

    if (!selectedMonkey) {
        return <h1 class="d-flex justify-content-center align-items-center m-5">Monkey not found!</h1>;
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
                    onClick={gotoMainPage}>
                    <i class="bi bi-arrow-up"></i>
                </button>
                <button
                    class="btn"
                    onClick={gotoNextMonkey}
                    disabled={monkeys.data.length === 1}>
                    <i class="bi bi-arrow-right"></i>
                </button>
            </div>

            <div class="card" id="detailed-monkey-card">
                <div class="row g-0">
                    <div class="col-lg-5 card-image-container">
                        <img class="card-img-top"
                            src={selectedMonkey.imageUrl}
                            alt={selectedMonkey.commonName} />
                    </div>

                    <div class="col-lg-7 d-flex flex-column">
                        <div class="card-body">
                            <h3 class="card-title">{selectedMonkey.commonName}</h3>
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item"><strong>Genus:</strong> {selectedMonkey.genus}</li>
                                <li class="list-group-item"><strong>Species:</strong> {selectedMonkey.species}</li>
                                {selectedMonkey.subSpecies && <li class="list-group-item"><strong>Subspecies:</strong> {selectedMonkey.subSpecies}</li>}
                                <li class="list-group-item"><strong>Average Lifespan:</strong> {selectedMonkey.avgLifespan} years</li>
                                <li class="list-group-item"><strong>Habitat:</strong> {selectedMonkey.habitat}</li>
                            </ul>
                            <p class="card-text mt-3">{selectedMonkey.description}</p>
                        </div>

                        <div class="mt-auto card-footer d-flex justify-content-evenly">
                            <a
                                href={`/monkeys/${selectedMonkey.id}/edit`}
                                class="btn"
                                id="edit-monkey-button">
                                <i class="bi bi-pencil-square"> </i>Edit monkey
                            </a>
                            <button
                                class="btn"
                                id="delete-monkey-button"
                                onClick={openDeleteModal}>
                                <i class="bi bi-trash3-fill"> </i>Delete monkey
                            </button>

                            {showDeleteModal && (
                                <DeleteModal
                                    monkeyName={selectedMonkey.commonName}
                                    onCancel={closeDeleteModal}
                                    onConfirm={handleDeleteConfirmed}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}