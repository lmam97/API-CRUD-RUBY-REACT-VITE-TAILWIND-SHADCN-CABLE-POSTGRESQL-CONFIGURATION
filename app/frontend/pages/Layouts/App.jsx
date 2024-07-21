import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { createConsumer } from "@rails/actioncable";
import { useEffect } from "react";

const LayoutApp = page => {
  const IS_PRODUCTION = false;
  const BASE_DOMAIN = "localhost:5000";

  const cableControl = (data) => {
    const customEvent = new CustomEvent(`${data.cable_type}_${data.cable_event}_CABLE`, { detail: data });
    document.dispatchEvent(customEvent);
  };

  useEffect(() => {
    const cable = createConsumer(`ws${IS_PRODUCTION ? "s" : ""}://${BASE_DOMAIN}/cable`);

    const subscription = cable.subscriptions.create({
      channel: "CablesChannel"
    }, {
      connected () { },
      disconnect () {
        cable.subscriptions.remove(subscription);
        cable.disconnect();
      },
      received (data) {
        cableControl(data);
      }
    });
    return () => {
      cable.subscriptions.remove(subscription);
      cable.disconnect();
    };
  }, []);

  return (
    <TooltipProvider>
      <div className="flex max-w-4xl mx-auto">
        <main className="w-full">
          { page }
        </main>
      </div>
      <Toaster />
    </TooltipProvider>
  );
};

export default LayoutApp;