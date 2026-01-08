// components/ecommerce/RapportsMetrics.tsx
import { FileText } from "lucide-react";

export default function RapportsMetrics() {
  const totalRapports = 156;
  const rapportsThisMonth = 28;
  
  return (
    <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl p-5 border border-emerald-400 shadow-sm">
      <div className="flex items-start justify-between mb-3">
        <div className="p-2.5 bg-emerald-400 rounded-lg">
          <FileText className="w-5 h-5 text-white" />
        </div>
      </div>
      
      <h3 className="text-xl font-bold text-white">{totalRapports}</h3>
      <p className="text-emerald-100 text-xs font-medium mt-0.5">Rapports générés</p>
      
      <div className="mt-3 pt-3 border-t border-emerald-300/60">
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-xs">
            <span className="text-emerald-200 font-medium">Ce mois:</span>
            <span className="font-bold text-white">{rapportsThisMonth}</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-emerald-200 font-medium">Cette semaine:</span>
            <span className="font-bold text-white">22</span>
          </div>
        </div>
      </div>
    </div>
  );
}