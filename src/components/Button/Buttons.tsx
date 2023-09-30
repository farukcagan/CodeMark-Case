
interface ButtonGroupProps {
  onAddClick: () => void;
  onDeleteClick: () => void;
  onCompletedClick: () => void;
  onClearClick: () => void;
}

function ButtonGroup({ onAddClick, onDeleteClick, onCompletedClick,onClearClick }: ButtonGroupProps) {
  return (
    <div className="d-flex flex-row align-items-center gap-2">
      <button className="btn btn-sm btn-primary" onClick={onAddClick}>
       Todo Ekle
      </button>
      <button className="btn btn-sm bg-danger text-white" onClick={onDeleteClick}>
        Delete
      </button>
      <button className="btn btn-sm bg-success text-white" onClick={onCompletedClick}>
        Completed
      </button>
      <button className="btn btn-sm bg-warning text-white" onClick={onClearClick}>
        Clear
      </button>
    </div>
  );
}

export default ButtonGroup;
