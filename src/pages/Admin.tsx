import { useAuth } from "@/hooks/useAuth.ts";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { adminService } from "@/services/admin-service.ts";
import { userColumns } from "@/models/admin/users/columns.tsx";
import { AdminTrackerResultsDatatable } from "@/models/admin/trackerResults/tracker-results-datatable.tsx";
import { trackerColumns } from "@/models/admin/trackerResults/columns.tsx";
import { AdminMapsDatatable } from "@/models/admin/maps/maps-datatable.tsx";
import { mapsColumns } from "@/models/admin/maps/columns.tsx";
import { AdminTeamsDatatable } from "@/models/admin/teams/teams-datatable.tsx";
import { teamsColumns } from "@/models/admin/teams/columns.tsx";
import { TableContainer } from "@/components/admin/TableContainer.tsx";
import { AdminUserDatatable } from "@/models/admin/users/users-datatable.tsx";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs.tsx";
import StatsCard from "@/components/stats/StatsCard.tsx";

export function Admin() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: ["adminStats"],
    queryFn: () => adminService.getStats(),
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user || !user.isAdmin) {
    navigate(-1);
  }

  return (
    <div className="flex flex-col gap-2 max-h-[90vh]">
      <div className="text-2xl font-semibold">Admin</div>
      {data && (
        <Tabs defaultValue={"general"}>
          <TabsList className="w-[300px]">
            <TabsTrigger className="w-full" value="general">
              General
            </TabsTrigger>
            <TabsTrigger className="w-full" value="details">
              Details
            </TabsTrigger>
          </TabsList>

          <TabsContent value={"general"}>
            <div className="flex gap-4">
              <StatsCard cardTitle={"Users"} value={data.stats.nbUsers} />
              <StatsCard cardTitle={"Teams"} value={data.stats.nbTeams} />
              <StatsCard
                cardTitle={"Tracker Results"}
                value={data.stats.nbTrackerResults}
              />
              <StatsCard cardTitle={"Maps"} value={data.stats.nbMaps} />
            </div>
          </TabsContent>
          <TabsContent value={"details"} className="h-screen">
            <div className="flex flex-col w-full gap-6 h-full">
              <div className="flex flex-grow w-full gap-4 h-1/3">
                <TableContainer title={"Users"}>
                  <AdminUserDatatable
                    columns={userColumns}
                    data={data.data.users}
                  ></AdminUserDatatable>
                </TableContainer>

                <TableContainer title={"Teams"}>
                  <AdminTeamsDatatable
                    columns={teamsColumns}
                    data={data.data.teams}
                  ></AdminTeamsDatatable>
                </TableContainer>
              </div>

              <div className="flex flex-grow w-full gap-4 pb-4 h-1/2">
                <TableContainer title={"Tracker results"}>
                  <AdminTrackerResultsDatatable
                    columns={trackerColumns}
                    data={data.data.trackerResults}
                  ></AdminTrackerResultsDatatable>
                </TableContainer>

                <TableContainer title={"Maps results"}>
                  <AdminMapsDatatable
                    columns={mapsColumns}
                    data={data.data.maps}
                  ></AdminMapsDatatable>
                </TableContainer>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}

export default Admin;
