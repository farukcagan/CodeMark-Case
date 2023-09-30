import React from 'react';
import './Modal.css';

function Modal({ show, handleClose, value, setValue, handleAdd }: any) {
    return (
        <div className='custom-modal-container'>
            <div className="custom-modal-insider">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close" onClick={handleClose}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        {/* İçerik buraya gelecek */}
                        <div className="form-group">
                            <label htmlFor="inputField">Input Alanı</label>
                            <input type="text" className="form-control" id="inputField" value={value} onChange={(e) => setValue(e.target.value)} />
                        </div>
                    </div>
                    <div className="modal-footer">
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
    );
}

export default Modal;
