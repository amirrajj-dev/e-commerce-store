import { ArrowRight, CheckCircle, CircleX, HandHeart } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Confetti from "react-confetti";
import { useCart } from "../../../hooks/useCart";
import { usePayments } from "../../../hooks/usePayments";

const PurchaseSuccess = () => {
  const [isProcessing, setIsProcessing] = useState(true);
  const { emptyCart } = useCart();
  const {
    handleCheckoutSuccess,
    currentOrder,
    isProcessing: isPaymentProcessing,
    error: paymentError,
  } = usePayments();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const processSuccess = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const sessionId = urlParams.get("session_id");

        if (!sessionId) {
          setError("No session ID found in the URL");
          setIsProcessing(false);
          return;
        }

        // Process the successful checkout
        const result = await handleCheckoutSuccess(sessionId);
        console.log("Checkout success result:", result);
        emptyCart();
      } catch (error: any) {
        console.error("Error processing checkout success:", error);
        setError(error?.message || "Failed to process payment confirmation");
      } finally {
        setIsProcessing(false);
      }
    };

    processSuccess();
  }, [handleCheckoutSuccess, emptyCart]);

  // loading state
  if (isProcessing || isPaymentProcessing) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2 text-success animate-pulse">
            Processing Your Order...
          </h2>
          <p className="text-base-content/70">
            Please wait while we confirm your payment.
          </p>
        </div>
      </div>
    );
  }

  // error state
  if (error || paymentError) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center bg-base-100 mt-4 rounded-md p-4">
          <div className="alert alert-error mb-6">
            <CircleX size={18} />
            <span>{error || paymentError}</span>
          </div>
          <Link to="/cart" className="btn btn-success">
            Back to Cart
          </Link>
        </div>
      </div>
    );
  }
  // success state
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        gravity={0.1}
        style={{ zIndex: 99 }}
        numberOfPieces={700}
        recycle={false}
      />

      <div className="max-w-md w-full bg-base-200 rounded-2xl shadow-xl overflow-hidden relative z-10">
        <div className="p-6 sm:p-8">
          <div className="flex justify-center">
            <CheckCircle className="text-success w-16 h-16 mb-4" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-center text-success mb-2">
            Purchase Successful!
          </h1>

          <p className="text-base-content/80 text-center mb-2">
            Thank you for your order. We're processing it now.
          </p>
          <p className="text-success text-center text-sm mb-6">
            Check your email for order details and updates.
          </p>

          {/* Order Details */}
          <div className="bg-base-300 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-base-content/60">Order number</span>
              <span className="text-sm font-semibold text-success">
                {currentOrder?.orderId || "#Processing..."}
              </span>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-base-content/60">Total amount</span>
              <span className="text-sm font-semibold text-success">
                ${currentOrder?.totalAmount?.toFixed(2) || "0.00"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-base-content/60">
                Estimated delivery
              </span>
              <span className="text-sm font-semibold text-success">
                3-5 business days
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <button className="w-full btn btn-success">
              <HandHeart className="mr-2" size={18} />
              Thanks for trusting us!
            </button>

            <Link to="/" className="w-full btn btn-success btn-soft">
              Continue Shopping
              <ArrowRight className="ml-2" size={18} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseSuccess;
