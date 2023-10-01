interface ButtonGroupProps {
  onAddClick: () => void;
  onDeleteClick: () => void;
  onCompletedClick: () => void;
  onClearClick: () => void;
}

// onAddClick: Yeni bir görev eklemek için kullanılacak işlevi temsil eder.
// onDeleteClick: Seçilen görevleri silmek için kullanılacak işlevi temsil eder.
// onCompletedClick: görevlerin tamamlanma durumunu değiştirir ture ise false, false ise true yapar.
// onClearClick: Tüm görevleri tekarar il haline getirecek işlevi temsil eder.

function ButtonGroup({ onAddClick, onDeleteClick, onCompletedClick, onClearClick }: ButtonGroupProps) {
  return (
    <div className="d-flex flex-row align-items-center gap-2">
      <button className="btn btn-sm btn-primary" onClick={onAddClick}>
        Ekle
      </button>
      <button className="btn btn-sm bg-danger text-white" onClick={onDeleteClick}>
        Sil
      </button>
      <button className="btn btn-sm bg-success text-white" onClick={onCompletedClick}>
        Güncelle
      </button>
      <button className="btn btn-sm bg-warning text-white" onClick={onClearClick}>
        Temizle
      </button>
    </div>
  );
}

export default ButtonGroup;
