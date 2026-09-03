import React from "react";
import Zendesk, { ZendeskAPI } from "../../zendeskConfig";
import environment from "../../environment";
import { useEffect } from "react";

const ZendeskComp = ({ showChat }) => {
  const handleLoaded = (status) => {
    ZendeskAPI("messenger", status);
  };

  useEffect(() => {
    if (showChat) {
      handleLoaded("open");
    } else {
      handleLoaded("close");
    }
  }, [showChat]);

  return (
    <div>
      <Zendesk
        defer
        zendeskKey={environment.ZENDESK_KEY}
        onLoaded={handleLoaded}
      />
    </div>
  );
};

export default ZendeskComp;
