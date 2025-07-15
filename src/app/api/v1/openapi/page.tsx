"use client";

import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import { openApi } from "~/app/contract";

export default function OpenApiPage() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <SwaggerUI
        spec={openApi}
        docExpansion="none"
        defaultModelsExpandDepth={-1}
        showExtensions={false}
        showCommonExtensions={false}
      />
    </div>
  );
}
