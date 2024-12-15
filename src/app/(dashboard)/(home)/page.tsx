import { ContentLayout } from "@/components/ui/shared/layout/content-layout";
import { SearchBar } from "@/components/ui/shared/layout/search-bar";
import React from "react";

export default function page() {
  return (
    <ContentLayout title="Account">
      <div className=" w-full h-full">
        <div className="w-1/1 md:w-2/4 lg:w-1/4">
          <SearchBar />
        </div>
      </div>
    </ContentLayout>
  );
}
