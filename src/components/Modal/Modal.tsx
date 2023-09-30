import './Modal.css';

interface ModalProps {
    show: boolean;
    handleClose: () => void;
    value: string;
    setValue: (value: string) => void;
    handleAdd: () => Promise<void>;
}

function Modal({ show, handleClose, value, setValue, handleAdd }: ModalProps) {
    return (
        <div className='custom-modal-container'>
            <div className="">
                <div className=" custom-modal-insider" style={{ display: show ? 'block' : 'none' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-body">
                                <div className="form-group">
                                    <input placeholder='Todo metni giriniz' type="text" className="form-control" id="inputField" value={value} onChange={(e) => setValue(e.target.value)} />
                                </div>
                            </div>
                            <div className="modal-footer gap-1 p-2 mt-4">
                                <button type="button" className="btn btn-secondary" onClick={handleClose}>
                                    Kapat
                                </button>
                                <button type="button" onClick={async () => {
                                    await handleAdd();
                                    handleClose();
                                }}
                                    className="btn btn-primary">
                                    Kaydet
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Modal;
