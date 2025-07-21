import { useEffect } from "react";

export default function ToastAlert({ toast, setToast, }) {
  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => setToast({ ...toast, show: false }), 5000);
      return () => clearTimeout(timer);
    }
  }, [toast, setToast]);

  if (!toast.show) return null;

  return (
    <div className="toast toast-center">
      <div className={`alert z-50 ${toast.type === 'success' ? 'alert-primary' : 'alert-error'}`}>
        <span>{toast.message}</span>
      </div>
    </div>
  );
}
