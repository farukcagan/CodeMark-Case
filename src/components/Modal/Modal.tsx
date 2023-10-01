import './Modal.css';

interface ModalProps {
    show: boolean;
    handleClose: () => void;
    value: string;
    setValue: (value: string) => void;
    handleAdd: () => Promise<void>;
}

// Modal bileşeni, bir modal penceresini oluşturur.
// show: Modal'ın görünürlüğünü kontrol eden bir değerdir.
// handleClose: Modal'ı kapatmak için kullanılacak işlev içerir.
// value: Input alanının değerini temsil eder.
// setValue: Input alanının değerini güncellemek için kullanılacak işlevdir.
// handleAdd: Ekleme işlemini gerçekleştirmek için kullanılacak işlevdir.

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
