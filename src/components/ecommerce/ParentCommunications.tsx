// components/nursery/ParentCommunications.tsx
import { MessageCircle, Mail, Bell, CheckCircle, Clock } from "lucide-react";

interface Communication {
  id: number;
  parent: string;
  child: string;
  type: 'message' | 'email' | 'notification';
  content: string;
  time: string;
  status: 'read' | 'unread';
  priority: 'high' | 'medium' | 'low';
}

const communications: Communication[] = [
  {
    id: 1,
    parent: "Sophie Martin",
    child: "Emma Martin",
    type: 'message',
    content: "Demande d'informations sur l'activité de demain",
    time: "Il y a 10 min",
    status: 'unread',
    priority: 'high'
  },
  {
    id: 2,
    parent: "Thomas Dubois",
    child: "Lucas Dubois",
    type: 'email',
    content: "Autorisation sortie scolaire signée",
    time: "Il y a 1h",
    status: 'read',
    priority: 'medium'
  },
  {
    id: 3,
    parent: "Julie Bernard",
    child: "Chloé Bernard",
    type: 'notification',
    content: "Paiement mensuel reçu",
    time: "Il y a 2h",
    status: 'read',
    priority: 'low'
  },
  {
    id: 4,
    parent: "Marc Laurent",
    child: "Hugo Laurent",
    type: 'message',
    content: "Question sur le régime alimentaire",
    time: "Il y a 3h",
    status: 'unread',
    priority: 'high'
  }
];

const getIcon = (type: Communication['type']) => {
  switch (type) {
    case 'message': return <MessageCircle className="w-5 h-5" />;
    case 'email': return <Mail className="w-5 h-5" />;
    case 'notification': return <Bell className="w-5 h-5" />;
  }
};

const getPriorityColor = (priority: Communication['priority']) => {
  switch (priority) {
    case 'high': return 'bg-red-100 text-red-700';
    case 'medium': return 'bg-yellow-100 text-yellow-700';
    case 'low': return 'bg-green-100 text-green-700';
  }
};

export default function ParentCommunications() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-0 border border-gray-200 dark:border-gray-700 h-full overflow-hidden flex flex-col">
      {/* Header avec bg-indigo-500 */}
      <div className="bg-indigo-500">
        <div className="flex justify-between items-center text-white p-4">
          <div>
            <h3 className="text-base font-semibold">
              Communications Parents
            </h3>
            <p className="text-indigo-100 text-xs opacity-90">
              Messages récents et à traiter
            </p>
          </div>
          <div className="relative">
            <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
              2
            </span>
            <button className="p-2 hover:bg-indigo-600 rounded-lg">
              <MessageCircle className="w-6 h-6 text-indigo-100" />
            </button>
          </div>
        </div>

        {/* Note informative */}
        {/* <div className="mb-3 p-2.5 bg-indigo-600/40 rounded-lg mx-4">
          <div className="flex items-center gap-1.5 text-indigo-100 text-xs">
            <span>
              💬 {communications.filter(c => c.status === 'unread').length} message(s) non lu(s)
            </span>
          </div>
        </div> */}
      </div>

      {/* Contenu principal */}
      <div className="p-4 flex-grow">
        <div className="space-y-4">
          {communications.map((comm) => (
            <div 
              key={comm.id} 
              className={`p-4 rounded-xl border transition-all duration-200 ${
                comm.status === 'unread' 
                  ? 'border-blue-200 bg-blue-50' 
                  : 'border-gray-200 bg-white hover:bg-gray-50'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${
                    comm.status === 'unread' 
                      ? 'bg-blue-100 text-blue-600' 
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {getIcon(comm.type)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-gray-800">
                        {comm.parent}
                      </h4>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(comm.priority)}`}>
                        {comm.priority === 'high' ? 'Urgent' : comm.priority === 'medium' ? 'Moyen' : 'Bas'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Enfant: {comm.child}
                    </p>
                    <p className="text-gray-700 mt-1">
                      {comm.content}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-sm text-gray-500 flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {comm.time}
                  </span>
                  {comm.status === 'unread' && (
                    <span className="mt-2 text-xs font-medium text-blue-600">
                      Non lu
                    </span>
                  )}
                </div>
              </div>
              
              {comm.status === 'unread' && (
                <div className="flex gap-2 mt-4 pt-4 border-t border-blue-100">
                  <button className="flex-1 px-3 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
                    Répondre
                  </button>
                  <button className="px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg">
                    Marquer lu
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 text-green-600 rounded-lg">
                <CheckCircle className="w-5 h-5" />
              </div>
              <div>
                <p className="font-medium text-gray-800">
                  Taux de réponse
                </p>
                <p className="text-sm text-gray-600">
                  94% des messages traités
                </p>
              </div>
            </div>
            <button className="text-blue-600 text-sm font-medium hover:underline">
              Voir toutes les communications →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}