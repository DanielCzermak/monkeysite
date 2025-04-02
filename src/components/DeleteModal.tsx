import { useEffect, useRef } from 'preact/hooks';
import { Modal } from 'bootstrap';

import './DeleteModal.css';

interface DeleteModalProps {
    monkeyName: string;
    onCancel: () => void;
    onConfirm: () => void;
}

export default function DeleteModal({ monkeyName, onCancel, onConfirm }: DeleteModalProps) {
    const modalRef = useRef<HTMLDivElement>(null);          // Modal top div reference
    const modalInstanceRef = useRef<Modal | null>(null);    // Modal instance reference

    useEffect(() => {
        // Create modal instance and show on mount
        if (modalRef.current) {
            modalInstanceRef.current = new Modal(modalRef.current);
            modalInstanceRef.current.show();
        }

        // On unmount tries to clean up completely
        // if backdrop or modal-open class remain
        return () => {
            try {
                if (modalInstanceRef.current) {
                    modalInstanceRef.current.hide();
                    modalInstanceRef.current.dispose();
                }
                
                document.body.classList.remove('modal-open');
                const backdrop = document.querySelector('.modal-backdrop');
                if (backdrop) backdrop.remove();
            } catch (error) {
                console.warn('Error during modal cleanup:', error);
            }
        };
    }, []);

    // Handles cancellation
    // Timeout so modal is finished animating before modal closes
    const handleClose = () => {
        if (modalInstanceRef.current) {
            modalInstanceRef.current.hide();
            setTimeout(onCancel, 500);
        }
    };

    // Handles confirmed deletion
    // Timeout so modal is finished animating before modal closes
    const handleConfirm = () => {
        if (modalInstanceRef.current) {
            modalInstanceRef.current.hide();
            setTimeout(onConfirm, 500);
        }
    };

    return (
        <div ref={modalRef} class="modal fade" tabIndex={-1}>
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Confirm Deletion</h5>
                        <button 
                            type="button" 
                            class="btn-close" 
                            onClick={handleClose}>
                        </button>
                    </div>
                    <div class="modal-body">
                        <p>Are you sure you want to delete {monkeyName}?</p>
                    </div>
                    <div class="modal-footer d-flex justify-content-evenly">
                        <button 
                            type="button" 
                            class="btn btn-secondary" 
                            onClick={handleClose}>
                            Cancel
                        </button>
                        <button
                            type="button"
                            class="btn btn-danger"
                            onClick={handleConfirm}>
                            Confirm
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}