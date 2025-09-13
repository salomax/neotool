import React, { Suspense } from "react";
import { render, screen, act } from "@testing-library/react";
import PageSkeleton from "@/components/loading/PageSkeleton";
import DashboardLoading from "@/app/(app)/dashboard/loading";
import EnterpriseLoading from "@/app/(app)/examples/table/enterprise/loading";

// 🔧 util para criar uma "promise" controlada (deferred)
function createDeferred() {
  let resolve: (v?: unknown) => void = () => {};
  const promise = new Promise((r) => (resolve = r));
  return { promise, resolve };
}

describe("Loading skeletons (unit)", () => {
  it("renders dashboard and enterprise loading components by data-testid", () => {
    render(<DashboardLoading />);
    expect(screen.getByTestId("loading-dashboard")).toBeInTheDocument();

    render(<EnterpriseLoading />);
    expect(screen.getByTestId("loading-enterprise-table")).toBeInTheDocument();
  });

  it("uses PageSkeleton as Suspense fallback until promise resolves", async () => {
    const deferred = createDeferred();
    let resolved = false;
    deferred.promise.then(() => { resolved = true; });

    // componente que "suspende" até a promise resolver
    function Suspender() {
      if (!resolved) throw deferred.promise;
      return <div data-testid="loaded">ok</div>;
    }

    render(
      <Suspense fallback={<PageSkeleton data-testid="loading-suspense" />}>
        <Suspender />
      </Suspense>
    );

    // enquanto não resolve, vemos o skeleton
    expect(screen.getByTestId("loading-suspense")).toBeInTheDocument();

    // resolve a promise e aguarda re-render
    await act(async () => { deferred.resolve(undefined); });

    // o skeleton some e o conteúdo aparece
    expect(screen.queryByTestId("loading-suspense")).not.toBeInTheDocument();
    expect(screen.getByTestId("loaded")).toBeInTheDocument();
  });
});
