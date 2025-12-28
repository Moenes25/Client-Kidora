import { CheckCircle, Clock, AlertCircle } from "lucide-react";

export default function PaymentStatus() {
  const payments = [
    { status: "paid", label: "Payés", count: 42, amount: "10,450 DT", color: "green" },
    { status: "pending", label: "En attente", count: 5, amount: "2,850 DT", color: "yellow" },
    { status: "overdue", label: "En retard", count: 1, amount: "350 DT", color: "red" }
  ];

  const getIcon = (status: string) => {
    switch (status) {
      case "paid": return <CheckCircle className="w-5 h-5" />;
      case "pending": return <Clock className="w-5 h-5" />;
      case "overdue": return <AlertCircle className="w-5 h-5" />;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-6">
        Statut des paiements
      </h3>

      <div className="space-y-4">
        {payments.map((payment) => (
          <div key={payment.status} className="p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg bg-${payment.color}-100 dark:bg-${payment.color}-900/30 text-${payment.color}-600`}>
                  {getIcon(payment.status)}
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 dark:text-white">
                    {payment.label}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {payment.count} paiements
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-gray-800 dark:text-white">
                  {payment.amount}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Total
                </p>
              </div>
            </div>
            
            {/* Barre de progression */}
            <div className="mt-2">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600 dark:text-gray-400">Pourcentage</span>
                <span className="font-medium">
                  {((payment.count / 48) * 100).toFixed(0)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className={`bg-${payment.color}-500 h-2 rounded-full`}
                  style={{ width: `${(payment.count / 48) * 100}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}