import React from "react";
import { AlertOctagon, AlertTriangle, CheckCircle, Info } from "react-feather";

const ICONS_BY_VARIANT = {
  notice: Info,
  warning: AlertTriangle,
  success: CheckCircle,
  error: AlertOctagon,
};

function ToastIcon({ variantSelected, size }) {
  const Icon = ICONS_BY_VARIANT[variantSelected || 0];

  return <Icon size={size} />;
}

export default ToastIcon;
