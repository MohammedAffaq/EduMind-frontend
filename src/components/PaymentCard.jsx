import React, { useState, useEffect } from 'react';
import { CreditCard, DollarSign, CheckCircle, XCircle, Clock, Receipt } from 'lucide-react';

const PaymentCard = ({ studentId, onPaymentSuccess }) => {
  const [fees, setFees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFee, setSelectedFee] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    fetchFees();
  }, [studentId]);

  const fetchFees = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/fees/student/${studentId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setFees(data.fees || []);
      }
    } catch (error) {
      console.error('Error fetching fees:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async () => {
    if (!paymentAmount || paymentAmount <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    setProcessing(true);

    try {
      const token = localStorage.getItem('token');

      // Create Razorpay order
      const orderResponse = await fetch('http://localhost:5000/api/payments/create-order', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: parseFloat(paymentAmount),
          studentId,
          feeId: selectedFee?._id,
          description: selectedFee ? `Fee payment for ${selectedFee.term}` : 'School fee payment'
        }),
      });

      if (!orderResponse.ok) {
        throw new Error('Failed to create payment order');
      }

      const orderData = await orderResponse.json();

      // Initialize Razorpay
      const options = {
        key: orderData.key,
        amount: orderData.order.amount,
        currency: orderData.order.currency,
        order_id: orderData.order.id,
        name: 'EduMind School',
        description: orderData.order.notes?.description || 'School Fee Payment',
        handler: async function (response) {
          // Verify payment
          const verifyResponse = await fetch('http://localhost:5000/api/payments/verify', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              transactionId: orderData.transactionId
            }),
          });

          if (verifyResponse.ok) {
            alert('Payment successful!');
            setShowPaymentModal(false);
            setPaymentAmount('');
            setSelectedFee(null);
            fetchFees(); // Refresh fees
            if (onPaymentSuccess) onPaymentSuccess();
          } else {
            alert('Payment verification failed. Please contact support.');
          }
        },
        prefill: {
          name: localStorage.getItem('userName') || '',
          email: localStorage.getItem('userEmail') || '',
        },
        theme: {
          color: '#3B82F6',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid': return 'text-green-600 bg-green-50';
      case 'partially_paid': return 'text-yellow-600 bg-yellow-50';
      case 'pending': return 'text-blue-600 bg-blue-50';
      case 'overdue': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'paid': return <CheckCircle size={16} />;
      case 'partially_paid': return <Clock size={16} />;
      case 'pending': return <Clock size={16} />;
      case 'overdue': return <XCircle size={16} />;
      default: return <Clock size={16} />;
    }
  };

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
            <CreditCard className="text-blue-600" size={20} />
          </div>
          <div>
            <h3 className="font-bold text-gray-900">Fee Payment</h3>
            <p className="text-sm text-gray-500">Pay school fees online</p>
          </div>
        </div>
        <button
          onClick={() => setShowPaymentModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <DollarSign size={16} />
          Pay Fees
        </button>
      </div>

      {/* Fee Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {fees.slice(0, 3).map((fee) => (
          <div key={fee._id} className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">{fee.term}</span>
              <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(fee.status)}`}>
                {getStatusIcon(fee.status)}
                {fee.status.replace('_', ' ')}
              </div>
            </div>
            <div className="text-lg font-bold text-gray-900">₹{fee.balance}</div>
            <div className="text-xs text-gray-500">Due: {new Date(fee.dueDate).toLocaleDateString()}</div>
          </div>
        ))}
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-900">Pay School Fees</h3>
              <button
                onClick={() => setShowPaymentModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle size={24} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {/* Fee Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Fee (Optional)
                </label>
                <select
                  value={selectedFee?._id || ''}
                  onChange={(e) => {
                    const fee = fees.find(f => f._id === e.target.value);
                    setSelectedFee(fee);
                    if (fee) setPaymentAmount(fee.balance.toString());
                  }}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                >
                  <option value="">Custom Amount</option>
                  {fees.filter(fee => fee.status !== 'paid').map((fee) => (
                    <option key={fee._id} value={fee._id}>
                      {fee.term} - ₹{fee.balance} ({fee.status.replace('_', ' ')})
                    </option>
                  ))}
                </select>
              </div>

              {/* Amount Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payment Amount (₹)
                </label>
                <input
                  type="number"
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  min="1"
                  step="0.01"
                />
              </div>

              {/* Payment Button */}
              <button
                onClick={handlePayment}
                disabled={processing || !paymentAmount}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {processing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <CreditCard size={18} />
                    Pay ₹{paymentAmount || '0'}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentCard;
