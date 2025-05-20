// src/lib/toast.ts
import { toast } from 'sonner';

export const showSuccessToast = (message: string) => {
  toast.success(message, {
    duration: 3000,
  });
};

export const showErrorToast = (message: string) => {
  toast.error(message, {
    duration: 3000,
    
  });
};
