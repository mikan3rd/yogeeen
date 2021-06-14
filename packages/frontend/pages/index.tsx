import React from "react";

import { CreateThemePage } from "@/components/pages/CreateThemePage";
import { Meta } from "@/components/templates/Meta";

const Top = React.memo((props) => {
  return (
    <>
      <Meta title="Top" />
      <CreateThemePage />
    </>
  );
});

export default Top;
