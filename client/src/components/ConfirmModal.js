function ConfirmModal({ className, text, onConfirm, onCancel }) {
    return (
      <div className={className}>
        <p>{text}</p>
        <button onClick={onConfirm}>Sì</button>
        <button onClick={onCancel}>No</button>
      </div>
    );
}

export default ConfirmModal;