import Sidebar from "@/components/Sidebar";
import Header from '@/components/Header';
import ChatBot from "@/components/ChatBot";

export default function Home() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="h-screen w-full flex flex-col">
        <Header />
        <ChatBot />
      </div>
    </div>
  );
}
