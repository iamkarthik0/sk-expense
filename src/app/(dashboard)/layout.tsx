import ExpensePanelLayout from "@/components/ui/shared/layout/expense-panel-layout";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ExpensePanelLayout>{children}</ExpensePanelLayout>;
}
