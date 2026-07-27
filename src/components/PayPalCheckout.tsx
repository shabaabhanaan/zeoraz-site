"use client";

import React, { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

interface PayPalCheckoutProps {
    price: string;
    templateTitle: String;
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
}): JSX.Element {
    return (
        
    )
}
