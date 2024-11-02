"use client";
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useQuery } from "@tanstack/react-query";
import { getAllEpisodes } from "@/services/episode.service";
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";

export default function AppSidebar({ getActiveEpisode }: any) {
  const [isActiveEpisodeId, setIsActiveEpisodeId] = useState(null);

  const {
    data: allEpisodes,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["allEpisodes"],
    queryFn: () => getAllEpisodes(),
  });

  useEffect(() => {
    refetch();
  }, []);

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Episodes</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {isFetching
                ? Array.from({ length: 20 }, (v, i) => (
                    <SidebarMenuItem key={i} className="py-2">
                      <Skeleton className="h-[40px] w-[190px] rounded-xl" />{" "}
                    </SidebarMenuItem>
                  ))
                : allEpisodes?.results?.map((item: any) => (
                    <SidebarMenuItem
                      key={item?.id}
                      onClick={() => {
                        getActiveEpisode(item?.id, item?.name),
                          setIsActiveEpisodeId(item?.id);
                      }}
                      className="cursor-pointer py-2"
                    >
                      <SidebarMenuButton
                        asChild
                        isActive={item?.id === isActiveEpisodeId ? true : false}
                      >
                        <span>{item?.name}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
