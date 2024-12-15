import { ContentLayout } from "@/components/layout/content-layout";

import React from "react";

import { Hero } from "@/components/shared/home/Hero";

export default function page() {
  return (
    <ContentLayout title="Income Expense">
      <Hero />
    </ContentLayout>
  );
}
