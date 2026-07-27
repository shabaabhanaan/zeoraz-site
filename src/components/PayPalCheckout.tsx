"use client";

import React from "react";

interface PayPalCheckoutProps {
  price: string;
  templateTitle: string;
  email?: string;
  onSuccess?: (details: any) => void;
  onError?: (err: any) => void;
}

export const PaypalCheckout: React.FC<PayPalCheckoutProps> = ({
  price,
  templateTitle,
  email,
  onSuccess,
  onError
}) => {
  return (
    <div className="p-4 rounded-xl bg-slate-900 text-white text-center text-xs font-semibold">
      Direct consultation enabled for {templateTitle} (${price})
    </div>
  );
};
