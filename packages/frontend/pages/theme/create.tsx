import React from "react";

import { CreateThemePage } from "@/components/pages/CreateThemePage";
import { Meta } from "@/components/templates/Meta";

const Top = React.memo((props) => {
  return (
    <>
      <Meta title="予言のテーマを作成" />
      <CreateThemePage />
    </>
  );
});

export default Top;
