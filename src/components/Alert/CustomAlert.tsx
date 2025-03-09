import React from "react";
// eslint-disable-next-line import/no-duplicates
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";
import WarningIcon from "@mui/icons-material/Warning";
import ErrorIcon from "@mui/icons-material/Error";
import InfoIcon from "@mui/icons-material/Info";
// eslint-disable-next-line import/no-duplicates
import { AlertColor } from "@mui/material/Alert";

// Define Props Interface
interface CustomAlertProps {
  type: AlertColor; // "success" | "error" | "warning" | "info"
  message: string;
  show: boolean;
}

const CustomAlert: React.FC<CustomAlertProps & { onClose?: () => void }> = ({ type, message, show, onClose }) => {
  if (!show) return null; // Don't render if show is false

  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckIcon fontSize="inherit" />;
      case "error":
        return <ErrorIcon fontSize="inherit" />;
      case "warning":
        return <WarningIcon fontSize="inherit" />;
      case "info":
        return <InfoIcon fontSize="inherit" />;
      default:
        return null;
    }
  };

  return (
    <Alert
      severity={type}
      icon={getIcon()}
      sx={{
        position: "fixed",
        top: 20,
        right: 20,
        zIndex: 9999,
      }}
    >
      {message}
    </Alert>
  );
  
};

export default CustomAlert;
