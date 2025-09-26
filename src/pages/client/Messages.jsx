import React from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const mockConversations = [
  {
    id: 'conv_001',
    jobId: 'job_001',
    title: 'Tender Briefing - ABC Company',
    repName: 'Jane Smith',
    lastMessage: 'I will arrive at 09:40 to clear security.',
    unread: 2,
    messages: [
      { id: 'm1', from: 'rep', text: 'Hi, I have reviewed the documents.', timestamp: '2024-12-12 15:02' },
      { id: 'm2', from: 'client', text: 'Great, please make sure to sign the register.', timestamp: '2024-12-12 15:05' },
      { id: 'm3', from: 'rep', text: 'Will do. I will arrive at 09:40 to clear security.', timestamp: '2024-12-12 15:10' },
    ]
  },
  {
    id: 'conv_002',
    jobId: 'job_002',
    title: 'Site Inspection - XYZ Holdings',
    repName: 'Jane Smith',
    lastMessage: 'Do I need to bring PPE or will it be provided?',
    unread: 0,
    messages: [
      { id: 'm1', from: 'rep', text: 'Do I need to bring PPE or will it be provided?', timestamp: '2024-12-14 10:20' },
      { id: 'm2', from: 'client', text: 'Please bring your own safety boots and hard hat.', timestamp: '2024-12-14 10:25' },
    ]
  },
];

const ConversationItem = ({ conv, active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full text-left p-3 rounded border ${active ? 'bg-blue-50 border-blue-200' : 'bg-white hover:bg-gray-50 border-gray-200'}`}
  >
    <div className="flex items-center justify-between">
      <h3 className="font-medium text-gray-900 truncate pr-2">{conv.title}</h3>
      {conv.unread > 0 && (
        <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">{conv.unread}</span>
      )}
    </div>
    <p className="text-xs text-gray-500">Rep: {conv.repName}</p>
    <p className="text-sm text-gray-600 truncate">{conv.lastMessage}</p>
  </button>
);

const MessageBubble = ({ msg }) => (
  <div className={`flex ${msg.from === 'client' ? 'justify-end' : 'justify-start'} my-2`}>
    <div className={`${msg.from === 'client' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-900'} rounded-lg px-3 py-2 max-w-[75%]`}
      title={msg.timestamp}
    >
      <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
      <p className={`text-[10px] mt-1 ${msg.from === 'client' ? 'text-blue-100' : 'text-gray-500'}`}>{msg.timestamp}</p>
    </div>
  </div>
);

const ClientMessages = () => {
  const [conversations, setConversations] = React.useState(mockConversations);
  const [activeId, setActiveId] = React.useState(mockConversations[0].id);
  const [input, setInput] = React.useState('');
  const [attachment, setAttachment] = React.useState(null);

  const activeConv = conversations.find(c => c.id === activeId);

  const handleSend = () => {
    if (!input.trim() && !attachment) return;
    const newMsg = {
      id: 'm' + Date.now(),
      from: 'client',
      text: input + (attachment ? `\n[Attachment: ${attachment.name}]` : ''),
      timestamp: new Date().toISOString().slice(0, 16).replace('T', ' '),
    };
    setConversations(prev => prev.map(c => c.id === activeId ? { ...c, messages: [...c.messages, newMsg], lastMessage: newMsg.text, unread: 0 } : c));
    setInput('');
    setAttachment(null);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <Card>
        <Card.Header>
          <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
        </Card.Header>
        <Card.Content>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <aside className="md:col-span-1 space-y-2">
              {conversations.map((conv) => (
                <ConversationItem
                  key={conv.id}
                  conv={conv}
                  active={conv.id === activeId}
                  onClick={() => setActiveId(conv.id)}
                />
              ))}
            </aside>
            <section className="md:col-span-2 flex flex-col h-[60vh] border rounded-lg">
              <div className="flex items-center justify-between p-3 border-b bg-gray-50">
                <div>
                  <h2 className="font-semibold text-gray-900">{activeConv.title}</h2>
                  <p className="text-xs text-gray-500">Rep: {activeConv.repName} · Job: {activeConv.jobId}</p>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-3 bg-white">
                {activeConv.messages.map((msg) => (
                  <MessageBubble key={msg.id} msg={msg} />
                ))}
              </div>
              <div className="p-3 border-t bg-gray-50">
                <div className="flex items-center gap-2">
                  <input
                    type="file"
                    className="hidden"
                    id="attach-input"
                    onChange={(e) => setAttachment(e.target.files?.[0] || null)}
                  />
                  <Button variant="outline" onClick={() => document.getElementById('attach-input').click()}>Attach</Button>
                  <div className="flex-1">
                    <Input
                      placeholder="Type your message..."
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                    />
                  </div>
                  <Button variant="primary" onClick={handleSend}>Send</Button>
                </div>
                {attachment && (
                  <p className="text-xs text-gray-600 mt-1">Attached: {attachment.name}</p>
                )}
              </div>
            </section>
          </div>
        </Card.Content>
      </Card>
    </div>
  );
};

export default ClientMessages;